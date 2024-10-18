"use server";
import { PaystackAccountDetailsClass } from "@/utils/account/classes.utils";
import account from "@/utils/appwrite/appwrite_account.utils";
import database from "@/utils/appwrite/appwrite_database.utils";
import { paystack_interceptor } from "@/utils/interceptors/interceptors.utils";
import {
  APPWRITE_DATABASE,
  TBankAccount,
  TBankDetailsParams,
  TPayStackBankName,
  TPaystackAccountDetails,
  TPayStackResponse,
  TPayStackBankAccountDetails,
} from "@/utils/types";
import { ID, Query } from "appwrite";
import { AxiosResponse } from "axios";

/**
 * * Function responsible for retrieving the bank details of the user
 * @param user_id The id of the user to retrieve the bank details of
 * @returns The bank details of the user
 */
export const get_bank_details = async (
  user_id: string
): Promise<TBankAccount | undefined> => {
  try {
    // * Retrieve the bank informaton of this user from the database
    const bank_details_list = await database.listDocuments(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.BANK_ACCOUNTS_COLLECTION_ID,
      [Query.equal("user_id", user_id)]
    );

    // * If the user hasn't added his/her bank information, return undefined
    if (bank_details_list.total < 1) return undefined;

    // * Get the 1st bank details from the list of bank details
    const bank_details = bank_details_list.documents[0];

    return {
      $id: bank_details.$id,
      account_name: bank_details.account_name,
      account_number: bank_details.account_number,
      bank_name: bank_details.bank_name,
      bank_code: bank_details.bank_code,
      paystack_details: bank_details.paystack_details,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to retrieve bank information");
  }
};

/**
 * * Function responsible for creating an orphanage's bank information, and the user Paystack sub account if they do NOT exist in the collection
 * @param config The object containing the bank details such as the account name, account number, bank name, etc...
 * @returns Void
 */
const add_bank_details = async (config: TBankDetailsParams) => {
  try {
    const bank_account_id = ID.unique();
    const paystack_details_id = ID.unique();

    // * Create a Paystack sub-account from the user bank information
    const paystack_subaccount_res = await create_paystack_sub_account(
      config
    ).catch(
      (e) => e.response.data as TPayStackResponse<TPaystackAccountDetails>
    );

    // * If the PayStack API returned an error while creating the subaccount
    if (!paystack_subaccount_res.status) {
      console.error(paystack_subaccount_res.message);
      throw new Error("Error uploading bank information");
    }

    // * Create a new bank information in the bank_account collection
    const created_bank_information = await database
      .createDocument(
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.BANK_ACCOUNTS_COLLECTION_ID,
        bank_account_id,
        {
          account_name: config.account_name,
          account_number: config.account_number,
          bank_name: config.bank_name,
          bank_code: config.bank_code,
          user_id: config.user_id,
          paystack_details: paystack_details_id,
        }
      )
      .catch((e) =>
        console.error("Error adding the bank information to the collection", e)
      );

    // * Create a new paystack information in the paystack_details collection
    const created_paystack_details = await database
      .createDocument(
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.PAYSTACK_DETAILS_COLLECTION_ID,
        paystack_details_id,
        {
          ...new PaystackAccountDetailsClass(
            paystack_subaccount_res.data.business_name,
            paystack_subaccount_res.data.account_number,
            paystack_subaccount_res.data.percentage_charge,
            paystack_subaccount_res.data.settlement_bank,
            paystack_subaccount_res.data.currency,
            paystack_subaccount_res.data.bank,
            paystack_subaccount_res.data.account_name,
            paystack_subaccount_res.data.subaccount_code,
            paystack_subaccount_res.data.id
          ),
          user_id: config.user_id,
        }
      )
      .catch((e) =>
        console.error("Error adding the paystack details to the collection", e)
      );

    // * If there was an error creating the bank information OR paystack_details in the collection...
    if (!created_bank_information || !created_paystack_details) {
      // * Deactivate the created Paystack sub account
      const deactivated_account_res = await deactivate_paystack_sub_account(
        paystack_subaccount_res.data.subaccount_code
      ).catch(
        (e) => e.response.data as TPayStackResponse<TPaystackAccountDetails>
      );

      // * Delete the uploaded bank account information if it was created
      await database
        .deleteDocument(
          APPWRITE_DATABASE.DB_ID,
          APPWRITE_DATABASE.BANK_ACCOUNTS_COLLECTION_ID,
          bank_account_id
        )
        .catch((e) => {});

      // * Delete the uploaded paystack details information if it was created
      await database
        .deleteDocument(
          APPWRITE_DATABASE.DB_ID,
          APPWRITE_DATABASE.PAYSTACK_DETAILS_COLLECTION_ID,
          paystack_details_id
        )
        .catch((e) => {});

      console.log(
        "Successfully deactivated paystack sub account and deleted the created details"
      );

      throw new Error("Error uploading bank information");
    }

    return created_bank_information;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to modify bank information");
  }
};

/**
 * * Function responsible for updating an orphanage's bank information, and the user Paystack sub account if they exist in the collection
 * @param config The object containing the bank details such as the account name, account number, bank name, etc...
 * @returns Void
 */
const update_bank_details = async (config: TBankDetailsParams) => {
  try {
    // * Update the Paystack sub-account from the user bank information
    const paystack_subaccount_res = await update_paystack_sub_account(
      config
    ).catch(
      (e) => e.response.data as TPayStackResponse<TPaystackAccountDetails>
    );

    // * If the PayStack API returned an error while creating the subaccount
    if (!paystack_subaccount_res.status) {
      console.error(paystack_subaccount_res.message);
      throw new Error("Error uploading bank information");
    }

    // * Updates the user's bank information in the bank_account collection
    const updated_bank_information = config.bank_account_id
      ? await database
          .updateDocument(
            APPWRITE_DATABASE.DB_ID,
            APPWRITE_DATABASE.BANK_ACCOUNTS_COLLECTION_ID,
            config.bank_account_id,
            {
              account_name: config.account_name,
              account_number: config.account_number,
              bank_name: config.bank_name,
              bank_code: config.bank_code,
              user_id: config.user_id,
            }
          )
          .catch((e) =>
            console.error(
              "Error updating the bank information to the collection",
              e
            )
          )
      : undefined;

    // * Updates the user's paystack information in the paystack_details collection
    config.paystack_details_id
      ? await database
          .updateDocument(
            APPWRITE_DATABASE.DB_ID,
            APPWRITE_DATABASE.PAYSTACK_DETAILS_COLLECTION_ID,
            config.paystack_details_id,
            {
              ...new PaystackAccountDetailsClass(
                paystack_subaccount_res.data.business_name,
                paystack_subaccount_res.data.account_number,
                paystack_subaccount_res.data.percentage_charge,
                paystack_subaccount_res.data.settlement_bank,
                paystack_subaccount_res.data.currency,
                paystack_subaccount_res.data.bank,
                paystack_subaccount_res.data.account_name,
                paystack_subaccount_res.data.subaccount_code,
                paystack_subaccount_res.data.id
              ),
              user_id: config.user_id,
            }
          )
          .catch((e) =>
            console.error(
              "Error updating the paystack details to the collection",
              e
            )
          )
      : undefined;

    return updated_bank_information;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to modify bank information");
  }
};

/**
 * * Function responsible for modifying an orphanage's bank information, and the user Paystack sub account
 * @param config The object containing the bank details such as the account name, account number, bank name, etc...
 * @returns Void
 */
export const modify_bank_details = async (config: TBankDetailsParams) => {
  try {
    // * Check if this user has previously added his/her bank information
    const existing_account_details = await database.listDocuments(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.BANK_ACCOUNTS_COLLECTION_ID,
      [Query.equal("user_id", config.user_id)]
    );

    // * If it does, update the existing bank information instead of creating a new one
    if (existing_account_details) {
      await update_bank_details(config);
      return;
    }

    // * if it doesn't exist, upload a new bank info. for the user
    await add_bank_details(config);
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

/**
 * * Function to create a new sub account
 * @param details The details of the sub account to be created
 * @param business_name The name of the orphanage
 * @returns Paystack response object
 */
const create_paystack_sub_account = async (config: TBankDetailsParams) => {
  try {
    // * Create the json body for the below request to create a new sub account
    const data = {
      account_number: config.account_number,
      bank_code: config.bank_code,
      bank_name: config.bank_name,
      business_name: config.orphanage_name,
      percentage_charge: 1,
    };

    // * Create a new sub_account from the details of the account
    const created_sub_account = await paystack_interceptor.post<
      any,
      AxiosResponse<TPayStackResponse<TPaystackAccountDetails>, any>
    >("/subaccount", data);

    return created_sub_account.data;
  } catch (error) {
    const msg = (error as any)?.response?.data?.message || error;
    console.error(msg);
    throw new Error("Error creating the PayStack sub account");
  }
};

/**
 * * Function to update an existing new sub account
 * @param details The details of the sub account to be updated
 * @param business_name The name of the orphanage
 * @returns Paystack response object
 */
const update_paystack_sub_account = async (config: TBankDetailsParams) => {
  try {
    // * Create the json body for the below request to update an existing sub account
    const data = {
      account_number: config.account_number,
      bank_code: config.bank_code,
      bank_name: config.bank_name,
      bussiness_name: config.orphanage_name,
    };

    // * Update existing sub_account from the details of the account
    const updated_sub_account = await paystack_interceptor.put<
      any,
      AxiosResponse<TPayStackResponse<TPaystackAccountDetails>, any>
    >(`/subaccount/${config.paystack_subbaccount_id}`, data);

    return updated_sub_account.data;
  } catch (error) {
    const msg = (error as any)?.response?.data?.message || error;
    console.error(msg);
    throw new Error("Error updating the PayStack sub account");
  }
};

/**
 * * Function to deactivate a sub account
 * @param id The Id of the sub account to be deactivated
 * @returns Paystack response object
 */
const deactivate_paystack_sub_account = async (id: string) => {
  try {
    // * Deletes a sub_account from the list of sub accounts on Paystack
    const deactivated_sub_account = await paystack_interceptor.put<
      any,
      AxiosResponse<TPayStackResponse<TPaystackAccountDetails>, any>
    >(`/subaccount/${id}`, { active: false });

    return deactivated_sub_account;
  } catch (error) {
    const msg = (error as any)?.response?.data?.message || error;
    console.error(msg);
    throw new Error("Error deleting the PayStack sub account");
  }
};

/**
 * * Function responsible for retrieving banks from the paystack banks API
 * @returns The list of banks supported by Paystack
 */
export const get_paystack_banks = async () => {
  try {
    // * Retrieve all banks from the paystack bank API
    const banks = await paystack_interceptor.get<
      any,
      AxiosResponse<TPayStackResponse<TPayStackBankName[]>>
    >("/bank?country=nigeria&currency=NGN");

    return banks.data.data;
  } catch (error) {
    console.error((error as any)?.response?.data?.message || error);
    throw new Error("Failed to retrieve banks");
  }
};

/**
 * * Function responsible for retrieving user account name from the paystack API
 * @returns The list of banks supported by Paystack
 */
export const get_account_name = async (
  account_number: string,
  bank_code: number | string
) => {
  try {
    // * Retrieve all the user bank account name from the paystack API
    const banks = await paystack_interceptor.get<
      any,
      AxiosResponse<TPayStackResponse<TPayStackBankAccountDetails>>
    >(
      `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`
    );

    return banks.data.data;
  } catch (error) {
    console.error((error as any)?.response?.data?.message || error);
    throw new Error("Failed to retrieve account name");
  }
};

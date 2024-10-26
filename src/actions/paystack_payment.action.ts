"use server";
import { AxiosResponse } from "axios";
import database from "@/utils/appwrite/node_appwrite_database.utils";
import { paystack_interceptor } from "@/utils/interceptors/interceptors.utils";
import {
  APPWRITE_DATABASE,
  TPaystackAccountDetails,
  TPayStackInitTransactionParams,
} from "@/utils/types";
import { Models, Query } from "node-appwrite";

/**
 * * Function responsible for initializing a split payment request to PayStack
 * @param config The object containing the ID of the orphanage whose account the payment will be sent to, the orphanage email address, and the amount to pay
 */
export const initialize_split_payment = async ({
  orphanage_id,
  email,
  amount,
}: TPayStackInitTransactionParams) => {
  try {
    // * Retrieve the orphanage sub account the donation will be made to
    const paystack_details_response = await database.listDocuments<
      Models.Document & TPaystackAccountDetails
    >(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.PAYSTACK_DETAILS_COLLECTION_ID,
      [Query.equal("user_id", orphanage_id)]
    );

    // * If the orphanage hasn't configured their bank details yet, return error
    if (paystack_details_response.documents.length < 1)
      throw new Error("{code: 400}");

    const paystack_details = paystack_details_response.documents[0];

    // * Send request to initialize the payment to Paystack
    const response = await paystack_interceptor.post<
      any,
      AxiosResponse<{
        status: boolean;
        message: string;
        data: {
          authorization_url: string;
          access_code: string;
          reference: string;
        };
      }>
    >("/transaction/initialize", {
      email: email,
      amount: amount,
      subaccount: paystack_details.subaccount_code,
    });

    return {
      ...response.data.data,
      subaccount_code: paystack_details.subaccount_code,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      (error as any).response.data.message || (error as any).message || error
    );
  }
};

/**
 * * Function responsible for retrievign the paystack subaccount details of an orphanage
 * @param orphanage_id The ID of the orphanage to donate to
 * @returns The paystack subaccount details of the orphanage.
 */
export const retrieve_paystack_account_details = async (
  orphanage_id: string
) => {
  try {
    // * Retrieve the orphanage sub account the donation will be made to
    const paystack_details_response = await database.listDocuments<
      Models.Document & TPaystackAccountDetails
    >(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.PAYSTACK_DETAILS_COLLECTION_ID,
      [Query.equal("user_id", orphanage_id)]
    );
    return paystack_details_response.documents[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      (error as any).response.data.message || (error as any).message || error
    );
  }
};

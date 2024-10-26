import {
  initialize_split_payment,
  retrieve_paystack_account_details,
} from "@/actions/paystack_payment.action";
import { TPayStackInitTransactionParams } from "../types";
import Paystack from "@paystack/inline-js";

/**
 * * Function responsible for initiating a Paystack split payment transaction
 * @param config The transaction details
 */
export const make_transaction = async ({
  amount,
  email,
  orphanage_id,
}: TPayStackInitTransactionParams) => {
  const promise = new Promise<{
    id: string;
    reference: string;
    message: string;
    redirecturl: string;
    status: "success";
    trans: string;
    transaction: string;
    trxref: string;
  }>(async (resolve, reject) => {
    try {
      // * Retrieve the orphanage sub account the donation will be made to
      const paystack_details = await retrieve_paystack_account_details(
        orphanage_id
      );

      const popup = new Paystack();

      // * Initialize a new PayStack payment
      popup.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
        email: email,
        amount: Number(amount),
        subaccountCode: paystack_details.subaccount_code,
        onSuccess: async (transaction) => {
          resolve(transaction);
        },
        onLoad: (response) => {
          console.log("onLoad: ", response);
        },
        onCancel: () => {
          console.log("onCancel");
          reject();
        },
        onError: (error) => {
          console.log("Error: ", error.message);
          reject(error);
        },
      });
    } catch (error) {
      console.log("PAYSTACK TRANSACTION ERROR", error);
    }
  });
  return promise;
};

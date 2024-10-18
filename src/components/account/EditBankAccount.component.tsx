import React, { FC, useEffect, useState } from "react";
import TextField from "../atoms/TextField.component";
import Button from "../atoms/Button.component";
import { FormControl } from "../atoms/FormControl.component";
import {
  Alert,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  Snackbar,
} from "@mui/material";
import {
  APPWRITE_DATABASE,
  BANK_INFORMATION_FORM,
  TBankAccount,
  TPayStackBankName,
} from "@/utils/types";
import { handle_input_change } from "@/utils/input.utils";
import Loader from "../atoms/Loader.component";
import {
  get_account_name,
  get_paystack_banks,
  modify_bank_details,
} from "@/actions/bank_account.action";
import useFetch from "@/hooks/useFetch.hook";
import { useModalContext } from "@/contexts/Modal.context";
import { Query } from "appwrite";
import database from "@/utils/appwrite/appwrite_database.utils";

const EditBankAccount: FC<{
  user_id: string;
  existing_information: TBankAccount | undefined;
  orphanage_name: string;
}> = ({ existing_information, orphanage_name, user_id }) => {
  const { close_modal } = useModalContext();
  const [banks, setBanks] = useState<TPayStackBankName[]>([]);
  const fetch_banks_state = useFetch();
  const validate_form_state = useFetch();
  const fetch_account_name_state = useFetch();
  const [form_state, setFormState] = useState({
    account_number: "",
    bank_name: "",
    bank_code: "",
    account_name: "",
  });

  /**
   * * Function responsible for retriving the list of banks supported by PayStack
   */
  const get_banks = async () => {
    try {
      // * Retrieves the list of banks supported by PayStack
      const banks = await get_paystack_banks();
      setBanks(banks);
      fetch_account_name_state.display_success("Success");
    } catch (error) {
      console.error(error);
      fetch_banks_state.display_error("Error retieving banks");
    }
  };

  /**
   * * Function responsible for retriving the account name of a user
   */
  const get_account_name_handler = async (
    account_number: string,
    bank_code: string
  ) => {
    try {
      // * Clear the previous account name
      handle_input_change(BANK_INFORMATION_FORM.ACCOUNT_NAME, "", setFormState);
      // * Set the get account name loading state to true
      fetch_account_name_state.display_loading();

      // * Fetch the account name using the account number and bank code
      const response = await get_account_name(account_number, bank_code);
      handle_input_change(
        BANK_INFORMATION_FORM.ACCOUNT_NAME,
        response.account_name,
        setFormState
      );

      fetch_account_name_state.display_success("Success");
    } catch (error) {
      console.error(error);
      fetch_account_name_state.display_error("Error retieving account name");
    }
  };

  /**
   * * Function responsible for updating the values of the input fields, and triggering the retrieval of the user's account name
   * @param name The name of the input which was changed
   * @param value The value entrered into the input field
   * @param type Indicates if the triggered input was for the account_number or bank name field
   */
  const bank_information_change_handler = async (
    name: string,
    value: string,
    type: BANK_INFORMATION_FORM.ACCOUNT_NUMBER | BANK_INFORMATION_FORM.BANK_CODE
  ) => {
    handle_input_change(name, value, setFormState);
    setTimeout(async () => {
      await get_account_name_handler(
        type === BANK_INFORMATION_FORM.ACCOUNT_NUMBER
          ? value
          : form_state.account_number,
        type === BANK_INFORMATION_FORM.BANK_CODE ? value : form_state.bank_code
      );
    }, 2000);
  };

  /**
   * * Function responsible for submittin the form, i.e. updating the user bank information
   * @param e The form submit event
   * @returns void
   */
  const form_submit_handler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    try {
      // * Display the loading state for the form submission
      validate_form_state.display_loading();

      e.preventDefault();
      // * Perform form validation
      if (
        form_state.account_number.trim() === "" ||
        form_state.bank_name.trim() === "" ||
        form_state.bank_code.trim() === "" ||
        form_state.account_name.trim() === ""
      ) {
        validate_form_state.display_error(
          "Account name must be provided, please cross-check your account number and bank name"
        );
        return;
      }

      // * Update/modify the user's bank information
      await modify_bank_details({
        account_name: form_state.account_name,
        bank_name: form_state.bank_name,
        bank_code: form_state.bank_code,
        account_number: form_state.account_number,
        orphanage_name,
        user_id,
        bank_account_id: existing_information?.$id,
        paystack_details_id: existing_information?.paystack_details?.$id,
        paystack_subbaccount_id:
          existing_information?.paystack_details?.subaccount_code,
      });

      //   const existing_account_details = await database.listDocuments(
      //     APPWRITE_DATABASE.DB_ID,
      //     APPWRITE_DATABASE.PAYSTACK_DETAILS_COLLECTION_ID,
      //     [Query.equal("user_id", user_id)]
      //   );
      //   console.log("DETAILS", existing_account_details);

      // * Display the success state for the form submission
      validate_form_state.display_success("Success");

      // * CLose the modal after a successfull update
      close_modal();
    } catch (error) {
      console.error(error);
      validate_form_state.display_error("Error updating bank information");
    }
  };

  /**
   * * Function responsible for auto-filling the input fields with the existing bank information
   * @returns void
   */
  const auto_fill_input_fields = () => {
    if (!existing_information) return;

    handle_input_change(
      BANK_INFORMATION_FORM.ACCOUNT_NUMBER,
      existing_information.account_number,
      setFormState
    );
    handle_input_change(
      BANK_INFORMATION_FORM.BANK_NAME,
      existing_information.bank_name,
      setFormState
    );
    handle_input_change(
      BANK_INFORMATION_FORM.BANK_CODE,
      existing_information.bank_code,
      setFormState
    );
    handle_input_change(
      BANK_INFORMATION_FORM.ACCOUNT_NUMBER,
      existing_information.account_number,
      setFormState
    );
  };

  useEffect(() => {
    get_banks();
    auto_fill_input_fields();
  }, []);

  return (
    <>
      <div className="w-[300px] xs:w-[400px] sm:w-[600px] min-h-[300px] flex flex-col gap-5">
        {/* Title + cancel btn */}
        <div className="w-full flex gap-4 justify-between items-center text-white text-lg">
          <span>Edit Bank Information</span>
          <i className="fas fa-xmark cursor-pointer" onClick={close_modal}></i>
        </div>
        {/* Form */}
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={form_submit_handler}
        >
          {/* Account number */}
          <TextField
            label="Account number"
            className="w-full"
            name={BANK_INFORMATION_FORM.ACCOUNT_NUMBER}
            onChange={async (e) => {
              await bank_information_change_handler(
                e.target.name,
                e.target.value,
                BANK_INFORMATION_FORM.ACCOUNT_NUMBER
              );
            }}
            required
          />
          {/* Bank name */}
          <FormControl variant="outlined" className="w-full" required>
            <InputLabel id="demo-customized-select-label">Bank name</InputLabel>
            <Select
              name={BANK_INFORMATION_FORM.BANK_NAME}
              input={<OutlinedInput label="Bank name" />}
              value={form_state.bank_name}
              onChange={async (e) => {
                handle_input_change(
                  e.target.name,
                  e.target.value,
                  setFormState
                );
              }}
              required
            >
              {banks.length > 0 ? (
                banks.map((bank) => (
                  <MenuItem
                    value={bank.name}
                    onClick={async () => {
                      await bank_information_change_handler(
                        BANK_INFORMATION_FORM.BANK_CODE,
                        bank.code,
                        BANK_INFORMATION_FORM.BANK_CODE
                      );
                    }}
                  >
                    {bank.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={undefined} className="flex justify-center">
                  <Loader type="button" className="text-primary-dark" />
                </MenuItem>
              )}
            </Select>
          </FormControl>
          {/* Account name */}
          <div className="w-full text-lg">
            {fetch_account_name_state.loading && (
              <Skeleton
                animation="pulse"
                width={"80%"}
                className="bg-weak-grey/10"
              />
            )}
            {form_state.account_name}
          </div>
          {/* Save btn */}
          <Button
            className="w-full"
            type="submit"
            disabled={validate_form_state.loading}
          >
            {validate_form_state.loading ? (
              <Loader type="button" />
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </div>
      {/* Fetch banks error state */}
      {fetch_banks_state.error && (
        <Snackbar
          open={fetch_banks_state.error ? true : false}
          onClose={() => fetch_banks_state.setError(undefined)}
        >
          <Alert
            color="error"
            onClose={() => fetch_banks_state.setError(undefined)}
          >
            {fetch_banks_state.error}
          </Alert>
        </Snackbar>
      )}
      {/* Fetch account name error state */}
      {fetch_account_name_state.error && (
        <Snackbar
          open={fetch_account_name_state.error ? true : false}
          onClose={() => fetch_account_name_state.setError(undefined)}
        >
          <Alert
            color="error"
            onClose={() => fetch_account_name_state.setError(undefined)}
          >
            {fetch_account_name_state.error}
          </Alert>
        </Snackbar>
      )}
      {/* Validate form error state */}
      {validate_form_state.error && (
        <Snackbar
          open={validate_form_state.error ? true : false}
          onClose={() => validate_form_state.setError(undefined)}
        >
          <Alert
            color="error"
            onClose={() => validate_form_state.setError(undefined)}
          >
            {validate_form_state.error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default EditBankAccount;

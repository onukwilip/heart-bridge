"use client";
import React, { useEffect, useState } from "react";
import TabSection from "../molecules/TabSection.component";
import SectionHeader from "./SectionHeader.component";
import PersonalInformationDetail from "./PersonalInformationDetail.component";
import { useUserContext } from "@/contexts/User.context";
import { get_bank_details } from "@/actions/bank_account.action";
import { TBankAccount } from "@/utils/types";
import useFetch from "@/hooks/useFetch.hook";
import { Alert, Skeleton, Snackbar } from "@mui/material";
import { useModalContext } from "@/contexts/Modal.context";
import EditBankAccount from "./EditBankAccount.component";
import RouteProtector from "../RouteProtector.component";

const BankAccount = () => {
  const [bank_account_details, setBankAccountDetails] =
    useState<TBankAccount>();
  const { user, fetch_user_state } = useUserContext();
  const fetch_state = useFetch();
  const { open_modal, modal } = useModalContext();

  /**
   * * Function responsible for retieving the user bank information
   */
  const get_user_bank_details = async () => {
    try {
      fetch_state.display_loading();

      const bank_details = await get_bank_details(user?.$id || "");

      if (bank_details) {
        setBankAccountDetails(bank_details);
        console.log("BANK", bank_details);
      }
      fetch_state.display_success("Success");
    } catch (error) {
      console.error("Error fetching bank details", error);
      fetch_state.display_error("Error fetching bank details");
    }
  };

  /**
   * * Function responsible for displaying the modal to edit user bank information
   */
  const handle_edit_click = () => {
    open_modal({
      children: (
        <EditBankAccount
          user_id={user?.$id || ""}
          orphanage_name={user?.prefs?.orphanage_name || ""}
          existing_information={bank_account_details}
        />
      ),
    });
  };

  useEffect(() => {
    // * If the user object hasn't been populated, return
    if (!user) return;

    if (!modal.open) get_user_bank_details();
  }, [modal.open, user]);

  return (
    <RouteProtector role="orphanage">
      <TabSection className="flex flex-col w-full gap-4">
        {/* Heading + Edit btn */}
        <SectionHeader onEditClick={handle_edit_click}>
          <span>Bank information</span>
        </SectionHeader>
        {/* Details */}
        <div className="w-full flex gap-x-36 gap-y-4 flex-wrap">
          <PersonalInformationDetail
            title={"Account number"}
            value={
              fetch_state.loading || fetch_user_state.loading ? (
                <Skeleton
                  animation="pulse"
                  width={"150%"}
                  className="!bg-weak-grey/10"
                />
              ) : (
                bank_account_details?.account_number || "-"
              )
            }
            no_capitalize
          />
          <PersonalInformationDetail
            title={"Account name"}
            value={
              fetch_state.loading || fetch_user_state.loading ? (
                <Skeleton
                  animation="pulse"
                  width={"150%"}
                  className="!bg-weak-grey/10"
                />
              ) : (
                bank_account_details?.account_name || "-"
              )
            }
          />
          <PersonalInformationDetail
            title={"Bank name"}
            value={
              fetch_state.loading || fetch_user_state.loading ? (
                <div>
                  <Skeleton
                    animation="pulse"
                    width={"150%"}
                    className="!bg-weak-grey/10"
                  />
                </div>
              ) : (
                bank_account_details?.bank_name || "-"
              )
            }
          />
        </div>
      </TabSection>
      {/* The error state */}
      {fetch_state.error && (
        <Snackbar
          open={fetch_state.error ? true : false}
          onClose={() => fetch_state.setError(undefined)}
        >
          <Alert color="error" onClose={() => fetch_state.setError(undefined)}>
            {fetch_state.error}
          </Alert>
        </Snackbar>
      )}
    </RouteProtector>
  );
};

export default BankAccount;

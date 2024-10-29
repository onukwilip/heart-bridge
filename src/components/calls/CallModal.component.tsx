import { useModalContext } from "@/contexts/Modal.context";
import { APPWRITE_DATABASE, STATUS, TCall, TVisitation } from "@/utils/types";
import { Alert, MenuItem, Select, Snackbar } from "@mui/material";
import React, { useState } from "react";
import Button from "../atoms/Button.component";
import { capitalize } from "@/utils/utils";
import useFetch from "@/hooks/useFetch.hook";
import database from "@/utils/appwrite/appwrite_database.utils";
import Loader from "../atoms/Loader.component";
import { format } from "date-fns";

interface CallDetailsModalProps {
  call: TCall;
}

const CallDetailsModal: React.FC<CallDetailsModalProps> = ({ call }) => {
  const { close_modal } = useModalContext();
  const [newStatus, setNewStatus] = useState<STATUS>(STATUS.PENDING);
  const updateStatusState = useFetch({ loading: false });
  const { display_loading, display_success, display_error } = updateStatusState;
  const { DB_ID, CALLS_COLLECTION_ID } = APPWRITE_DATABASE;

  const handleUpdateStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      display_loading();
      // * Update the visitation status
      await database.updateDocument(DB_ID, CALLS_COLLECTION_ID, call.$id, {
        status: newStatus,
      });

      // * Display success message
      display_success("Status updated successfully");

      // * Close the modal
      close_modal();
    } catch (error) {
      console.error(error);
      // * Display error message
      display_error((error as any).message || error);
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      {/* Title + close */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Call Details</h2>
        <i
          className="fas fa-xmark cursor-pointer text-white"
          onClick={close_modal}
        ></i>
      </div>

      {/* Main detail box */}
      <div className="rounded p-4 flex flex-col gap-y-2">
        <div className="grid grid-cols-5 ">
          <p className="col-span-2">Caller name:</p>
          <p className="col-span-3 text-white/70 font-semibold">
            {call.caller_name}
          </p>
        </div>

        <div className="grid grid-cols-5 ">
          <p className="col-span-2">Date:</p>
          <p className="col-span-3 text-white/70">
            {format(call.call_date, "dd MMM yyy")}
          </p>
        </div>

        <div className="grid grid-cols-5 ">
          <p className="col-span-2">Time:</p>
          <p className="col-span-3 text-white/70">
            {format(call.call_time, "hh:mm bb")}
          </p>
        </div>
      </div>

      {/* Status dropdown */}
      <form onSubmit={handleUpdateStatus} className="flex flex-col gap-y-3">
        <Select
          variant="outlined"
          fullWidth
          defaultValue={call.status}
          onChange={(e) => setNewStatus(e.target.value as STATUS)}
          className="text-white border-2 border-primary-grey"
        >
          {Array.from(["pending", "approved", "declined"]).map((status) => (
            <MenuItem key={status} value={status}>
              {capitalize(status)}
            </MenuItem>
          ))}
        </Select>

        {/* Save */}
        <Button type="submit">
          {updateStatusState.loading ? <Loader type="button" /> : "Save"}
        </Button>
      </form>

      {updateStatusState.success ? (
        <Snackbar
          open={updateStatusState.success ? true : false}
          onClose={() => updateStatusState.setSuccess(undefined)}
        >
          <Alert
            color="success"
            onClose={() => updateStatusState.setSuccess(undefined)}
          >
            {updateStatusState.success}
          </Alert>
        </Snackbar>
      ) : updateStatusState.error ? (
        <Snackbar
          open={updateStatusState.error ? true : false}
          onClose={() => updateStatusState.setError(undefined)}
        >
          <Alert
            color="error"
            onClose={() => updateStatusState.setError(undefined)}
          >
            {updateStatusState.error}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default CallDetailsModal;

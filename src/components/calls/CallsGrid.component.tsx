"use client";

import React, { useEffect, useState } from "react";
import CallsCard from "./CallsCard.component";
import { APPWRITE_DATABASE, TCall } from "@/utils/types";
import { Query } from "appwrite";
import useFetch from "@/hooks/useFetch.hook";
import { useUserContext } from "@/contexts/User.context";
import database from "@/utils/appwrite/appwrite_database.utils";
import { Skeleton } from "@mui/material";

const CallsGrid = () => {
  const { user, fetch_user_state } = useUserContext();
  const [calls, setCalls] = useState<TCall[]>([]);
  const fetch_calls_state = useFetch({ loading: true });

  /**
   * * Function responsible for retrieving orphanage visitations
   */
  const get_visitations = async () => {
    try {
      // * Display loading indicator
      fetch_calls_state.display_loading();

      const callsList = await database.listDocuments(
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.CALLS_COLLECTION_ID,
        [Query.equal("orphanage_id", user?.$id as string)]
      );

      // * Add the results to the visitation list
      setCalls(
        callsList.documents.map((call) => ({
          $id: call.$id,
          orphanage_id: call.orphanage_id,
          call_date: call.call_date,
          call_time: call.call_time,
          caller_id: call.caller_id,
          caller_name: call.caller_name,
          status: call.status,
        }))
      );
      // * Display success message
      fetch_calls_state.display_success("Visitations retrieved successfully");
    } catch (error) {
      console.error(error);
      // * Display error message
      fetch_calls_state.display_error((error as any).message || error);
    }
  };

  useEffect(() => {
    // * If the user object hasn't been populated, return
    if (!user) return;

    // Fetch visitations
    get_visitations();
  }, [user]);

  return (
    <>
      {
        // if loading we return 8  skeletons
        fetch_calls_state.loading || fetch_user_state.loading ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-10 place-items-center ">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="flex w-full duration-300  flex-col space-y-2 bg-white/10 rounded-xl p-4 border-b-primary border-b-2"
              >
                {/* Status + detail link */}
                <Skeleton
                  variant="text"
                  width="40%"
                  height={20}
                  className="bg-white/30"
                />

                {/* visitor  name */}
                <Skeleton
                  variant="text"
                  width="70%"
                  height={40}
                  className="bg-white/30"
                />

                {/* date */}
                <Skeleton
                  variant="text"
                  width="30%"
                  height={20}
                  className="bg-white/30"
                />

                {/* Time */}
                <Skeleton
                  variant="text"
                  width="30%"
                  height={20}
                  className="bg-white/30"
                />
              </div>
            ))}
          </div>
        ) : (
          // if not loading we return the cards
          <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-10 place-items-center ">
            {calls.map((call) => (
              <CallsCard key={call.$id} call={call} />
            ))}
          </div>
        )
      }
    </>
  );
};

export default CallsGrid;

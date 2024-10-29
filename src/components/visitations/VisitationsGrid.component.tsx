"use client";

import React, { useEffect, useState } from "react";
import VisitationCard from "./VisitationCard.component";
import { useUserContext } from "@/contexts/User.context";
import { APPWRITE_DATABASE, TVisitation } from "@/utils/types";
import { Query } from "appwrite";
import database from "@/utils/appwrite/appwrite_database.utils";
import useFetch from "@/hooks/useFetch.hook";
import { Skeleton } from "@mui/material";

const VisitationsGrid = () => {
  const { user, fetch_user_state } = useUserContext();
  const [visitations, setVisitations] = useState<TVisitation[]>([]);
  const fetch_visitations_state = useFetch({ loading: true });

  /**
   * * Function responsible for retrieving orphanage visitations
   */
  const get_visitations = async () => {
    try {
      // * Display loading indicator
      fetch_visitations_state.display_loading();

      // * Retrieve visitations created by this user
      const visitations = await database.listDocuments(
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.VISITATIONS_COLLECTION_ID,
        [Query.equal("orphanage_id", user?.$id || "")]
      );

      // * Add the results to the visitation list
      setVisitations(
        visitations.documents.map((visitation) => ({
          $id: visitation.$id,
          orphanage_id: visitation.orphanage_id,
          visit_date: visitation.visit_date,
          visit_time: visitation.visit_time,
          visit_description: visitation.visit_description,
          visitor_name: visitation.visitor_name,
          visit_status: visitation.visit_status,
          visitor_id: visitation.visitor_id,
        }))
      );
      // * Display success message
      fetch_visitations_state.display_success(
        "Visitations retrieved successfully"
      );
    } catch (error) {
      console.error(error);
      // * Display error message
      fetch_visitations_state.display_error((error as any).message || error);
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
      {fetch_visitations_state.loading || fetch_user_state.loading ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-10 place-items-center ">
          {Array.from(
            [1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col gap-2 max-w-[350px]"
              >
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  className="rounded-md !bg-primary-grey"
                  height={150}
                />
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  className="rounded-sm !bg-primary-grey w-1/3"
                  height={15}
                />
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  className="rounded-sm !bg-primary-grey w-2/3"
                  height={15}
                />
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  className="rounded-sm !bg-primary-grey w-3/5"
                  height={15}
                />
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-10 place-items-center ">
          {visitations.map((visitation) => (
            <VisitationCard key={visitation.$id} visitation={visitation} />
          ))}
        </div>
      )}
    </>
  );
};

export default VisitationsGrid;

import CallsGrid from "@/components/calls/CallsGrid.component";
import CallsTitle from "@/components/calls/CallTitle.component";
import RouteProtector from "@/components/RouteProtector.component";
import VisitationsTitle from "@/components/visitations/VisitationsTitle.component";
import React from "react";

const Calls = () => {
  return (
    <RouteProtector role="orphanage">
      <div className="flex flex-col space-y-10">
        {/* Title + filters */}
        <CallsTitle />

        {/* Visitations grid */}
        <CallsGrid />
      </div>
    </RouteProtector>
  );
};

export default Calls;

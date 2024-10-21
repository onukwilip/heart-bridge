import React from "react";
import TabWrapper from "@/components/account/TabWrapper.component";

const Account = () => {
  return (
    <div className="box-border p-0 lg:p-8  h-full text-white">
      {/* Grey tab container */}
      <div className="rounded-lg flex gap-6 flex-col bg-light-gray h-full p-3 lg:p-6 overflow-y-auto">
        {/* Page name */}
        <div className="text-xl">Account settings</div>
        {/* Tab */}
        <TabWrapper />
      </div>
    </div>
  );
};

export default Account;

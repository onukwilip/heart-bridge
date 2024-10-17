import Tab from "@/components/molecules/Tab.component";
import UserProfle from "@/components/account/UserProfle.component";
import { TabContentClass, TabMenuClass } from "@/utils/account/classes";
import { ORPHANAGE_USER_TAB_SLUGS } from "@/utils/types";
import React from "react";
import BankAccount from "@/components/account/BankAccount.component";
import Contact from "@/components/account/Contact.component";

const tab_menus: TabMenuClass[] = [
  { slug: ORPHANAGE_USER_TAB_SLUGS.PROFILE, name: "my profile" },
  { slug: ORPHANAGE_USER_TAB_SLUGS.BANK_ACCOUNT, name: "bank account" },
  { slug: ORPHANAGE_USER_TAB_SLUGS.CONTACT, name: "contact" },
];

const tab_content: TabContentClass[] = [
  { slug: ORPHANAGE_USER_TAB_SLUGS.PROFILE, content: <UserProfle /> },
  { slug: ORPHANAGE_USER_TAB_SLUGS.BANK_ACCOUNT, content: <BankAccount /> },
  { slug: ORPHANAGE_USER_TAB_SLUGS.CONTACT, content: <Contact /> },
];

const Account = () => {
  return (
    <div className="box-border p-0 lg:p-8  h-full text-white">
      {/* Grey tab container */}
      <div className="rounded-lg flex gap-6 flex-col bg-light-gray h-full p-3 lg:p-6 overflow-y-auto">
        {/* Page name */}
        <div className="text-xl">Account settings</div>
        {/* Tab */}
        <Tab menus={tab_menus} type="vertical" tabs={tab_content} />
      </div>
    </div>
  );
};

export default Account;

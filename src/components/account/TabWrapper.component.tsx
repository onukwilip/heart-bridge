"use client";
import React, { FC, ReactNode } from "react";
import Tab from "../molecules/Tab.component";
import { ORPHANAGE_USER_TAB_SLUGS, TUser } from "@/utils/types";
import { TabContentClass, TabMenuClass } from "@/utils/account/classes.utils";
import UserProfle from "./UserProfle.component";
import BankAccount from "./BankAccount.component";
import Contact from "./Contact.component";
import Cookie from "js-cookie";
import { USER_COOKIE_NAME } from "@/utils/constants.utils";
import { Models } from "appwrite";

const TabWrapper: FC = () => {
  const user = JSON.parse(
    Cookie.get(USER_COOKIE_NAME) || ""
  ) as Models.User<TUser>;

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

  if (user?.prefs?.account_type === "donor") {
    return <UserProfle />;
  }

  return (
    <>
      <Tab menus={tab_menus} type="vertical" tabs={tab_content} />
    </>
  );
};

export default TabWrapper;

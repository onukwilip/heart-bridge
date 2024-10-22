"use client";
import React, { FC } from "react";
import Tab from "../molecules/Tab.component";
import { ORPHANAGE_USER_TAB_SLUGS, TUser } from "@/utils/types";
import { TabContentClass, TabMenuClass } from "@/utils/account/classes.utils";
import UserProfle from "./UserProfle.component";
import BankAccount from "./BankAccount.component";
import Contact from "./Contact.component";
import { useUserContext } from "@/contexts/User.context";
import { Skeleton } from "@mui/material";
import TabSection from "../molecules/TabSection.component";

const TabWrapper: FC = () => {
  const { user, fetch_user_state } = useUserContext();

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

  if (fetch_user_state.loading) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <TabSection>
          <div className="flex gap-2 items-center">
            <Skeleton
              variant="circular"
              width={80}
              height={80}
              animation="pulse"
              className="!bg-primary-grey"
            />
            <div className="flex flex-col gap-1">
              <Skeleton
                variant="text"
                width={200}
                animation="pulse"
                className="!bg-primary-grey"
              />
              <Skeleton
                variant="text"
                width={150}
                animation="pulse"
                className="!bg-primary-grey"
              />
            </div>
          </div>
        </TabSection>
        <TabSection>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-2">
            {[1, 3, 4, 5, 6, 6].map((_) => (
              <div className="flex flex-col gap-1 max-w-[250px]">
                <Skeleton
                  variant="text"
                  width={"100%"}
                  animation="pulse"
                  className="!bg-primary-grey"
                />
                <Skeleton
                  variant="text"
                  width={"80%"}
                  animation="pulse"
                  className="!bg-primary-grey"
                />
              </div>
            ))}
          </div>
        </TabSection>
        <TabSection>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-2">
            {[1].map((_) => (
              <div className="flex flex-col gap-1 max-w-[250px]">
                <Skeleton
                  variant="text"
                  width={"100%"}
                  animation="pulse"
                  className="!bg-primary-grey"
                />
                <Skeleton
                  variant="text"
                  width={"80%"}
                  animation="pulse"
                  className="!bg-primary-grey"
                />
              </div>
            ))}
          </div>
        </TabSection>
      </div>
    );
  }

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

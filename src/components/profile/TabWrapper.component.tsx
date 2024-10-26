import { TProject, TUser } from "@/utils/types";
import React, { FC } from "react";
import Tab from "../molecules/Tab.component";
import { TabMenuClass } from "@/utils/account/classes.utils";
import BioTab from "./BioTab.component";
import ContactTab from "./ContactTab.component";
import ProjectsTab from "./ProjectsTab.component";

const tab_menus: TabMenuClass[] = [
  {
    name: "projects",
    slug: "projects",
    content: (
      <>
        <i className="fas fa-dollar-sign"></i>&nbsp;&nbsp;<span>Projects</span>
      </>
    ),
  },
  {
    name: "bio",
    slug: "bio",
    content: (
      <>
        <i className="fas fa-info"></i>&nbsp;&nbsp;<span>Bio</span>
      </>
    ),
  },
  {
    name: "contact",
    slug: "contact",
    content: (
      <>
        <i className="fa-regular fa-address-book"></i>&nbsp;&nbsp;
        <span>Contact</span>
      </>
    ),
  },
];

const TabWrapper: FC<{
  user: TUser & { projects?: TProject[] };
  className: string;
}> = ({ user, className }) => {
  return (
    <div className={`${className}`}>
      <Tab
        type="horizontal"
        tab_param="profile_tab"
        base_route={`/orphanages/${user?.$id}`}
        menus={tab_menus}
        tabs={[
          {
            slug: "projects",
            content: <ProjectsTab projects={user.projects || []} />,
          },
          { slug: "bio", content: <BioTab bio={user.bio || ""} /> },
          { slug: "contact", content: <ContactTab user={user} /> },
        ]}
      />
    </div>
  );
};

export default TabWrapper;

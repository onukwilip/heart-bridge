"use client";
import { TabContentClass, TabMenuClass } from "@/utils/account/classes.utils";
import { TAB_PAGE_NAMES } from "@/utils/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, ReactNode, useEffect, useState } from "react";

const Tab: FC<{
  type?: "vertical" | "horizontal";
  menus: TabMenuClass[];
  tabs: TabContentClass[];
}> = ({ type, menus, tabs }) => {
  const pathname = usePathname();
  const router = useRouter();
  const search_params = useSearchParams();
  const [current_tab, setCurrentTab] = useState<string | undefined>(
    search_params.get("user_tab") || undefined
  );
  const current_tab_details =
    tabs.find((tab) => tab.slug === current_tab) || tabs[0];

  /**
   * * Updates the current tab when the route changes
   */
  const handle_route_change = () => {
    setCurrentTab(search_params.get("user_tab") || undefined);
  };

  useEffect(() => {
    handle_route_change();
  }, [pathname, search_params]);

  return (
    <div
      className={`flex h-full ${
        type === "vertical" ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      {/* Menus */}
      <div
        className={`flex py-2 gap-1 md:gap-3 w-full ${
          type === "vertical"
            ? "flex-row flex-0 px-4 border-b border-b-weak-grey md:flex-col md:px-1 lg:px-6 md:border-r md:border-r-weak-grey md:border-b-0 md:h-full md:flex-1"
            : "flex-row px-4 border-b border-b-weak-grey flex-0"
        }`}
      >
        {menus.map((menu, i) => (
          <>
            <div
              onClick={() =>
                router.push(
                  `/dashboard/${TAB_PAGE_NAMES.ACCOUNT}?user_tab=${menu.slug}`
                )
              }
              className={`py-2 px-2 md:px-6 text-sm rounded-full flex items-center hover:text-primary md:hover:bg-primary md:hover:text-white cursor-pointer capitalize transition w-fit text-nowrap ${
                current_tab === menu.slug || (!current_tab && i == 0)
                  ? "md:bg-primary md:text-white text-primary"
                  : ""
              }`}
            >
              {menu.name}
            </div>
          </>
        ))}
      </div>
      {/* Tab */}
      <div className="flex-0 w-full py-3 md:px-4 lg:px-8 flex flex-col gap-4">
        <div className="text-lg md:text-xl capitalize">
          {menus.find((menu) => menu.slug === current_tab_details.slug)?.name}
        </div>
        <>{current_tab_details.content}</>
      </div>
    </div>
  );
};

export default Tab;

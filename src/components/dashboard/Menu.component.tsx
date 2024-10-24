"use client";
import usePageName from "@/hooks/usePageName.hook";
import { MenuClass } from "@/utils/dashboard/classes.utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, MouseEventHandler, useEffect } from "react";

const Menu: FC<{
  menu: MenuClass;
  expand?: boolean;
  iconClassName?: string;
  linkClassName?: string;
  onClick?: Function;
}> = ({ menu, expand, linkClassName, iconClassName, onClick }) => {
  const { current_page_name } = usePageName();
  const active = current_page_name === menu.name;
  const router = useRouter();

  /**
   * * Function responible for executing the onClick function passed by the parent and navigating the user
   * @param e The click event handler
   */
  const handle_click: MouseEventHandler<HTMLDivElement> = async (e) => {
    // * Execute the onClick event by the parent component if any as passed
    onClick && (await onClick());

    // * Navigate to the login page
    router.push(menu.link);
  };

  return (
    <Link
      href={menu.link}
      {...(onClick && { onClick: onClick as any })}
      {...(!expand ? { title: menu.name } : {})}
      className={`py-3 px-6 transition w-full flex items-center gap-4 capitalize cursor-pointer relative hover:text-primary hover:bg-[#007AFF1A] hover:before:absolute hover:before:w-2 hover:before:h-6 hover:before:rounded-r hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:left-0 hover:before:bg-primary ${
        active
          ? "text-primary bg-[#007AFF1A] before:absolute before:w-2 before:h-6 before:rounded-r before:top-1/2 before:-translate-y-1/2 before:left-0 before:bg-primary"
          : "text-primary-grey"
      } ${linkClassName || ""}`}
    >
      <i className={`${menu.icon} ${iconClassName || ""}`} />
      <span className={expand ? "inline" : "hidden"}>{menu.name}</span>
    </Link>
  );
};

export default Menu;

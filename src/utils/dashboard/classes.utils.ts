import { FC, ReactNode } from "react";
import { TUserRoles } from "../types";

export class MenuClass {
  constructor(
    public name: string,
    public link: string,
    public icon: string,
    public role?: TUserRoles
  ) {}
}

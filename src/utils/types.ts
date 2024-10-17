import { StaticImageData } from "next/image";

export type TUser = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  account_type: "orphanage" | "donor";
  orphanage_name?: string;
  image?: string;
};

export enum SIGNUP_FORMSTATE {
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  EMAIL = "email",
  ACCOUNT_TYPE = "account_type",
  PASSWORD = "password",
  ORPHANAGE_NAME = "orphanage_name",
}

export enum TAB_PAGE_NAMES {
  DASHBOARD = "dashboard",
  DONATIONS = "donations",
  PROJECTS = "projects",
  VISITATIONS = "visitations",
  CALLS = "calls",
  ACCOUNT = "account",
}

export const USER_COOKIE_NAME = "user";

export interface Summary {
  title: string;
  value: string;
  icon: StaticImageData | string;
  color: string;
}

export interface Donation {
  donor: string;
  amount: number;
  project: string;
  date: string;
}

export interface Visitation {
  visitor: string;
  date: string;
  time: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  // location: string;
  // date: string;
  // time: string;
  donations: number;
  visitations: number;
  calls: number;
  targetAmount: number;
  currentAmount: number;
  status: "active" | "completed" | "draft";
}

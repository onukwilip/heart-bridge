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

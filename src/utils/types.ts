export type TUser = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  account_type: "orphanage" | "donor";
};

export enum SIGNUP_FORMSTATE {
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  EMAIL = "email",
  ACCOUNT_TYPE = "account_type",
  PASSWORD = "password",
}

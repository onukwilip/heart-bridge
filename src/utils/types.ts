import { Models } from "appwrite";
import { StaticImageData } from "next/image";

export type TUserRoles = "orphanage" | "donor";

export type TUser = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  account_type: TUserRoles;
  orphanage_name?: string;
  image?: string;
  bio?: string;
};

export enum APPWRITE_DATABASE {
  DB_ID = "heart_bridge",
  BANK_ACCOUNTS_COLLECTION_ID = "bank_accounts",
  PAYSTACK_DETAILS_COLLECTION_ID = "paystack_details",
  PROJECTS_COLLECTION_ID = "projects",
  NOTIFICATIONS_COLLECTION_ID = "notfications",
}

export enum APPWRITE_BUCKET {
  PROFILE_IMAGES = "profile-images",
  PROJECT_IMAGES = "project-images",
}

export enum BANK_INFORMATION_FORM {
  ACCOUNT_NUMBER = "account_number",
  BANK_NAME = "bank_name",
  ACCOUNT_NAME = "account_name",
  BANK_CODE = "bank_code",
}

export enum PROJECT_FORM {
  TITLE = "title",
  DESCRIPTION = "description",
  GOAL = "goal",
  IMAGES = "images",
  USER_ID = "user_id",
}

export enum SIGNUP_FORMSTATE {
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  EMAIL = "email",
  ACCOUNT_TYPE = "account_type",
  PASSWORD = "password",
  ORPHANAGE_NAME = "orphanage_name",
  BIO = "bio",
}

export enum TAB_PAGE_NAMES {
  DASHBOARD = "dashboard",
  DONATIONS = "donations",
  PROJECTS = "projects",
  VISITATIONS = "visitations",
  CALLS = "calls",
  ACCOUNT = "account",
}

export enum ORPHANAGE_USER_TAB_SLUGS {
  PROFILE = "profile",
  BANK_ACCOUNT = "bank_account",
  CONTACT = "contact",
}

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

export type TProject = {
  $id: string;
  $createdAt: string | Date;
  title: string;
  description: string;
  images: (string | File)[];
  donations: number;
  goal: number;
  current_amount: number;
  status: "active" | "completed" | "draft";
  user_id: string;
};

export type TBankAccount = {
  $id: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_code: string;
  paystack_details?: TPaystackAccountDetails;
};

export type TPaystackAccountDetails = {
  business_name: string;
  account_number: string;
  percentage_charge: number;
  settlement_bank: string;
  currency: string;
  bank: number;
  account_name: string;
  subaccount_code: string;
  id: number;
  $id: string;
};

export type TPayStackResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

export type TBankDetailsParams = Omit<
  TBankAccount,
  "$id" | "paystack_details"
> & {
  user_id: string;
  orphanage_name: string;
  bank_code: string | number;
  bank_account_id?: string;
  paystack_details_id?: string;
  paystack_subbaccount_id?: string;
};

export type TPayStackBankName = {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string | null; // Since it's an empty string, you can consider it as string | null
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string; // Can also be `Date` type, but as it's in ISO format, string is used
  updatedAt: string; // Can also be `Date` type
};

export type TPayStackBankAccountDetails = {
  account_number: string;
  account_name: string;
};

export type TNotification = {
  $id: string;
  initiator_id: string;
  content: string;
  ref_ids: string[];
  type: "visitation" | "call" | "donation";
  user_id: string;
  read: boolean;
};

export type TNotificationDoc = Models.Document & TNotification;

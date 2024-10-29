import { Models } from "appwrite";
import { StaticImageData } from "next/image";

export type TUserRoles = "orphanage" | "donor";

export type TUserAddress = {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  formatted_address?: string;
};

export type TUserLocation = {
  user?: string | TUser;
  lat?: number;
  lng?: number;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  formatted_address?: string;
};

export type TPlaceAPIResponse = {
  candidates: [
    {
      formatted_address: string;
      geometry: {
        location: {
          lat: number;
          lng: number;
        };
        viewport: {
          northeast: {
            lat: number;
            lng: number;
          };
          southwest: {
            lat: number;
            lng: number;
          };
        };
      };
    }
  ];
};

export type TUser = {
  $id?: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  account_type: TUserRoles;
  orphanage_name?: string;
  location?: TUserLocation;
  phone_number?: string;
  image?: string;
  bio?: string;
};

export type TDonation = {
  $id: string;
  $createdAt: string;
  donor?: string | TUser;
  orphanage_id: string;
  amount: string;
  project: string;
  comment?: string;
};

export enum APPWRITE_DATABASE {
  DB_ID = "heart_bridge",
  BANK_ACCOUNTS_COLLECTION_ID = "bank_accounts",
  PAYSTACK_DETAILS_COLLECTION_ID = "paystack_details",
  PROJECTS_COLLECTION_ID = "projects",
  NOTIFICATIONS_COLLECTION_ID = "notfications",
  VISITATIONS_COLLECTION_ID = "671e0a5700199fd0a5d7",
  CALLS_COLLECTION_ID = "671e0caf001327aafec2",
  DONATIONS_COLLECTION_ID = "donations",
  USERS_COLLECTION_ID = "users",
  LOCATION_COLLECTION_ID = "location",
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

export enum USER_FORMSTATE {
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  EMAIL = "email",
  ACCOUNT_TYPE = "account_type",
  PASSWORD = "password",
  PHONE_NUMBER = "phone_number",
  ORPHANAGE_NAME = "orphanage_name",
  BIO = "bio",
  LOCATION = "lastname",
}

export enum LOCATION_ENUM {
  LAT = "lat",
  LNG = "lng",
  COUNTRY = "country",
  STATE = "state",
  CITY = "city",
  STREET = "street",
  FORMATTED_ADDRESS = "formatted_address",
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
  user_id: string;
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

export type TNotificationType = "visitation" | "call" | "donation";

export type TNotification = {
  $id: string;
  initiator_id: string;
  content: string;
  ref_ids: string[];
  type: TNotificationType;
  user_id: string;
  read: boolean;
};

export type TNotificationDonationMetadata = {
  donation_id?: string;
  donor_name?: string;
  orphanage_id?: string;
  amount?: string;
  project_title?: string;
};

export type TNotificationScheduleMetadata = {
  date?: string;
  time?: string;
  donor_name?: string;
};

export type TNotificationDoc = Models.Document & TNotification;

export type TCall = {
  $id: string;
  caller_name: string;
  call_date: string;
  call_time: string;
  caller_id: string;
  orphanage_id: string;
  status: string;
};

export type TVisitation = {
  $id: string;
  visitor_id: string;
  visitor_name: string;
  visit_status: string;
  visit_description: string;
  visit_date: string;
  visit_time: string;
  orphanage_id: string;
};

export enum STATUS {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
}

export type TPayStackInitTransactionParams = {
  orphanage_id: string;
  email: string;
  amount: string;
};

export type TProps<
  SearchParams = Record<string, string>,
  Params = Record<string, string>
> = {
  searchParams: SearchParams;
  params: Params;
};

export type TSearchType = "orphanage" | "project" | "nearby";

export type TIpApiResponse = {
  status: "success" | "fail";
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
};

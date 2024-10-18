import { ReactNode } from "react";
import { TPayStackBankAccountDetails } from "../types";

export class TabMenuClass {
  constructor(public slug: string, public name: string) {}
}

export class TabContentClass {
  constructor(public slug: string, public content: ReactNode) {}
}

export class PaystackAccountDetailsClass
  implements TPayStackBankAccountDetails
{
  constructor(
    public business_name: string,
    public account_number: string,
    public percentage_charge: number,
    public settlement_bank: string,
    public currency: string,
    public bank: number,
    public account_name: string,
    public subaccount_code: string,
    public id: number
  ) {}
}

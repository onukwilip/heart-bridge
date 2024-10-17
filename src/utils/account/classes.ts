import { ReactNode } from "react";

export class TabMenuClass {
  constructor(public slug: string, public name: string) {}
}

export class TabContentClass {
  constructor(public slug: string, public content: ReactNode) {}
}

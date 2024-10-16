import { Donation, Summary, Visitation } from "./types";
import project from "@/images/projects.png";
import call from "@/images/calls.png";
import visitation from "@/images/visitations.png";
import donation from "@/images/donations.png";

export const summaries: Summary[] = [
  {
    title: "Total Donations Received",
    value: "₦ 1,200,000.00",
    icon: donation,
    color: "border-primary",
  },
  {
    title: "Active Projects",
    value: "10",
    icon: project,
    color: "border-secondary",
  },
  {
    title: "Upcoming Visitations",
    value: "20",
    icon: visitation,
    color: "border-golden",
  },
  {
    title: "Scheduled Calls",
    value: "15",
    icon: call,
    color: "border-hot-red",
  },
];

export const fakeDonations: Donation[] = [
  {
    donor: "John Doe",
    amount: 200000,
    project: "Project 1",
    date: "2021-10-01",
  },
];

export const fakeVisitation: Visitation[] = [
  {
    visitor: "Jane Doe",
    date: "2021-10-01",
    time: "10:00 AM",
  },
];

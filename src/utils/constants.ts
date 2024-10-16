import { Summary } from "./types";
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

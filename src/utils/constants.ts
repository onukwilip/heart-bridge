import { Donation, Project, Summary, Visitation } from "./types";
import project from "@/images/projects.png";
import call from "@/images/calls.png";
import visitation from "@/images/visitations.png";
import donation from "@/images/donations.png";

import projectImg1 from "@/images/360_F_632735725_T74nETWjo5dcdQDlQLEIFjJuAR1VkDFH.png";

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

export const fakeProjects: Project[] = [
  {
    id: "1",
    title: "Back to school",
    calls: 10,
    targetAmount: 10000000,
    currentAmount: 250000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus lacus, dignissim commodo dictum aliquam, maximus nec mauris. Phasellus sed nisl dignissim erat eleifend congue. Nullam ultricies est a tempus varius. Phasellus vitae massa rutrum, elementum urna sed, volutpat urna. Nam at nulla dui. Suspendisse aliquet metus purus, eget ultrices tellus pharetra eget. Proin dictum urna non aliquet pellentesque. Nunc dapibus gravida justo eu finibus.",
    image: projectImg1,
    visitations: 10,
    donations: 5,
    status: "active",
  },
];

import { fakeDonations } from "@/utils/constants.utils";
import { formatAmount } from "@/utils/helpers/formatAmount";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import SeeAll from "./SeeAll.component";

const RecentDonations = () => {
  const moreFakeDonations = Array.from({ length: 5 }, (_, i) => ({
    donor: `Donor ${i + 1}`,
    amount: Math.floor(Math.random() * 100000),
    project: `Project ${i + 1}`,
    date: "12/12/2021",
  }));

  return (
    <div className="flex flex-col gap-y-5 w-full">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl text-white">Recent Donations</h3>
        <SeeAll link="/dashboard/donations" />
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr className="border-b border-primary-grey text-end">
            <td className="text-start">Name</td>
            <td>Amount</td>
            <td>Project</td>
            <td>Date</td>
          </tr>
        </thead>

        <tbody>
          {moreFakeDonations.map((donation) => (
            <tr
              key={donation.donor}
              className="border-b border-primary-grey text-end"
            >
              <td className="text-start">{donation.donor}</td>
              <td>₦ {formatAmount(donation.amount)}</td>
              <td>{donation.project}</td>
              <td>{donation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentDonations;

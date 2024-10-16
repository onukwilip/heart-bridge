import { fakeVisitation } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import SeeAll from "./SeeAll";

const UpcomingVisitations = () => {
  const moreFakeUpcomingVisitations = Array.from({ length: 5 }, (_, i) => ({
    visitor: `Visitor ${i + 1}`,
    date: "12/12/2021",
    time: "12:00 PM",
  }));
  return (
    <div className="flex flex-col gap-y-5 w-1/2">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl text-white">Recent Donations</h3>
        <SeeAll link="/dashboard/visitations" />
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr className="border-b border-primary-grey text-end">
            <td className="text-start">Visitor Name</td>
            <td>Date</td>
            <td>Time</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {moreFakeUpcomingVisitations.map((visitation) => (
            <tr
              key={visitation.visitor}
              className="border-b border-primary-grey text-end"
            >
              <td className="text-start">{visitation.visitor}</td>
              <td>{visitation.date}</td>
              <td>{visitation.time}</td>
              <td>
                <Link
                  className="underline"
                  href={`/visitations/${visitation.visitor}`}
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingVisitations;
"use client";
import React, { FC, useState } from "react";
import TabSection from "../molecules/TabSection.component";
import { Models } from "appwrite";
import { TProject, TUser } from "@/utils/types";
import Image from "next/image";
import dummy_image from "@/images/dummy-image.jpg";
import { format_currency } from "@/utils/utils";
import { FormControlLabel, RadioGroup } from "@mui/material";
import Radio from "../atoms/Radio.component";
import { PaymentMethodClass } from "@/utils/donate/classes";
import Button from "../atoms/Button.component";

const payment_method = [
  new PaymentMethodClass("Paystack", "paystack"),
  new PaymentMethodClass("Google Pay", "google_pay", undefined, true),
  new PaymentMethodClass("Stripe", "stripe", undefined, true),
];

const Donate: FC<{ user: Models.User<TUser>; project: TProject }> = ({
  user,
  project,
}) => {
  const [amount, setAmount] = useState("0");
  const [payment_mode, setPaymentMode] = useState("paystack");

  return (
    <div className="w-full flex flex-col gap-4 items-center p-2">
      {/* Project summary */}
      <TabSection className="w-full max-w-[700px] text-primary-grey flex gap-3">
        {/* Image container */}
        <div className="hidden xs:block w-[150px] h-[100px] rounded overflow-hidden ">
          <Image
            src={(project.images[0] as string) || dummy_image.src}
            width={200}
            height={200}
            className="w-[150px] h-[100px] object-cover"
            alt={project.title}
          />
        </div>
        {/* Summary */}
        <div>
          You are supporting{" "}
          <b className="!text-white">
            {user.prefs.orphanage_name ||
              `${user.prefs.firstname} ${user.prefs.lastname}`}
          </b>{" "}
          orphanage on their <b className="!text-white">{project.title}</b>{" "}
          project
        </div>
      </TabSection>
      {/* Amount */}
      <TabSection className="w-full max-w-[700px] text-primary-grey flex flex-col gap-4">
        <div className="text-white">Enter your donation</div>
        {/* Ammounts */}
        <div className="w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {["1000", "2000", "5000", "10000", "25000", "50000", "100000"].map(
            (amt) => (
              <span
                className="border border-primary-grey flex justify-center p-3 rounded-xl transition hover:border-primary-grey-dark cursor-pointer"
                onClick={() => setAmount(amt)}
              >
                {" "}
                {format_currency(Number(amt))}
              </span>
            )
          )}
        </div>
        {/* Amount input field */}
        <div className="w-full flex gap-3 items-center">
          <span className="text-2xl xs:text-3xl">NGN</span>
          <input
            type="number"
            className="h-[75px] w-full rounded-xl outline outline-primary-grey focus:outline-primary-grey-dark p-3 bg-transparent text-right text-3xl xs:text-4xl appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to donate here..."
          />
        </div>
      </TabSection>
      {/* Payment */}
      <TabSection className="w-full max-w-[700px] text-primary-grey flex flex-col gap-4">
        {/* Payment method */}
        <div className="text-white">Payment method</div>
        {/* Options */}
        <RadioGroup
          defaultValue="paystack"
          aria-labelledby="demo-customized-radios"
          name="payment_method"
          className="flex flex-col w-full first:!rounded-t-2xl last:!rounded-b-2xl"
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          {payment_method.map((mode, i) => (
            <div
              className={`w-full flex p-4  items-center ${
                i === 0
                  ? "rounded-t-2xl border border-t-primary-grey border-l-primary-grey border-r-primary-grey border-b-0"
                  : i === payment_method.length - 1
                  ? "rounded-b-2xl border border-b-primary-grey border-l-primary-grey border-r-primary-grey border-t-0"
                  : "border border-primary-grey"
              }`}
            >
              <FormControlLabel
                value={mode.value}
                control={<Radio />}
                label={""}
                disabled={mode.disabled}
              />
              <span>{mode.content || mode.name}</span>
            </div>
          ))}
        </RadioGroup>
      </TabSection>
      {/* Payment trigger */}
      <div className="w-full max-w-[700px]">
        <Button className="w-full" disabled={Number(amount) < 1}>
          Donate {format_currency(Number(amount))}
        </Button>
      </div>
    </div>
  );
};

export default Donate;

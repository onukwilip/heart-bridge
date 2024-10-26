"use client";
import React, { FC, useEffect, useState } from "react";
import TabSection from "../molecules/TabSection.component";
import { Models } from "appwrite";
import { TProject, TUser } from "@/utils/types";
import Image from "next/image";
import dummy_image from "@/images/dummy-image.jpg";
import { format_currency, parse_json } from "@/utils/utils";
import { Alert, FormControlLabel, RadioGroup, Snackbar } from "@mui/material";
import Radio from "../atoms/Radio.component";
import { PaymentMethodClass } from "@/utils/donate/classes";
import Button from "../atoms/Button.component";
import { make_transaction } from "@/utils/paystack/paystack_payment.utils";
import useFetch from "@/hooks/useFetch.hook";
import Loader from "../atoms/Loader.component";
import { useModalContext } from "@/contexts/Modal.context";
import SuccessDonation from "./SuccessDonation.component";
import { get_current_user } from "@/utils/appwrite/auth.utils";
import { add_donation } from "@/actions/donation.action";

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
  const [donor, setDonor] = useState<Models.User<TUser>>();
  const payment_fetch_state = useFetch();
  const { open_modal } = useModalContext();
  const user_fetch_state = useFetch();

  const populate_user = async () => {
    user_fetch_state.display_loading();
    // * Fetch user details from cookies
    const donor = await get_current_user();
    // * Populate the user state with it
    setDonor(donor);
    user_fetch_state.display_success("");
  };

  useEffect(() => {
    populate_user();
  }, []);

  /**
   * * Function responsible for making payment using any of the preferred payment methods...
   * @returns void
   */
  const pay = async () => {
    try {
      // * Display loading indicator for the payment process
      payment_fetch_state.display_loading();

      // * Check the user account type, if it's an orphanage, display an error message

      if (donor?.prefs.account_type === "orphanage")
        return payment_fetch_state.display_error(
          "Orphanages cannot make donations, to donate to a project, login as a donor"
        );

      // * If the payment mode is set to paystack, pay using paystack
      if (payment_mode === "paystack") {
        await make_transaction({
          orphanage_id: user.$id,
          email: user.email,
          amount: (Number(amount) * 100).toString(),
        });
        // * Add the transaction to the list of donations made by this donor
        await add_donation({
          orphanage_id: user.$id,
          amount,
          project_id: project.$id,
          donor_id: donor?.$id,
          notification_metadata: {
            amount,
            donor_name: `${donor?.prefs.firstname} ${donor?.prefs.lastname}`,
            project_title: project.title,
          },
        });
        payment_fetch_state.display_success("Success");
        open_modal({
          children: (
            <SuccessDonation
              amount={amount}
              project_title={project.title}
              user={donor?.prefs}
              user_fetch_state={user_fetch_state}
            />
          ),
        });
        return;
      }
      payment_fetch_state.display_success("Success");
    } catch (error) {
      console.error(error);

      const parsed_error_msg = parse_json<{ code: number }>(
        (error as any).message || error
      );
      if (
        typeof parsed_error_msg === "object" &&
        parsed_error_msg.code === 400
      ) {
        return payment_fetch_state.display_error(
          `Sorry but ${
            user.prefs.orphanage_name ||
            `${user.prefs.firstname} ${user.prefs.lastname}`
          } orphanage hasn't set up their bank details`
        );
      }

      payment_fetch_state.display_error((error as any).message || error);
    }
  };

  return (
    <>
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
          <Button
            className="w-full"
            disabled={Number(amount) < 1 || payment_fetch_state.loading}
            onClick={pay}
          >
            {!payment_fetch_state.loading ? (
              `Donate ${format_currency(Number(amount))}`
            ) : (
              <Loader type="button" />
            )}
          </Button>
        </div>
      </div>
      {/* The error state */}
      {payment_fetch_state.error && (
        <Snackbar
          open={payment_fetch_state.error ? true : false}
          onClose={() => payment_fetch_state.setError(undefined)}
        >
          <Alert
            color="error"
            onClose={() => payment_fetch_state.setError(undefined)}
          >
            {payment_fetch_state.error}
          </Alert>
        </Snackbar>
      )}
      {/* The success state */}
      {payment_fetch_state.success && (
        <Snackbar
          open={payment_fetch_state.success ? true : false}
          onClose={() => payment_fetch_state.setSuccess(undefined)}
        >
          <Alert
            color="success"
            onClose={() => payment_fetch_state.setSuccess(undefined)}
          >
            Payment made successfully
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Donate;

import React, { FC, ReactNode } from "react";

const PersonalInformationDetail: FC<{
  title: string;
  value: ReactNode;
  no_capitalize?: boolean;
  value_className?: string;
}> = ({ title, value, no_capitalize, value_className }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-primary-grey capitalize">
        {title.split("_").map((each_word) => `${each_word} `)}
      </span>
      <span
        className={`text-md ${!no_capitalize ? "capitalize" : ""} ${
          value_className || ""
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default PersonalInformationDetail;

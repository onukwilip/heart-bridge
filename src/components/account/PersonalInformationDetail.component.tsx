import React, { FC } from "react";

const PersonalInformationDetail: FC<{
  title: string;
  value: string;
  no_capitalize?: boolean;
}> = ({ title, value, no_capitalize }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-primary-grey capitalize">
        {title.split("_").map((each_word) => `${each_word} `)}
      </span>
      <span className={`text-md ${!no_capitalize ? "capitalize" : ""}`}>
        {value}
      </span>
    </div>
  );
};

export default PersonalInformationDetail;

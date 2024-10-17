import React, { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";

const TabSection: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <div
      {...props}
      className={`rounded-2xl border border-weak-grey p-4 ${
        props.className || ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default TabSection;

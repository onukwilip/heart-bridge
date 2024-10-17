import React, { FC } from "react";

const EditButton: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = () => {
  return (
    <div className="flex gap-4 px-4 py-2 items-center rounded-full text-primary-grey border border-weak-grey cursor-pointer transition hover:bg-weak-grey/5">
      <span>Edit</span>
      <i className="fa-regular fa-pen-to-square"></i>
    </div>
  );
};

export default EditButton;

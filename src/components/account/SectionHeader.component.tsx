"use client";
import React, { FC, ReactNode } from "react";
import EditButton from "../atoms/EditButton.component";

const SectionHeader: FC<{
  children: ReactNode;
  onEditClick: React.MouseEventHandler<HTMLDivElement>;
}> = ({ children, onEditClick }) => {
  return (
    <div className="w-full flex flex-wrap flex-col-reverse items-start xs:flex-row xs:items-center gap-6 justify-between">
      <>{children}</>
      <EditButton onClick={onEditClick} />
    </div>
  );
};

export default SectionHeader;

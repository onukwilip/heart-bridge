import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type SeeAllProps = {
  link: string;
};

const SeeAll: React.FC<SeeAllProps> = ({ link }) => {
  return (
    <Link
      href={link}
      className="flex items-center text-primary gap-x-1 duration-300 hover:text-primary/80"
    >
      See all <FaArrowRight />
    </Link>
  );
};

export default SeeAll;

import React, { FC } from "react";

const LogoText: FC<{
  enableExpand?: boolean;
  expand?: boolean;
  reduceOnSmallScreen?: boolean;
}> = ({ enableExpand, expand, reduceOnSmallScreen }) => {
  return (
    <span
      className={`text-white font-bold ${
        reduceOnSmallScreen ? "text-sm md:text-xl" : "text-xl"
      }`}
    >
      {enableExpand ? (
        expand ? (
          <>
            Heart<span className={`text-primary`}>Bridge</span>
          </>
        ) : (
          <>
            H<span className="text-primary">B</span>
          </>
        )
      ) : (
        <>
          Heart<span className="text-primary">Bridge</span>
        </>
      )}
    </span>
  );
};

export default LogoText;

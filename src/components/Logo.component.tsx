import React, { FC } from "react";

const LogoText: FC<{ enableExpand?: boolean; expand?: boolean }> = ({
  enableExpand,
  expand,
}) => {
  return (
    <span className="text-white font-bold text-xl">
      {enableExpand ? (
        expand ? (
          <>
            Heart<span className="text-primary">Bridge</span>
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

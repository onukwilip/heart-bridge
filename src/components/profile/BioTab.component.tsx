import React, { FC } from "react";

const BioTab: FC<{ bio: string }> = ({ bio }) => {
  return <div dangerouslySetInnerHTML={{ __html: bio }} className="list"></div>;
};

export default BioTab;

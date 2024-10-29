import { search_orphanages, search_projects } from "@/actions/search.actions";
import Error404 from "@/components/atoms/Error404.component";
import Header from "@/components/profile/Header.component";
import Search from "@/components/search/Search.component";
import { TProps, TSearchType } from "@/utils/types";
import { Metadata } from "next";
import React, { FC } from "react";

/**
 * * Function responsible for dynamically rendering the page's metadata object
 * @param param0 The next JS property
 * @returns The page metadata object
 */
export const generateMetadata = async ({
  searchParams,
}: TProps<{ type: TSearchType; name: string }>): Promise<Metadata> => {
  try {
    const search_type = searchParams["type"];

    return {
      title: `Search ${search_type} ${
        search_type === "nearby" ? "orphanages" : ""
      }`,
      description: `Search for ${search_type} ${
        search_type === "nearby" ? "orphanages within your area" : ""
      }`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Item not found",
    };
  }
};

const Searchpage: FC<TProps<{ type: TSearchType; name: string }>> = async ({
  searchParams,
}) => {
  try {
    const search_type: TSearchType = searchParams["type"] || "orphanage";
    const name = searchParams["name"] || "";

    return (
      <div>
        <Header />
        {/* Search component */}
        <Search type={search_type} name={name} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <section className="h-screen flex items-center justify-center">
        <Error404 msg="The item you're searching for doesn't exist" />
      </section>
    );
  }
};

export default Searchpage;

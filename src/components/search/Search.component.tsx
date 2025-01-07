"use client";
import { TProject, TSearchType, TUser, TUserLocation } from "@/utils/types";
import {
  Alert,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Skeleton,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { RoundedFormControl } from "../atoms/RoundedFormControl.component";
import { useRouter, useSearchParams } from "next/navigation";
import Error404 from "../atoms/Error404.component";
import SearchItem from "./SearchItem.component";
import {
  search_nearby_orphanages,
  search_orphanages,
  search_projects,
} from "@/actions/search.actions";
import useFetch from "@/hooks/useFetch.hook";
import Loader from "../atoms/Loader.component";
import { get_user_location } from "@/utils/search/search.utils";
import Map from "../map/Map.component";
import SearchMap from "./SearchMap.component";
import LoadingSearch from "./LoadingSearch.component";

const Search: FC<{
  type: TSearchType;
  name?: string;
  orphanages?: TUser[];
  projects?: TProject[];
}> = ({
  orphanages: parent_orphanages,
  projects: parent_projects,
  type,
  name,
}) => {
  const router = useRouter();
  //   const search_params = useSearchParams();
  const [search_type, setSearchType] = useState<TSearchType>(
    type || "orphanage"
  );
  const [search_name, setSearchName] = useState(name || "");
  const [orphanages, setOrphanages] = useState(parent_orphanages || []);
  const [projects, setProjects] = useState(parent_projects || []);
  const fetch_state = useFetch({ loading: true });
  const [user_location, setUserLocation] = useState<TUserLocation>();
  const [display_mobile_map, setDisplayMobileMap] = useState(false);

  /**
   * * Function responsible for updating the user's search type
   * @param e The change event handler
   * @param value The selected search type
   */
  const handle_search_type_change: (
    event: React.MouseEvent<HTMLElement>,
    value: TSearchType
  ) => void = (e, value) => {
    if (!value) return;
    setSearchType(value);
    router.push(`/search?type=${value}&name=${name}`);
  };

  /**
   * * Function responsible for updating the user's search query
   * @param e The change event handler
   * @param value The entered search name
   */
  const update_url = async () => {
    if (search_name) {
      router.push(`/search?type=${search_type}&name=${search_name}`);
    } else {
      router.push(`/search?type=${search_type}`);
    }
  };

  /**
   * * Function responsible for searching for orphanages/projects/nearby orphanages
   * @returns void
   */
  const search = async () => {
    try {
      // * Display the loading state
      fetch_state.display_loading();

      if (search_type === "orphanage") {
        const orphanages = await search_orphanages(name || "");
        setOrphanages(orphanages);
        // * Display the success state
        fetch_state.display_success("");
        return;
      }
      if (search_type === "nearby") {
        // * Get the user's location
        const user_location = await get_user_location(() =>
          fetch_state.display_error(
            "Please turn on your device location/grant the site access to the browser location"
          )
        );
        setUserLocation(user_location);
        // * Search for nearby orphanages based on the user's location
        const nearby_orphanages = await search_nearby_orphanages(user_location);
        setOrphanages(nearby_orphanages);
        // * Display the success state
        fetch_state.display_success("");
        return;
      }
      if (search_type === "project") {
        const projects = await search_projects(name || "");
        setProjects(projects);
        // * Display the success state
        fetch_state.display_success("");
        return;
      }
    } catch (error) {
      console.error(error);
      // * Display the error state
      fetch_state.display_error((error as any).message || error);
    }
  };

  useEffect(() => {
    search();
  }, [search_type]);

  if (fetch_state.loading) {
    return <LoadingSearch />;
  }

  return (
    <>
      <div className="w-full flex gap-4 justify-center py-4 px-2 sm:px-4">
        {/* Search components */}
        <div className="w-full max-w-[600px] flex flex-col gap-8">
          {/* Search bar */}
          <div className="w-full flex flex-col sm:flex-row gap-2 ">
            {/* Search field */}
            <RoundedFormControl
              variant="outlined"
              className="w-full flex rounded-xl"
            >
              <InputLabel htmlFor="search">Search</InputLabel>
              <OutlinedInput
                value={search_name}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") update_url();
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <i
                      onClick={update_url}
                      className={`fas fa-magnifying-glass text-2xl transition text-primary-grey hover:text-primary cursor-pointer`}
                    ></i>
                  </InputAdornment>
                }
                label="Search"
              />
            </RoundedFormControl>
            {/* Search type toogle buttons */}
            <ToggleButtonGroup
              color="primary"
              value={search_type}
              exclusive
              onChange={handle_search_type_change}
              aria-label="Search type"
              size="small"
            >
              <ToggleButton
                value="orphanage"
                className="!text-white rounded-lg border border-weak-grey"
              >
                Orphanage
              </ToggleButton>
              <ToggleButton
                value="project"
                className="!text-white rounded-lg border border-weak-grey"
              >
                Project
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          {/* Search nearby orphanages */}
          {search_type === "orphanage" && (
            <div className="w-full flex gap-2">
              <div
                onClick={() => {
                  setSearchType("nearby");
                  router.push("/search?type=nearby");
                }}
                className="!text-primary cursor-pointer"
              >
                Search nearby orphanages
              </div>
            </div>
          )}

          {/* Nearby orphanages indicator */}
          {search_type === "nearby" && (
            <div className="w-full flex flex-col text-lg">
              <span>Nearby orphanages</span>
              <span
                className="!text-primary inline-block lg:hidden cursor-pointer"
                onClick={() => setDisplayMobileMap(true)}
              >
                View on map
              </span>
            </div>
          )}

          {/* Results */}
          <div className="w-full max-w-[700px]">
            {/* Orphanages */}
            {search_type === "orphanage" &&
              (orphanages?.length > 0 ? (
                orphanages.map((orphanage) => (
                  <SearchItem
                    key={orphanage?.$id}
                    type="orphanage"
                    orphanage={orphanage}
                  />
                ))
              ) : (
                <Error404 msg={`No orphanages found with name - ${name}`} />
              ))}
            {/* Nearby orphanages */}
            {search_type === "nearby" &&
              (orphanages?.length > 0 ? (
                orphanages.map((orphanage) => (
                  <SearchItem
                    key={orphanage?.$id}
                    type="orphanage"
                    orphanage={orphanage}
                  />
                ))
              ) : (
                <Error404 msg={`No nearby orphanages found`} />
              ))}
            {/* Projects */}
            {search_type === "project" &&
              (projects?.length > 0 ? (
                projects.map((project) => (
                  <SearchItem
                    key={project?.$id}
                    type="project"
                    project={project}
                  />
                ))
              ) : (
                <Error404 msg={`No projects found with name - ${name}`} />
              ))}
          </div>
        </div>
        {/* Map */}
        {search_type === "nearby" &&
          orphanages.length > 0 &&
          user_location?.lat &&
          user_location?.lng && (
            <div className="w-full h-[600px] max-w-[600px] sticky top-0 right-0 overflow-hidden rounded-lg hidden lg:block">
              <SearchMap
                location={{ lat: user_location?.lat, lng: user_location.lng }}
                orphanages={orphanages}
              />
            </div>
          )}
      </div>
      {/* The error state */}
      {fetch_state.error && (
        <Snackbar
          open={fetch_state.error ? true : false}
          onClose={() => fetch_state.setError(undefined)}
        >
          <Alert color="error" onClose={() => fetch_state.setError(undefined)}>
            {fetch_state.error}
          </Alert>
        </Snackbar>
      )}
      {/* Mobile map */}
      {display_mobile_map && (
        <>
          {search_type === "nearby" &&
            orphanages.length > 0 &&
            user_location?.lat &&
            user_location?.lng && (
              <div className="fixed top-0 left-0 z-30 w-screen h-screen">
                {/* Cancel button */}
                <div
                  onClick={() => setDisplayMobileMap(false)}
                  className="rounded-full flex items-center justify-center w-[40px] h-[40px] bg-white !text-red-500 text-lg shadow-md fixed top-1 right-4 z-10 cursor-pointer"
                >
                  <i className="fas fa-xmark"></i>
                </div>
                <SearchMap
                  location={{ lat: user_location?.lat, lng: user_location.lng }}
                  orphanages={orphanages}
                />
              </div>
            )}
        </>
      )}
    </>
  );
};

export default Search;

import axios, { AxiosResponse } from "axios";
import { get_address } from "@/actions/location.action";
import { TIpApiResponse, TUserLocation } from "../types";

/**
 * * Function responsible for retirving the location of the user performing the search
 * @param on_geolocation_error Function to be executed when the geolocation API could not return the user's location information
 */
export const get_user_location = async (
  on_geolocation_error: Function
): Promise<TUserLocation> => {
  const promise = new Promise<TUserLocation>((resolve, reject) => {
    // * Try retriving the user location from the geo-location API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // * Retrieve the User's address from the Google reverse Geocoding API
          const address = await get_address({ latitude, longitude });

          // * If the address could not be returned, return error
          if (!address) {
            return reject("Could not retrieve user location");
          }

          console.log("Geo location address", address);

          const split_address = address.split(", ");

          const location: TUserLocation = {
            city: split_address[1],
            state: split_address[split_address.length - 2],
            country: split_address[split_address.length - 1],
            lat: latitude,
            lng: longitude,
          };

          return resolve(location);
        },
        // * If there was an error in retrieving the user's location, try retrieving the location from the IP address
        async (err) => {
          // * Inform user to turn on his/her location
          console.error(
            "Turn on your location/grant access to your location",
            err
          );
          on_geolocation_error();

          // * Get the user location from his IP address
          const res = await axios
            .get<any, AxiosResponse<TIpApiResponse>>(`http://ip-api.com/json/`)
            .catch((e) => console.error(e));

          // * If the user's location couldn't be retrieved, throw error message
          if (!res) {
            return reject("Could not retrieve user location");
          }

          const { lat: latitude, lon: longitude } = res.data;

          const address = await get_address({ latitude, longitude });

          if (!address) {
            return reject("Could not retrieve user location");
          }

          //   console.log("IP address", address);

          const split_address = address.split(", ");

          const location: TUserLocation = {
            city: split_address[1],
            state: split_address[split_address.length - 2],
            country: split_address[split_address.length - 1],
            lat: latitude,
            lng: longitude,
          };

          return resolve(location);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }
  });

  return promise;
};

"use server";

import { TPlaceAPIResponse, TUserAddress, TUserLocation } from "@/utils/types";
import axios, { AxiosResponse } from "axios";

/**
 * * Function rsponsible for retrieving places withc correspond to a specific name from the Google Maps API
 * @param place The place to search for
 */
export const get_places = async (place: string) => {
  try {
    if (place.trim() === "") return;

    // * Retrieve places corresponding to the name of the provided place from Google Maps API
    const res = await axios.get<any, AxiosResponse<TPlaceAPIResponse>>(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=formatted_address,geometry&key=${process.env.GOOGLE_API_KEY}`
    );

    const formatted_response: TUserLocation[] = [];

    // * Loop through and format each place, retrievign the street, LGA/City, state, and Country
    for (const place of res.data.candidates) {
      const place_array = place.formatted_address.split(", ");
      formatted_response.push({
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        street: place_array[0],
        city: place_array[1],
        state: place_array[place_array.length - 2],
        country: place_array[place_array.length - 1],
        formatted_address: place.formatted_address,
      });
    }

    return formatted_response;
  } catch (error) {
    const error_text =
      (error as any)?.response?.data?.message ||
      (error as any)?.message ||
      error;
    console.error(error_text);
    throw new Error(error_text);
  }
};

/**
 * Retrieves the address of the coordinates
 * @param location The object containing the tattitude and the longitude coordinates
 * @returns The address of the user
 */
export const get_address = async (location: {
  latitude: number;
  longitude: number;
}): Promise<string | undefined> => {
  try {
    const res = await axios.get<{
      results: { formatted_address: string }[];
    }>(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${process.env.GOOGLE_API_KEY}`
    );

    if (res.status !== 200) {
      return undefined;
    }

    return res.data?.results?.[0]?.formatted_address;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

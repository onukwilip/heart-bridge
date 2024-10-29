"use cient";
import React, {
  forwardRef,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Loader from "@/components/atoms/Loader.component";
import { useMapContext } from "@/contexts/Map.context";
import { Skeleton } from "@mui/material";

const Map = forwardRef<
  any,
  { children?: ReactNode; centre?: { lat: number; lng: number } }
>(({ children, centre }, reference) => {
  const map = useRef<google.maps.Map>();
  const { map_ref } = useMapContext();
  const fallback_center = useMemo(
    () => ({
      lat: 9.082,
      lng: 8.6753,
    }),
    []
  );
  const [zoom, setZoom] = useState(10);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });

  const onLoad = useCallback((mapObj: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(
      centre || fallback_center
    );
    mapObj.fitBounds(bounds);
    mapObj.setZoom(5);

    map.current = mapObj;
    map_ref.current = mapObj;

    if (reference)
      (reference as MutableRefObject<google.maps.Map>).current = mapObj;
  }, []);

  useEffect(() => {
    setZoom(7);
  }, []);

  if (!isLoaded)
    return (
      <>
        <Skeleton
          width={"100%"}
          height={"100%"}
          animation="pulse"
          className="!bg-primary-grey"
          variant="rounded"
        />
      </>
    );

  return (
    <>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={onLoad}
      >
        {children}
      </GoogleMap>
    </>
  );
});

export default Map;

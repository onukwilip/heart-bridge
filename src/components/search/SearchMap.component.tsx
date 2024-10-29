"use client";
import { TUser } from "@/utils/types";
import React, { FC, useEffect, useRef, useState } from "react";
import Map from "../map/Map.component";
import {
  Circle,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import marker_icon from "@/images/orphanage-marker.png";
import dummy_profile from "@/images/dummy-profile-pic.png";
import Image from "next/image";
import Button from "../atoms/Button.component";
import { useRouter } from "next/navigation";

const SearchMap: FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & { orphanages: TUser[]; location: { lat: number; lng: number } }
> = (props) => {
  const map_ref = useRef<google.maps.Map>();
  const router = useRouter();
  const [display_info, setDisplayInfo] = useState<{
    lat: number;
    lng: number;
    orphanage: TUser;
  }>();

  useEffect(() => {
    if (map_ref.current) {
      map_ref.current.panTo(props.location);
      map_ref.current.setZoom(13);
    }
  }, [map_ref.current]);

  return (
    <div {...props} className="w-full h-full relative">
      {/* Circles label */}
      <div className="p-3 rounded-md flex gap-4 bg-white shadow-md absolute top-2 left-2 z-20 !text-primary-dark text-xs">
        {/* Nearby - green */}
        <div className="flex gap-1 items-center">
          <div className="w-[22.5px] h-[22.5px] bg-green-500/20 flex justify-center items-center rounded-full">
            <div className="w-[10px] h-[10px] bg-green-500 rounded-full"></div>
          </div>
          <span>1.5km</span>
        </div>
        {/* Distant - yellow */}
        <div className="flex gap-1 items-center">
          <div className="w-[22.5px] h-[22.5px] bg-yellow-500/20 flex justify-center items-center rounded-full">
            <div className="w-[10px] h-[10px] bg-yellow-500 rounded-full"></div>
          </div>
          <span>3.0km</span>
        </div>
        {/* Far - red */}
        <div className="flex gap-1 items-center">
          <div className="w-[22.5px] h-[22.5px] bg-red-500/20 flex justify-center items-center rounded-full">
            <div className="w-[10px] h-[10px] bg-red-500 rounded-full"></div>
          </div>
          <span>5.0km</span>
        </div>
      </div>
      {/* Map */}
      <Map ref={map_ref}>
        {/* The orphanage markers (the marker clusterer) */}
        <MarkerClusterer>
          {(cluster) => (
            <>
              {props.orphanages.map((orphanage) => {
                if (orphanage.location?.lat && orphanage.location?.lng)
                  return (
                    <Marker
                      key={orphanage.$id}
                      position={{
                        lat: orphanage.location?.lat,
                        lng: orphanage.location?.lng,
                      }}
                      icon={{ url: marker_icon.src, scale: 0.7 }}
                      clusterer={cluster}
                      onClick={() =>
                        setDisplayInfo({
                          lat: orphanage.location?.lat || 0,
                          lng: orphanage.location?.lng || 0,
                          orphanage,
                        })
                      }
                    />
                  );
              })}
            </>
          )}
        </MarkerClusterer>
        {/* The current user's position */}
        <Marker position={props.location} />
        {/*  The info window providing insights to orphanage markers */}
        {display_info && (
          <InfoWindow
            position={display_info}
            onCloseClick={() => setDisplayInfo(undefined)}
          >
            <>
              {/* Image */}
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                <Image
                  className="w-[50px] h-[50px] object-cover"
                  width={50}
                  height={50}
                  src={display_info.orphanage?.image || dummy_profile.src}
                  alt={display_info.orphanage?.firstname || ""}
                />
              </div>
              {/* Content */}
              <div className="flex flex-col gap-3 gap-y-1">
                {/* Name */}
                <div className="text-lg !text-page-dark">
                  {display_info.orphanage?.orphanage_name ||
                    `${display_info.orphanage?.firstname} ${display_info.orphanage?.lastname}`}
                </div>
                {/* Location */}
                <div className="flex gap-x-3 gap-y-1 text-sm !text-page-dark items-center">
                  <i className="fas fa-map-pin"></i>
                  <span className="text-wrap">
                    {display_info.orphanage?.location?.formatted_address}
                  </span>
                </div>
              </div>
              <br />
              {/* Button */}
              <div className="w-full">
                <Button
                  outlined
                  className="!h-[40px] !text-xs w-full"
                  onClick={() =>
                    router.push(`/orphanages/${display_info.orphanage.$id}`)
                  }
                >
                  View details
                </Button>
              </div>
            </>
          </InfoWindow>
        )}
        {/* Circles displaying the user's distance radius */}
        <Circle
          center={props.location}
          onCenterChanged={() => {}}
          radius={1500}
          options={{
            strokeColor: "green",
            fillColor: "green",
            fillOpacity: 0.05,
          }}
        />
        <Circle
          center={props.location}
          radius={3000}
          options={{
            strokeColor: "yellow",
            fillColor: "yellow",
            fillOpacity: 0.05,
          }}
        />
        <Circle
          center={props.location}
          radius={5000}
          options={{
            strokeColor: "orangered",
            fillColor: "orangered",
            fillOpacity: 0.05,
          }}
        />
      </Map>
    </div>
  );
};

export default SearchMap;

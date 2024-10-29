"use client";
import {
  createContext,
  FC,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from "react";

const MapContext = createContext<{
  map_ref: MutableRefObject<google.maps.Map | null>;
}>({
  map_ref: { current: null },
});

export const MapContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const map_ref = useRef<google.maps.Map>(null);

  return (
    <MapContext.Provider
      value={{
        map_ref,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);

  if (!context)
    throw new Error("Content must be wrapped inside the MapContextProvider");

  return context;
};

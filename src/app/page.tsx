import Error404 from "@/components/atoms/Error404.component";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Error404 msg="This page doesn't exist" />
    </div>
  );
}

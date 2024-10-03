import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-8">
      <Link href={"/post"}>
        <Button variant={"link"}>Posts</Button>
      </Link>
      <Link href={"/photo"}>
        <Button variant={"link"}>Photos</Button>
      </Link>
    </div>
  );
}

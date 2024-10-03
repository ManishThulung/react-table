import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col gap-10 mt-10">
      <h1 className="text-3xl text-red-600 underline">
        This is the react table Demo/Article
      </h1>
      <div className="flex gap-8">
        <Link href={"/post"}>
          <Button variant={"destructive"} className="text-xl font-semibold">Posts</Button>
        </Link>
        <Link href={"/photo"}>
          <Button variant={"destructive"} className="text-xl font-semibold">Photos</Button>
        </Link>
      </div>
    </div>
  );
}

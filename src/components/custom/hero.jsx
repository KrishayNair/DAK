import Image from "next/image";
import Link from "next/link";
import hero from "../../../public/hero.png";
import { Elsie_Swash_Caps } from "next/font/google";
import { Button } from "../ui/button";

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Hero() {
  const buttons = [
    { text: "Philately Deposit Account", href: "/deposit-account" },
    { text: "Community", href: "/community" },
    { text: "Workshops", href: "/workshops" },
    { text: "Philately Marketplace", href: "/marketplace" },
    { text: "Meetups", href: "/meetups" },
    { text: "Philately Updates", href: "/meetups" },
    { text: "Auction", href: "/meetups" },
  ];

  return (
    <div className="xl:bg-white mt-8 rounded-t-4xl overflow-hidden h-screen xl:ml-24 xl:mr-24 ml-8 mr-8">
      <div className="max-w-7xl relative ">
        <div className="absolute top-0 left-0">
          <Image
            src={hero}
            alt="Hero image"
            width={500}
            height={500}
            className="rounded-lg opacity-75 xl:opacity-100 "
          />
        </div>
        <div className="w-auto absolute top-32 left-96 z-50">
          <h1
            className={`text-4xl xl:text-5xl mb-4 font-primary xl:mr-20 lg:ml-40 ml-60 ${elsieSwashCaps.className}`}
          >
            Connect with India&apos;s <br /> Largest Philately <br />
            Community.
          </h1>
          <p className="text-sm md:text-base text-gray-700 mr-28 ml-40">
            Explore a world of rare stamps, where history, art, and culture come
            together. With Dak, you can grow your collection and connect with
            fellow enthusiasts, discovering timeless treasures every step of the
            way.
          </p>
          <Link href="/">
          <Button className="ml-40 rounded-full py-5 text-base bg-[#FFE5C2] hover:bg-[#FFE5C2/90] mt-8">
            Explore More
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

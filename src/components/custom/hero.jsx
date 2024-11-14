import Image from 'next/image'
import Link from 'next/link'
import hero from "../../../public/hero.png"
import { Elsie_Swash_Caps } from 'next/font/google';

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
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
    <div className="xl:bg-white mt-8 xl:rounded-t-4xl overflow-hidden h-screen ml-24 mr-24 ">
      <div className="max-w-7xl relative ">
        <div className="absolute top-0 left-0">
          <Image
            src={hero}
            alt="Hero image"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="w-auto absolute top-32 right-2 z-50">
          <h1 className={`text-6xl mb-4 font-primary mr-20 ${elsieSwashCaps.className}`}>Connect with India&apos;s <br/> Largest Philately <br />Community !!</h1>
          <p className="text-xl text-gray-700">Everything you are looking for</p>
          <div className="flex flex-wrap">
            {buttons.slice(0, 3).map((button, index) => (
              <Link key={index} href={button.href} className="mt-4 mr-4">
                <button className="bg-transparent hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:shadow-lg">
                  {button.text}
                </button>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap mt-4">
            {buttons.slice(3).map((button, index) => (
              <Link key={index + 3} href={button.href} className="mt-4 mr-4">
                <button className="bg-transparent hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:shadow-lg">
                  {button.text}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
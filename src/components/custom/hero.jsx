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
        <div className="w-auto absolute top-32 right-2 z-50">
          <h1 className={`text-5xl xl:text-6xl mb-4 font-primary xl:mr-20 lg:ml-40 ml-60 ${elsieSwashCaps.className}`}>Connect with India&apos;s <br/> Largest Philately <br />Community !!</h1>
          <p className="text-lg md:text-xl text-gray-700 ml-40">Everything you are looking for</p>
          <div className="flex flex-wrap ml-40">
            {buttons.slice(0, 3).map((button, index) => (
              <Link key={index} href={button.href} className="mt-4 mr-4">
                <button className="bg-transparent hover:bg-black hover:text-white text-gray-600 font-bold py-2 px-4 border border-black rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:shadow-lg">
                  {button.text}
                </button>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap ml-40">
            {buttons.slice(3).map((button, index) => (
              <Link key={index + 3} href={button.href} className="mt-4 mr-4">
                <button className="bg-transparent hover:bg-black hover:text-white text-gray-600 font-bold py-2 px-4 border border-black rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:shadow-lg">
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
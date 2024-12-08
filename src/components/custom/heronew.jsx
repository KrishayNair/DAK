import Image from 'next/image';
import { Elsie_Swash_Caps } from 'next/font/google';

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Heronew() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className={`${elsieSwashCaps.className} text-4xl md:text-5xl font-bold mb-4`}>
          Each stamp carries a piece of <span className="bg-pink-200 px-2">history</span>.
        </h1>
        <p className="font-sans text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
        <div className="relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-200 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center md:justify-end bg-transparent">
        <Image
          src="/heronew.png"
          alt="Stamps Collage"
          width={600}
          height={600}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
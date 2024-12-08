import Image from 'next/image';
import { Elsie_Swash_Caps } from 'next/font/google';

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
});

const MobileHome = () => {
  return (
    <div className="relative overflow-hidden m-2 rounded-xl" style={{ height: '80vh' }}>
      <Image
        src="/heronew.png"
        alt="Stamp background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-white p-5 text-center max-w-md">
          <h1 className={`text-4xl font-serif mb-3 ${elsieSwashCaps.className}`}>
            Each stamp carries a piece of history.
          </h1>
          <p className="text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileHome;

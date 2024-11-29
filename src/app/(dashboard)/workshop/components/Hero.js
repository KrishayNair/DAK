import { Elsie_Swash_Caps } from 'next/font/google';

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Hero({ currentSlide, carouselItems }) {
  return (
    <div className="h-[35vh] mb-4 sm:mb-6 bg-[#B85C38] rounded-lg overflow-hidden relative">
      <img
        src={carouselItems[currentSlide].image}
        alt="Philately workshop"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className={`text-black text-4xl sm:text-6xl font-bold text-center px-4 py-2 rounded ${elsieSwashCaps.className}`}>
          {carouselItems[currentSlide].text}
        </h1>
      </div>
    </div>
  );
}
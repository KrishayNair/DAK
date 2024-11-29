import { Elsie_Swash_Caps } from 'next/font/google';

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
});

export function Header() {
  return (
    <>
      <h1 className={`text-6xl font-bold text-center mb-4 ${elsieSwashCaps.className}`}>
        Philately Deposit Account
      </h1>
      <p className="text-sm text-gray-600 mb-8 text-center">
        Fill this easy Form to activate your philately deposit account and receive your favorite material regularly
      </p>
    </>
  );
}
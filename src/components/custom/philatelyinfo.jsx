import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ocr from "../../../public/ocrimage.jpg";
import philately from "../../../public/philately.jpg";
import forum from "../../../public/forum.jpeg";
import calender from "../../../public/calender.jpeg";
import workshop from "../../../public/workshop.jpeg";
import blockchain from "../../../public/blockchain.png";
import { Elsie_Swash_Caps } from "next/font/google";

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
});

export default function PhilatelyIntro() {
  return (
    <div className="bg-[#E7D4B5] py-8 px-4 sm:px-6 rounded-none sm:rounded-[12rem] sm:rounded-b-none w-full ">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-5xl font-bold mt-10 mb-6 text-secondary ${elsieSwashCaps.className}`}
        >
          New to Philately?
        </h2>
        <p className="text-secondary text-xl mb-8 font-secondary">
          Start your journey with DAK
        </p>

        <div className="relative mb-8">
          <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-white m-4">
                <div className="relative w-full h-full min-h-[300px]">
                  <Image
                    src={philately}
                    alt="Philatelic world"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <CardContent className="md:w-3/5 p-8 flex flex-col justify-center">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-primary font-semibold">
                    Government-Authorized Philatelic Marketplace
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4">
                  StampXchange revolutionizes stamp trading through a secure,
                  official platform. This digital marketplace offers verified
                  listings and dynamic auctions, ensuring authenticity and fair
                  transactions for collectors worldwide. By bridging traditional
                  philately with modern e-commerce, it creates a trusted
                  environment for enthusiasts to expand their collections.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold self-start"
                >
                  See More &gt;
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>

        <div className="relative mb-8">
          {/* <Image
            src="/gradient2.svg"
            alt="Background gradient"
            fill
            className="object-cover -z-10 rotate-180"
          /> */}
          <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="md:w-2/5 bg-white  m-4">
                <div className="relative w-full h-full min-h-[300px]">
                  <Image
                    src={forum}
                    alt="StampConnect Community"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <CardContent className="md:w-3/5 p-8 flex flex-col justify-center">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-primary font-semibold">
                    Raise your doubts or opinions in StampConnect Community
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4">
                  HarmonyStamps leverages advanced hate speech recognition
                  technology to cultivate a respectful, diverse philatelic
                  community. This platform ensures discussions remain
                  constructive and inclusive, fostering a welcoming environment
                  for collectors of all backgrounds. By prioritizing positive
                  interactions, it enhances the overall experience of sharing
                  knowledge and passion for stamps.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold self-start"
                >
                  See More &gt;
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <div className="relative mb-8">
          {/* <Image
            src="/gradient2.svg"
            alt="Background gradient"
            fill
            className="object-cover -z-10"
          /> */}
          <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-white  m-4">
                <div className="relative w-full h-full min-h-[300px]">
                  <Image
                    src={calender}
                    alt="Philatelic world"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <CardContent className="md:w-3/5 p-8 flex flex-col justify-center">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-primary font-semibold">
                    Annual Postal Release Showcase
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4">
                  PostalVista offers a comprehensive, up-to-date catalog of
                  yearly philatelic releases. This dynamic platform provides
                  collectors with a curated preview of upcoming stamps,
                  first-day covers, and special editions. By centralizing
                  information on future releases, it enables enthusiasts to plan
                  their collections strategically and stay informed about
                  significant postal events.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold self-start"
                >
                  See More &gt;
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>

        <div className="relative mb-8">
          {/* <Image
            src="/gradient2.svg"
            alt="Background gradient"
            fill
            className="object-cover -z-10 rotate-180"
          /> */}
          <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="md:w-2/5 bg-white  m-4">
                <div className="relative w-full h-full min-h-[300px]">
                  <Image
                    src={ocr}
                    alt="StampConnect Community"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <CardContent className="md:w-3/5 p-8 flex flex-col justify-center">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-primary font-semibold">
                    Educate yourself with interesting facts about stamp in
                    StampConnect
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4">
                  StampSage transforms stamp education through cutting-edge OCR
                  technology. By simply uploading an image, students and
                  collectors gain instant access to rich historical, cultural,
                  and artistic information about stamps. This innovative tool
                  makes philatelic learning more interactive and accessible,
                  igniting curiosity and deepening appreciation for postal
                  artifacts.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold self-start"
                >
                  See More &gt;
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <div className="relative mb-8">
          {/* <Image
            src="/gradient2.svg"
            alt="Background gradient"
            fill
            className="object-cover -z-10"
          /> */}
          <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-white  m-4">
                <div className="relative w-full h-full min-h-[300px]">
                  <Image
                    src={workshop}
                    alt="Philatelic world"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <CardContent className="md:w-3/5 p-8 flex flex-col justify-center">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-primary font-semibold">
                    Collaborative Philately Education /Workshop Hub
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4">
                  PhilaTech Academy transforms stamp collecting education
                  through innovative workshops and meetups. This platform
                  facilitates seamless collaboration between government
                  agencies, schools, and student ambassadors, fostering a new
                  generation of philatelists. Interactive learning experiences
                  and mentorship programs cultivate deep appreciation for postal
                  history and cultural heritage.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold self-start"
                >
                  See More &gt;
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>

        <div className="relative mb-8">
          {/* <Image
            src="/gradient2.svg"
            alt="Background gradient"
            fill
            className="object-cover -z-10 rotate-180"
          /> */}
          <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="md:w-2/5 bg-white m-4">
                <div className="relative w-full h-full min-h-[300px]">
                  <Image
                    src={blockchain}
                    alt="StampConnect Community"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <CardContent className="md:w-3/5 p-8 flex flex-col justify-center">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-primary font-semibold">
                    Philately material certification and validation
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4">
                  CertifiStamp revolutionizes philatelic verification using
                  hyperledger private blockchain technology. This advanced
                  system provides tamper-proof certification for stamp
                  authenticity, ownership history, and provenance. By leveraging
                  blockchain&apos;s security and transparency, it instills
                  confidence in transactions and preserves the integrity of rare
                  and valuable philatelic materials for future generations.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold self-start"
                >
                  See More &gt;
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

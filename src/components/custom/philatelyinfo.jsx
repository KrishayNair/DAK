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
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
});

export default function PhilatelyIntro() {
  return (
    {
      /* <div className="relative mb-8">
          <Card className="overflow-hidden rounded-lg md:rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
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
              </div> */
    },
    {
      /* <CardContent className="md:w-3/5 p-8 flex flex-col justify-center">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl md:text-2xl font-primary font-semibold">
                    Government-Authorized Philatelic Marketplace
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4 text-base md:text-lg">
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
        </div> */
    },
    {
      /* <div className="relative mb-8">

          <Card className="overflow-hidden rounded-lg md:rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
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
                  <CardTitle className="text-xl md:text-2xl font-primary font-semibold">
                    Raise your doubts or opinions in StampConnect Community
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4 text-base md:text-lg">
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
      </div> */
    },
    {
      /* <div className="max-w-6xl mx-auto mt-10">
        <div className="relative mb-8">
          
          <Card className="overflow-hidden rounded-lg md:rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
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
                  <CardTitle className="text-xl md:text-2xl font-primary font-semibold">
                    Annual Postal Release Showcase
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4 text-base md:text-lg">
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
        </div> */
    },
    {
      /* <div className="relative mb-8">
          <Image
            src="/gradient2.svg"
            alt="Background gradient"
            fill
            className="object-cover -z-10 rotate-180"
          />
          <Card className="overflow-hidden rounded-lg md:rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
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
                  <CardTitle className="text-xl md:text-2xl font-primary font-semibold">
                    Educate yourself with interesting facts about stamp in
                    StampConnect
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4 text-base md:text-lg">
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
      </div> */
    },
    {
      /* <div className="max-w-6xl mx-auto mt-10">
        <div className="relative mb-8">
          <Image
            src="/gradient2.svg"
            alt="Background gradient"
            fill
            className="object-cover -z-10"
          />
          <Card className="overflow-hidden rounded-lg md:rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
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
                  <CardTitle className="text-xl md:text-2xl font-primary font-semibold">
                    Collaborative Philately Education /Workshop Hub
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 mb-4 text-base md:text-lg">
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
        </div> */
    },
    (
      <div className="bg-[#FFF8E8] py-8 px-4 sm:px-6 rounded-none lg:rounded-t-[8rem] xl:rounded-[12rem] sm:rounded-b-none w-full ">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl font-bold mt-10 mb-6 lg:ml-20 xl:ml-0 text-secondary ${elsieSwashCaps.className}`}
          >
            New to Philately?
          </h2>
          <p className="text-lg md:text-xl text-secondary mb-8 lg:ml-20 xl:ml-0 font-secondary z-100">
            Dak's got you covered with secure transactions, expert guidance, and
            a vibrant community to help <br /> you start your collection
            journey!
          </p>
        </div>

        <Image
          src="/gradient2.png"
          width={500}
          height={500}
          className="absolute top-12 hidden xl:block left-[-10px]"
        />
        <div className="flex flex-col xl:flex-row xl:m-20 space-x-0 xl:space-x-20">
          <div className="relative w-full xl:w-2/5 lg:min-h-[400px] min-h-[300px]">
            <Image
              src={philately}
              alt="Philatelic world"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center w-full xl:w-3/5">
            <h1 className="font-bold xl:text-2xl text-lg mt-5">
              Read the interesting backstory of a stamp, with a new story
              featured every day to keep your collection journey exciting and
              full of discoveries!
            </h1>
            <p className="font-medium md:text-base text-sm mt-5">
              <span className="font-semibold md:text-base text-sm opacity-90">
                Spotlight of the Day:
              </span>
              The Scinde Dawk: Issued in 1852.
            </p>
            <p className="font-thin md:text-base text-sm mt-2 opacity-90">
              The Scinde Dawk is considered India's first postage stamp. It was
              introduced by the British East India Company for use in the Sindh
              region, which was then part of British India. The stamp features
              the word 'Scinde' (the Persian name for .....
            </p>
            <Link href="/catalog" >
            <button className="flex md:mt-8 space-x-3 mt-5 font-medium text-gray-600">
              <p>See More</p>
              <ChevronRight className="md:w-6 md:h-6 w-5 h-5" />
            </button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/gradient2.png"
            width={500}
            height={500}
            className="absolute right-[-150px] hidden xl:block "
          />
          <div className="flex flex-col xl:flex-row xl:m-20 xl:mt-0 mt-8">
            <div className="block xl:hidden relative w-full xl:w-2/5 xl:min-h-[400px] min-h-[300px]">
              <Image
                src={workshop}
                alt="Philatelic world"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center w-full xl:w-3/5 mr-20">
              <h1 className="font-bold md:text-2xl text-lg mt-5 xl:mt-0">
                Find your way anywhere with ease!
              </h1>
              <p className="font-thin md:text-base text-sm mt-2 opacity-90">
                Our intelligent chatbot is designed to guide you effortlessly
                through any route. Whether it's navigating locations or
                answering queries, it ensures a smooth experience. With its
                intuitive capabilities, you can rely on it for seamless
                assistance every step of the way.
              </p>
              <Link href="/" > 
            <button className="flex md:mt-8 space-x-3 mt-5 font-medium text-gray-600">
              <p>See More</p>
              <ChevronRight className="md:w-6 md:h-6 w-5 h-5" />
            </button>
            </Link>
            </div>
            <div className="hidden xl:block relative w-full md:w-2/5 md:min-h-[400px] min-h-[300px]">
              <Image
                src={workshop}
                alt="Philatelic world"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/gradient2.png"
            width={500}
            height={500}
            className="absolute top-[-200px] left-[-100px] hidden xl:block "
          />
          <div className="flex flex-col xl:flex-row xl:m-20 space-x-0 xl:space-x-20">
            <div className="relative w-full xl:w-2/5 lg:min-h-[400px] min-h-[300px]">
              <Image
                src="/shophead.jpg"
                alt="Philatelic world"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center w-full xl:w-3/5">
              <h1 className="font-bold xl:text-2xl text-lg mt-5">
                Discover the latest stamps released by the government.
              </h1>
              <p className="font-thin md:text-base text-sm mt-2 opacity-90">
                Perfect additions to your collection, these new
                government-issued stamps offer a unique way to enhance your
                philatelic journey. Each one tells a story, waiting to be
                discovered. Don’t miss the opportunity to expand your collection
                with these rare finds!
              </p>
              <Link href="/shop" >
            <button className="flex md:mt-8 space-x-3 mt-5 font-medium text-gray-600">
              <p>See More</p>
              <ChevronRight className="md:w-6 md:h-6 w-5 h-5" />
            </button>
            </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/gradient2.png"
            width={500}
            height={500}
            className="absolute right-[-150px] hidden xl:block "
          />
          <div className="flex flex-col xl:flex-row xl:m-20 xl:mt-0 mt-8">
            <div className="block xl:hidden relative w-full xl:w-2/5 xl:min-h-[400px] min-h-[300px]">
              <Image
                src="/forum.jpeg"
                alt="Philatelic world"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center w-full xl:w-3/5 mr-20">
              <h1 className="font-bold md:text-2xl text-lg mt-5 xl:mt-0">
                Engage in India's biggest community!
              </h1>
              <p className="font-thin md:text-base text-sm mt-2 opacity-90">
                Step into a vibrant community buzzing with energy and
                creativity. Engage with like-minded individuals, exchange ideas,
                and ignite new possibilities. Every interaction becomes a chance
                to grow, inspire, and be inspired!
              </p>
              <Link href="/forum" >
            <button className="flex md:mt-8 space-x-3 mt-5 font-medium text-gray-600">
              <p>See More</p>
              <ChevronRight className="md:w-6 md:h-6 w-5 h-5" />
            </button>
            </Link>
            </div>
            <div className="hidden xl:block relative w-full md:w-2/5 md:min-h-[400px] min-h-[300px]">
              <Image
                src={workshop}
                alt="Philatelic world"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/gradient2.png"
            width={500}
            height={500}
            className="absolute top-[-200px] left-[-100px] hidden xl:block "
          />
          <div className="flex flex-col xl:flex-row xl:m-20 space-x-0 xl:space-x-20">
            <div className="relative w-full xl:w-2/5 lg:min-h-[400px] min-h-[300px]">
              <Image
                src="/Identifying_stamps.jpg"
                alt="Philatelic world"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center w-full xl:w-3/5">
              <h1 className="font-bold xl:text-2xl text-lg mt-5">
                Bid for a chance to own the rarest and most coveted stamps
              </h1>
              <p className="font-thin md:text-base text-sm mt-2 opacity-90">
                Participate in exclusive auctions to get your hands on the
                rarest and most coveted stamps. Bid for timeless treasures that
                embody history, culture, and artistry. Don’t miss your chance to
                elevate your collection with these extraordinary finds!
              </p>
              <Link href="/auction" >
            <button className="flex md:mt-8 space-x-3 mt-5 font-medium text-gray-600">
              <p>See More</p>
              <ChevronRight className="md:w-6 md:h-6 w-5 h-5" />
            </button>
            </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/gradient2.png"
            width={500}
            height={500}
            className="absolute right-[-150px] hidden xl:block "
          />
          <div className="flex flex-col xl:flex-row xl:m-20 xl:mt-0 mt-8">
            <div className="block xl:hidden relative w-full xl:w-2/5 xl:min-h-[400px] min-h-[300px]">
              <Image
                src={workshop}
                alt="Philatelic world"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center w-full xl:w-3/5 mr-20">
              <h1 className="font-bold md:text-2xl text-lg mt-5 xl:mt-0">
                Show off your precious stamp collection and its unique stories.
              </h1>
              <p className="font-thin md:text-base text-sm mt-2 opacity-90">
                Display your prized stamp collection and share its rich history
                with fellow enthusiasts. Let each piece showcase its unique
                story and heritage. Inspire admiration with the rarity and
                beauty of your collection!
              </p>
              <Link href="/profile" >
            <button className="flex md:mt-8 space-x-3 mt-5 font-medium text-gray-600">
              <p>See More</p>
              <ChevronRight className="md:w-6 md:h-6 w-5 h-5" />
            </button>
            </Link>
            </div>
            <div className="hidden xl:block relative w-full md:w-2/5 md:min-h-[400px] min-h-[300px]">
              <Image
                src="/collage.png"
                alt="Philatelic world"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

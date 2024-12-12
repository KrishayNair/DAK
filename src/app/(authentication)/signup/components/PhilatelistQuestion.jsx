import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PhilatelistQuestion({ handlePhilatelistResponse }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">One Last Question</h3>
      <p className="text-gray-600">Are you a philatelist?</p>

      <div className="space-y-4">
        <button
          onClick={() => {
            console.log("Selected: Yes");
            setSelectedOption('yes');
          }}
          className={`w-full p-8 rounded-3xl border transition-all hover:border-black focus:border-black ${
            selectedOption === 'yes' ? 'border-black' : ''
          }`}
        >
          <div className="text-left">
            <h4 className="text-xl font-semibold mb-2">Yes!! I am a philatelist</h4>
            <p className="text-gray-600">
              I'm well versed in philately 
            </p>
          </div>
        </button>

        <button
          onClick={() => {
            console.log("Selected: No");
            setSelectedOption('no');
          }}
          className={`w-full p-8 rounded-3xl border transition-all hover:border-black focus:border-black ${
            selectedOption === 'no' ? 'border-black' : ''
          }`}
        >
          <div className="text-left">
            <h4 className="text-xl font-semibold mb-2">No, I am not a philatelist</h4>
            <p className="text-gray-600">
              I'm new to philately and want to learn more about it
            </p>
          </div>
        </button>

        <Button
          onClick={() => {
            if (selectedOption) {
              handlePhilatelistResponse(selectedOption === 'yes');
            } else {
              alert("Please select an option");
            }
          }}
          className="w-full rounded-full py-5 text-base mt-6 bg-[#FFE5C2] hover:bg-[#FFE5C2/90]"
          disabled={!selectedOption}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

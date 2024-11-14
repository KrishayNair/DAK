import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Clock, Share2, MessageSquare } from 'lucide-react';

const Feature = ({ icon: Icon, title, description, color }) => (
  <Card className="w-full mb-4 shadow-sm">
    <CardContent className="flex items-start p-4">
      <div className={`p-2 rounded-lg ${color} mr-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const TopFeatures = () => {
  const features = [
    { icon: ClipboardList, title: 'feature1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy d cs eirmod dummy text here.', color: 'bg-red-500' },
    { icon: Clock, title: 'feature 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy d cs eirmod dummy text here.', color: 'bg-blue-500' },
    { icon: Share2, title: 'feature 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy d cs eirmod dummy text here.', color: 'bg-green-500' },
    { icon: MessageSquare, title: 'feature 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy d cs eirmod dummy text here.', color: 'bg-yellow-500' },
  ];

  return (
    <div className="p-40 bg-white flex flex-col justify-center items-center rounded-[6rem] rounded-b-none">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 pr-8 mb-8 md:mb-0">
          <p className="text-blue-500 mb-2 text-sm">Learn about Features</p>
          <h2 className="text-4xl font-bold mb-4">Our Top Features</h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Get Started</Button>
        </div>
        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopFeatures;
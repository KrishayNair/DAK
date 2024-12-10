"use client";

import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';

interface ProductTourProps {
  isOpen: boolean;
  onClose: () => void;
  steps: Array<{
    target: string;
    content: string;
    title: string;
    placement?: string;
  }>;
}

const ProductTour = ({ isOpen, onClose, steps }: ProductTourProps) => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM elements are ready
    const timer = setTimeout(() => {
      setRun(isOpen);
    }, 500);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      onClose();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      disableOverlayClose
      spotlightClicks
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#3B82F6',
          backgroundColor: '#ffffff',
          arrowColor: '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
        },
        tooltipContainer: {
          textAlign: 'left',
          maxWidth: '450px',
        },
        buttonNext: {
          backgroundColor: '#3B82F6',
          position: 'relative',
          zIndex: 10001,
        },
        buttonBack: {
          marginRight: 10,
          position: 'relative',
          zIndex: 10001,
        },
        spotlight: {
          backgroundColor: 'transparent',
        },
        tooltip: {
          position: 'relative',
          zIndex: 10001,
        },
      }}
      floaterProps={{
        disableAnimation: true,
        placement: 'auto',
      }}
      locale={{
        last: "Got it!",
        skip: "Skip tour",
        next: "Next",
        back: "Back",
      }}
    />
  );
};

export default ProductTour;

export function StepNavigation({ currentStep, stepsLength, onStepChange }) {
  return (
    <div className="flex justify-between items-center">
      {currentStep > 0 && (
        <button 
          className="px-4 py-2 sm:px-6 sm:py-3 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          onClick={() => onStepChange('prev')}
        >
          Previous
        </button>
      )}
      <button className="px-4 py-2 sm:px-6 sm:py-3 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors">
        Save
      </button>
      {currentStep < stepsLength - 1 && (
        <button 
          className="px-4 py-2 sm:px-6 sm:py-3 bg-secondary text-primary rounded hover:bg-secondary/90 transition-colors"
          onClick={() => onStepChange('next')}
        >
          Next
        </button>
      )}
    </div>
  );
}
import { CustomerType } from './CustomerType';
import { PersonalDetails } from './PersonalDetails';
import { OrderDetails } from './OrderDetails';
import { Review } from './Review';
import { PaymentGateway } from './PaymentGateway';

export function StepContent({ currentStep, formData, updateFormData }) {
  const stepComponents = {
    0: <CustomerType 
         value={formData.customerType} 
         onChange={(type) => updateFormData('customerType', type)} 
       />,
    1: <PersonalDetails 
         details={formData.personalDetails} 
         onChange={(details) => updateFormData('personalDetails', details)} 
       />,
    2: <OrderDetails 
         details={formData.orderDetails} 
         onChange={(details) => updateFormData('orderDetails', details)} 
       />,
    3: <Review 
         formData={formData} 
         onDepositChange={(amount) => updateFormData('depositAmount', amount)} 
       />,
    4: <PaymentGateway amount={formData.depositAmount} />
  };

  return stepComponents[currentStep] || null;
}
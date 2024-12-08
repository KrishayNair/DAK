export function PaymentGateway({ amount }) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Payment Gateway</h2>
        <div className="bg-white p-6 rounded-lg border">
          <p className="md:text-xl text-lg mb-4">Amount to Pay: ₹{amount}</p>
          <div className="space-y-4">
            <button className="w-full p-4 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-colors">
              Pay with UPI
            </button>
            <button className="w-full p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Pay with Card
            </button>
            <button className="w-full p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Net Banking
            </button>
          </div>
        </div>
      </div>
    );
  }
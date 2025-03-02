import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, ArrowRight, Download, Lock } from 'lucide-react';

export default function PinToSuccessForm() {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef([]);
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  const handleChange = (index, value) => {
    // Only accept numeric values
    if (isNaN(value)) return;
    
    // Update the pin state
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    
    // Move to next input if current field is filled
    if (value !== '' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyPin = () => {
    // Check if all PIN digits are filled
    if (pin.every(digit => digit !== '')) {
      setIsVerifying(true);
      
      // Simulate verification process
      setTimeout(() => {
        setIsVerifying(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center mt-35">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500">
        {/* Dynamic Header Banner */}
        <div 
          className={`${
            isSuccess ? 'bg-green-600' : 'bg-black'
          } text-white p-6 transition-colors duration-500`}
        >
          {isSuccess ? (
            <>
              <div className="flex justify-center mb-2">
                <CheckCircle size={48} />
              </div>
              <h1 className="text-2xl text-center font-semibold">
                Payment Successful
              </h1>
              <p className="mt-1 text-sm text-center">Transaction completed securely</p>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-2">
                <Lock size={24} />
              </div>
              <h1 className="text-2xl text-center">
                Secure Verification
              </h1>
              <p className="mt-1 text-sm text-center">Please enter your 4-digit PIN</p>
            </>
          )}
        </div>

        <div className="p-8 min-h-64">
          {isSuccess ? (
            <>
              {/* Payment Success Content */}
              <div className="animate-fadeIn">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500">Amount Paid</span>
                    <span className="text-2xl font-bold">$149.99</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500">Date</span>
                    <span className="text-gray-800">{currentDate}</span>
                  </div>
                  
                  <div className="h-px bg-gray-200 my-4"></div>
                  
                  <div className="bg-green-50 p-4 rounded-lg flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={20} />
                    <p className="text-green-700 text-sm">Your payment has been processed successfully</p>
                  </div>
                </div>

               
              </div>
            </>
          ) : (
            <>
              {/* PIN Form Content */}
              <div className="flex justify-center mb-6 gap-3">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="password"
                    className="w-14 h-16 text-center text-2xl border-2 rounded-lg 
                              bg-gray-50 focus:ring-2 
                              focus:border-black outline-none"
                    maxLength={1}
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={isVerifying}
                  />
                ))}
              </div>

              <button
                onClick={verifyPin}
                disabled={!pin.every(digit => digit !== '') || isVerifying}
                className={`w-full px-4 py-3 text-white font-medium 
                rounded-lg transition shadow-md flex items-center justify-center
                ${
                  !pin.every(digit => digit !== '') || isVerifying 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-black hover:bg-gray-800'
                }`}
              >
                {isVerifying ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⟳</span>
                    Verifying...
                  </>
                ) : (
                  'Verify PIN'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
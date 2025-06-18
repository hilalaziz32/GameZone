'use client';

import { useState, useEffect } from 'react';
import { Mail, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

export default function CheckEmailPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [resendClicked, setResendClicked] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = () => {
    setResendClicked(true);
    setCountdown(60);
    setTimeout(() => setResendClicked(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className={`max-w-md w-full transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10">
            {/* Icon with Animation */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Check your email
            </h1>
            
            {/* Subheading */}
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              We&apos;ve sent a confirmation link to your email.
              <br />
              <span className="text-indigo-600 font-medium">Click the link to confirm your account</span>, then sign in.
            </p>

            {/* Status Steps */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 text-sm font-medium">Email sent successfully</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <span className="text-gray-600 text-sm">Waiting for confirmation...</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={handleResend}
                disabled={countdown > 0}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  countdown > 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {resendClicked ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Email Sent!</span>
                    </>
                  ) : countdown > 0 ? (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      <span>Resend in {countdown}s</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      <span>Resend Email</span>
                    </>
                  )}
                </div>
              </button>
              
              <button className="w-full py-3 px-6 rounded-xl font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 hover:shadow-md">
                Back to Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-700 text-sm font-medium mb-1">Didn&apos;t receive the email?</p>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Check your spam or junk folder</li>
                <li>• Make sure you entered the correct email</li>
                <li>• Try signing up again if needed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Need help? <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
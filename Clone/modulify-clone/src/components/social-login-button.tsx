'use client';

import { FaGoogle, FaFacebook, FaApple, FaMicrosoft } from 'react-icons/fa';
import Image from 'next/image';

interface SocialLoginButtonProps {
  provider: 'google' | 'apple' | 'facebook' | 'microsoft';
  onClick?: () => void;
  disabled?: boolean;
}

export function SocialLoginButton({ provider, onClick, disabled = false }: SocialLoginButtonProps) {
  const getIcon = () => {
    switch (provider) {
      case 'google':
        return <FaGoogle className="h-5 w-5" />;
      case 'apple':
        return <FaApple className="h-5 w-5" />;
      case 'facebook':
        return <FaFacebook className="h-5 w-5" />;
      case 'microsoft':
        return <FaMicrosoft className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getProviderColor = () => {
    switch (provider) {
      case 'google':
        return 'bg-white hover:bg-gray-100 text-gray-800 border-gray-300';
      case 'apple':
        return 'bg-black hover:bg-gray-900 text-white';
      case 'facebook':
        return 'bg-[#1877F2] hover:bg-[#0e6ae4] text-white';
      case 'microsoft':
        return 'bg-[#00a4ef] hover:bg-[#0095d9] text-white';
      default:
        return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
    }
  };

  return (
    <button
      type="button"
      className={`flex justify-center items-center w-full py-2.5 border rounded-md shadow-sm ${getProviderColor()} transition-colors duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="sr-only">Sign in with {provider}</span>
      {getIcon()}
    </button>
  );
}

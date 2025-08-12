'use client';

import { CloseButtonProps, ToastContainer } from 'react-toastify';
import CloseIcon from '@/images/icon/close/icon_close_dynamic.svg';
import { cn } from '@/lib/utils';
import 'react-toastify/dist/ReactToastify.css';

function CloseButton({ closeToast }: CloseButtonProps) {
  return (
    <button
      type="button"
      className="self-start ml-1.25"
      onClick={closeToast}
      aria-label="Close"
    >
      <CloseIcon className="w-3 h-3" />
    </button>
  );
}

export default function ToastProvider() {
  const contextClass = {
    success: 'bg-blue-600',
    error: 'bg-red-600',
    info: 'bg-gray-600',
    warning: 'bg-orange-400',
    default: 'bg-indigo-600',
    dark: 'bg-white-600 font-gray-300',
  };

  return (
    <ToastContainer
      className="text-sm font-white font-med block p-3"
      toastClassName={(context) =>
        cn(
          contextClass[context?.type || 'default'],
          'relative flex p-2 my-1 min-h-4 rounded-md items-center overflow-hidden cursor-pointer'
        )
      }
      closeButton={CloseButton}
    />
  );
}

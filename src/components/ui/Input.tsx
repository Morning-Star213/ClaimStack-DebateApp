import React from 'react'
import { cn } from '@/lib/utils/cn'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, placeholder, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="w-full flex flex-col">
        {label && (
          <label htmlFor={inputId} className="block text-xs sm:text-sm items-start font-medium text-[#666666] mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          placeholder={placeholder}
          className={cn(
            'w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300',
            className
          )}
          {...props}
        />
        {error && (
          <div className="w-full mt-1 flex items-center gap-1">
            <HiOutlineExclamationCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-red-600">{error}</p>
          </div>
        )}
        {helperText && !error && (
          <p className="w-full mt-1 text-xs sm:text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'


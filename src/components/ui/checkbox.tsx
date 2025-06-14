// src/components/ui/checkbox.tsx
'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
  checked = false,
  onCheckedChange,
  className,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(checked);

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  return (
    <div className="flex items-center">
      <button
        type="button" // Explicitly set to "button"
        role="checkbox"
        aria-checked={isChecked}
        onClick={handleChange}
        className={`h-4 w-4 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center transition-colors ${
          isChecked 
            ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-600 dark:border-indigo-600' 
            : 'bg-white dark:bg-gray-700 hover:border-indigo-500'
        } ${className}`}
        {...props}
      >
        {isChecked && (
          <Check className="h-3 w-3 text-white" />
        )}
      </button>
    </div>
  );
}
import { ReactNode } from 'react';

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <div className="animate-in fade-in duration-300">
      {children}
    </div>
  );
}
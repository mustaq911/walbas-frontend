// src/components/ui/SafeImage.tsx
"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function SafeImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      onError={() => setImgSrc('/placeholder.jpg')}
      unoptimized={imgSrc.startsWith('http:')} // Disable optimization for HTTP
    />
  );
}
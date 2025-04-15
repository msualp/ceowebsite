'use client';

import Image from 'next/image';

interface HoverRevealImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  captionTitle: string;
  captionText: string;
  aspectRatio?: string;
}

export default function HoverRevealImage({
  src,
  alt,
  width,
  height,
  captionTitle,
  captionText,
  aspectRatio = 'aspect-video',
}: HoverRevealImageProps) {
  return (
    <div className={`img-with-caption relative group ${aspectRatio} rounded-xl overflow-hidden shadow-2xl`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={!width || !height}
        className="object-cover grayscale group-hover:grayscale-0 transition duration-500"
        sizes="100vw"
      />
      <div className="caption-reveal absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="font-medium mb-1">{captionTitle}</p>
        <p className="text-sm text-gray-300">{captionText}</p>
      </div>
    </div>
  );
}
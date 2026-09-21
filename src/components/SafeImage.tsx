import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  driveThumbnailSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc,
  driveThumbnailSrc,
  alt,
  className,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasTriedThumbnail, setHasTriedThumbnail] = useState(false);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  const handleError = () => {
    if (!hasTriedThumbnail && driveThumbnailSrc) {
      setHasTriedThumbnail(true);
      setCurrentSrc(driveThumbnailSrc);
    } else if (!hasTriedFallback && fallbackSrc) {
      setHasTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt || '11:11 Cafe Reference'}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className}
      {...props}
    />
  );
};

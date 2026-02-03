import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
}

/**
 * OptimizedImage Component
 * 
 * A reusable image component leveraging Next.js Image for:
 * - Automatic WebP conversion
 * - Size optimization
 * - Lazy loading (default)
 * - Layout shift prevention
 */
export const OptimizedImage = ({
    src,
    alt,
    width,
    height,
    priority = false,
    className = '',
    style,
    ...props
}: OptimizedImageProps) => {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const handleError = () => {
        setError(true);
        console.warn(`Failed to load image: ${src}`);
    };

    const handleLoad = () => {
        setLoaded(true);
    };

    // Fallback if image fails or path is empty
    if (error || !src) {
        return (
            <div
                className={`bg-gray-800 flex items-center justify-center ${className}`}
                style={{ width, height, ...style }}
            >
                <span className="text-gray-500 text-sm">Image non disponible</span>
            </div>
        );
    }

    // Determine if we should use fill layout
    const isFill = !width && !height;

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            fill={isFill}
            priority={priority}
            onError={handleError}
            onLoad={handleLoad}
            className={`${className} ${!loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            style={style}
            {...props}
        />
    );
};

export default OptimizedImage;

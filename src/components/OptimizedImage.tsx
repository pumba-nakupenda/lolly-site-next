import { useState, ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean; // For above-the-fold images (no lazy loading)
    className?: string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * OptimizedImage Component
 * 
 * A reusable image component with built-in optimizations:
 * - Lazy loading by default (unless priority=true)
 * - Async decoding for better performance
 * - Error handling with fallback
 * - Proper width/height to prevent layout shift
 * 
 * @example
 * <OptimizedImage 
 *   src="/assets/image.jpg" 
 *   alt="Description"
 *   width={800}
 *   height={600}
 * />
 * 
 * @example Hero image (no lazy loading)
 * <OptimizedImage 
 *   src="/assets/hero.jpg" 
 *   alt="Hero"
 *   priority={true}
 * />
 */
export const OptimizedImage = ({
    src,
    alt,
    width,
    height,
    priority = false,
    className = '',
    objectFit = 'cover',
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

    // Fallback image if loading fails
    if (error) {
        return (
            <div
                className={`bg-gray-800 flex items-center justify-center ${className}`}
                style={{ width, height }}
            >
                <span className="text-gray-500 text-sm">Image non disponible</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={handleError}
            onLoad={handleLoad}
            className={`${className} ${!loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            style={{ objectFit }}
            {...props}
        />
    );
};

export default OptimizedImage;

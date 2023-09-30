import { Link } from 'react-router-dom';
import { useRef } from 'react';

export function Logo() {
    const dotRef = useRef<SVGSVGElement>(null);

    function toggleAnimateDot(): void {
        if (dotRef.current) dotRef.current.classList.toggle('motion-safe:animate-bounce');
    }

    return (
        <div className="flex items-center gap-2">
            <Link
                to="/"
                className="relative text-3xl font-bold select-none sm:text-4xl"
                onPointerEnter={toggleAnimateDot}
                onPointerLeave={toggleAnimateDot}
            >
                {window.location.pathname !== '/error' && (
                    <svg
                        ref={dotRef}
                        className="absolute transition bottom-[7px] -left-3"
                        width="0.6rem"
                        height="0.6rem"
                        fill="#27272a"
                        viewBox="0 0 15 15"
                    >
                        <path d="M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z" />
                    </svg>
                )}
                BLOG
            </Link>
            <a href="https://github.com/MaoShizhong/dotBLOG" target="_blank" rel="noreferrer">
                <img
                    src="/github-light.png"
                    alt="github link"
                    className="w-8 transition sm:w-12 hover:scale-125"
                />
            </a>
        </div>
    );
}

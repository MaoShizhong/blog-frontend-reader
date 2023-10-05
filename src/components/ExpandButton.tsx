import { Dispatch, SetStateAction } from 'react';

type ExpandButtonProps = {
    isExpanded: boolean;
    setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

export function ExpandButton({ isExpanded, setIsExpanded }: ExpandButtonProps) {
    return (
        <button
            onClick={(): void => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'collapse' : 'expand'}
        >
            <svg
                viewBox="3 3 18 18"
                focusable="false"
                className={isExpanded ? 'h-5 -scale-100' : 'h-5'}
            >
                <path d="M7 10l5 5 5-5z"></path>
            </svg>
        </button>
    );
}

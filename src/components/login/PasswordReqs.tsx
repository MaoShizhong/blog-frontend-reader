import { useState } from 'react';
import { ExpandButton } from '../ExpandButton';

const requirements = [
    'Password must contain at least 8 characters',
    'Password must contain at least 1 uppercase',
    'Password must contain at least 1 lowercase',
    'Password must contain at least 1 number',
] as const;

export function PasswordReqs() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <ul className="flex flex-col items-center w-10/12 gap-1 text-sm text-center">
            <div className="flex items-center gap-2 font-bold">
                <p>Password requirements:</p>
                <ExpandButton isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            </div>
            {isExpanded &&
                requirements.map(
                    (requirement: string, i: number): JSX.Element => <li key={i}>{requirement}</li>
                )}
        </ul>
    );
}

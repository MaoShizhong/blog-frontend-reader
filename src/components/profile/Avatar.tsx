import { Dispatch, SetStateAction } from 'react';

export type FontColour = '#FAFAFA' | '#2A2A27';

type AvatarProps = {
    username: string;
    avatarColor: string;
    fontColour: FontColour;
    isProfile: boolean;
    colourPickerOpen?: boolean;
    setColourPickerOpen?: Dispatch<SetStateAction<boolean>>;
};

export function Avatar({
    username,
    avatarColor,
    fontColour,
    isProfile,
    colourPickerOpen,
    setColourPickerOpen,
}: AvatarProps) {
    const hover = isProfile ? 'hover:scale-90 hover:drop-shadow-lg' : '';

    function toggleColourPicker() {
        if (!isProfile || !setColourPickerOpen) return;
        else setColourPickerOpen(!colourPickerOpen);
    }

    return (
        <div
            className={`relative grid transition rounded-md select-none place-items-center aspect-square ${hover}`}
            style={{
                backgroundColor: avatarColor,
                color: fontColour,
                height: isProfile ? '3rem' : '1.5rem',
                fontSize: isProfile ? '2.3rem' : '1.05rem',
                cursor: isProfile ? 'pointer' : 'default',
            }}
            onClick={toggleColourPicker}
        >
            {username[0].toUpperCase()}

            {isProfile && (
                <button className="absolute grid h-5 border rounded-lg shadow-md aspect-square place-content-center border-zinc-500 -bottom-2 -left-2 bg-zinc-50">
                    <svg fill="#27272a" width="0.rem" height="0.9rem" viewBox="0 0 256 256">
                        <path d="M32 160L166.394 26.643a4.001 4.001 0 0 1 5.654.026l57.837 58.237a4.034 4.034 0 0 1-.007 5.676L97.348 223.59 32 224v-64zm16.797 5.594V208h40.488l121.92-121.396L180.57 56.56 64.656 175.772a3.937 3.937 0 0 1-5.624.037l-10.235-10.215z" />
                    </svg>
                </button>
            )}
        </div>
    );
}

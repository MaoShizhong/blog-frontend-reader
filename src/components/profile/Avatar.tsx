import { Dispatch, SetStateAction } from 'react';

type AvatarProps = {
    username: string;
    avatarColor: string;
    isProfile: boolean;
    colourPickerOpen?: boolean;
    setColourPickerOpen?: Dispatch<SetStateAction<boolean>>;
};

export function Avatar({
    username,
    avatarColor,
    isProfile,
    colourPickerOpen,
    setColourPickerOpen,
}: AvatarProps) {
    const hover = isProfile ? 'hover:scale-90 hover:drop-shadow-lg' : '';

    return (
        <div
            className={`grid transition rounded-md select-none place-items-center text-zinc-50 aspect-square ${hover}`}
            style={{
                backgroundColor: avatarColor,
                height: isProfile ? '3rem' : '1.5rem',
                fontSize: isProfile ? '2.3rem' : '1.05rem',
                cursor: isProfile ? 'pointer' : 'default',
            }}
            onClick={(): void => {
                if (!isProfile || !setColourPickerOpen) return;
                else setColourPickerOpen(!colourPickerOpen);
            }}
        >
            {username[0].toUpperCase()}
        </div>
    );
}

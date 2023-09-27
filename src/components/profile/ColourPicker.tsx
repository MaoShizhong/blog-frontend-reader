import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { fetchData } from '../../helpers/fetch_options';
import { UserContext } from '../../App';
import { Errors } from '../../pages/AccountHandler';
import { ErrorList } from '../ErrorList';

const colours = [
    '#696869',
    '#0C374D',
    '#196A69',
    '#5C8F4C',
    '#277932',
    '#BD722E',
    '#D4B527',
    '#A83C2E',
    '#9C4E9A',
    '#693E9B',
] as const;

export type AvatarColour = (typeof colours)[number];

type ColourPickerProps = {
    userID: string;
    currentColour: AvatarColour;
    setColourPickerOpen: Dispatch<SetStateAction<boolean>>;
};

export function ColourPicker({
    userID,
    currentColour,
    setColourPickerOpen,
}: ColourPickerProps): JSX.Element {
    const { setUser } = useContext(UserContext);

    const [errors, setErrors] = useState<Errors>(null);

    async function changeAvatarColour(colour: AvatarColour): Promise<void> {
        const res = await fetchData(
            `/users/${userID}?avatar=${colour.slice(1).toUpperCase()}`,
            'PUT'
        );

        if (res instanceof Error) {
            console.error(res);
        } else if (res.ok) {
            setUser(await res.json());
            setColourPickerOpen(false);
        } else {
            setErrors(await res.json());
        }
    }

    return (
        <div className="my-4">
            <h2 className="my-2 text-center select-none">Select a new avatar colour</h2>

            {errors && <ErrorList errors={errors} />}

            <div className="flex gap-3">
                {colours.map(
                    (colour, i): JSX.Element => (
                        <button
                            key={i}
                            className="w-6 h-6 transition rounded-md hover:scale-125"
                            style={{
                                backgroundColor: colour,
                                transform: colour === currentColour ? 'scale(1.4)' : undefined,
                            }}
                            onClick={(): Promise<void> => changeAvatarColour(colour)}
                        />
                    )
                )}
            </div>
        </div>
    );
}

import { Dispatch, SetStateAction, useContext, useState, useRef } from 'react';
import { fetchData } from '../../helpers/fetch_options';
import { UserContext } from '../../App';
import { Errors } from '../../pages/AccountHandler';
import { ErrorList } from '../ErrorList';

type ColourPickerProps = {
    userID: string;
    currentColour: string;
    setColourPickerOpen: Dispatch<SetStateAction<boolean>>;
};

export function ColourPicker({
    userID,
    currentColour,
    setColourPickerOpen,
}: ColourPickerProps): JSX.Element {
    const { setUser } = useContext(UserContext);

    const [errors, setErrors] = useState<Errors>(null);

    const colorRef = useRef<HTMLInputElement>(null);

    async function changeAvatarColour(): Promise<void> {
        const res = await fetchData(
            `/users/${userID}?avatar=${colorRef.current?.value.slice(1).toUpperCase()}`,
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
        <dialog open className="relative my-4 bg-transparent">
            {errors && <ErrorList errors={errors} />}

            <div className="flex items-center gap-6">
                <button onClick={(): void => setColourPickerOpen(false)}>Cancel</button>
                <input ref={colorRef} type="color" defaultValue={currentColour} />
                <button onClick={changeAvatarColour}>Set new colour</button>
            </div>
        </dialog>
    );
}

import { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../App';
import { Avatar } from '../components/profile/Avatar';
import { fetchData } from '../helpers/fetch_options';
import { Errors } from './AccountHandler';
import { ErrorList } from '../components/ErrorList';
import { BookmarkedPosts } from '../components/profile/BookmarkedPosts';
import { ColourPicker } from '../components/profile/ColourPicker';
import { Link, Navigate, useParams } from 'react-router-dom';

export function Profile() {
    const { user, setUser } = useContext(UserContext);

    const [colourPickerOpen, setColourPickerOpen] = useState(false);
    const [enableEditUsername, setEnableEditUsername] = useState(false);
    const [usernameError, setUsernameError] = useState<Errors>(null);

    const { userID } = useParams();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect((): void => {
        if (enableEditUsername) inputRef.current?.focus();
    }, [enableEditUsername]);

    async function changeUsername(): Promise<void> {
        const res = await fetchData(
            `/users/${user?.id}?username=${inputRef.current?.value}`,
            'PUT'
        );

        if (res instanceof Error) {
            console.error(res);
        } else if (res.ok) {
            setUser(await res.json());
            setUsernameError(null);
        } else {
            setUsernameError(await res.json());
        }

        setEnableEditUsername(false);
    }

    return (
        <>
            {!user || user.id !== userID ? (
                <Navigate to="/" />
            ) : (
                <main className="flex flex-col items-center py-10 w-main">
                    {usernameError && <ErrorList errors={usernameError} />}
                    <section className="flex items-center justify-between gap-4">
                        <Avatar
                            username={user.username}
                            avatarColor={user.avatar}
                            fontColour={user.fontColour}
                            isProfile={true}
                            colourPickerOpen={colourPickerOpen}
                            setColourPickerOpen={setColourPickerOpen}
                        />
                        <div className="flex flex-col">
                            <input
                                name="username"
                                ref={inputRef}
                                type="text"
                                className="px-1 -ml-1 text-2xl font-bold rounded-md outline outline-1 outline-zinc-400 disabled:outline-none"
                                defaultValue={user.username}
                                autoComplete="false"
                                autoFocus={!enableEditUsername}
                                disabled={!enableEditUsername}
                            />
                            <div className="flex gap-8">
                                {enableEditUsername ? (
                                    <button
                                        className="transition hover:text-zinc-500"
                                        onClick={changeUsername}
                                    >
                                        Set username
                                    </button>
                                ) : (
                                    <button
                                        className="transition hover:text-zinc-500"
                                        onClick={(): void => setEnableEditUsername(true)}
                                    >
                                        Edit username
                                    </button>
                                )}
                                <Link
                                    to={`/users/${user.id}/delete`}
                                    className="transition hover:text-zinc-500"
                                >
                                    Delete account
                                </Link>
                            </div>
                        </div>
                    </section>

                    {colourPickerOpen && (
                        <ColourPicker
                            userID={user.id}
                            currentColour={user.avatar}
                            setColourPickerOpen={setColourPickerOpen}
                        />
                    )}

                    <BookmarkedPosts user={user} />
                </main>
            )}
        </>
    );
}

import { UserContext } from '../../App';
import { useContext } from 'react';
import { Navbar } from './Navbar';
import { Logo } from './Logo';

export function Header() {
    const { user } = useContext(UserContext);

    return (
        <header className="sticky top-0 z-10 flex items-center justify-center w-full gap-8 px-3 py-2 border-b shadow-md bg-zinc-50 sm:pl-scroll">
            <div className="flex items-center justify-between w-form">
                <Logo />

                {user && (
                    <h2 className="hidden text-lg select-none sm:block">Hello, {user.username}!</h2>
                )}

                <Navbar />
            </div>
        </header>
    );
}

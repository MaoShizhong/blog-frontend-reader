import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext } from 'react';
import { fetchData } from '../helpers/fetch_options';

export function Header() {
    const { user, redirectToHome } = useContext(UserContext);

    async function logout(): Promise<void> {
        await fetchData('/auth/logout', 'GET');
        redirectToHome();
    }

    return (
        <header className="sticky top-0 z-10 flex items-center justify-center w-full gap-8 px-3 py-2 border-b shadow-md bg-zinc-50">
            <div className="flex items-center justify-between w-form">
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-3xl font-bold select-none sm:text-4xl">
                        .BLOG
                    </Link>
                    <a
                        href="https://github.com/MaoShizhong/blog-frontend-author"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="/github-light.png"
                            alt="github link"
                            className="w-8 transition sm:w-12 hover:scale-125"
                        />
                    </a>
                </div>

                {user && (
                    <h2 className="hidden text-lg select-none sm:block">Hello, {user.username}!</h2>
                )}

                <nav className="flex gap-4">
                    {user ? (
                        <>
                            <NavLink
                                to={`/users/${user.username}`}
                                className="transition hover:text-slate-500"
                            >
                                Account
                            </NavLink>

                            <button className="transition hover:text-slate-500" onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="transition hover:text-slate-500">
                                Login
                            </NavLink>

                            <NavLink to="/signup" className="transition hover:text-slate-500">
                                Sign up
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

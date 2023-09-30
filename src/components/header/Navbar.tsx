import { useContext } from 'react';
import { UserContext } from '../../App';
import { NavLink } from 'react-router-dom';
import { fetchData } from '../../helpers/fetch_options';

export function Navbar() {
    const { user, setUser } = useContext(UserContext);

    async function logout(): Promise<void> {
        await fetchData('/auth/tokens', 'DELETE');
        setUser(undefined);
    }

    return (
        <nav className="flex gap-4">
            {user ? (
                <>
                    <NavLink to={`/users/${user.id}`} className="transition hover:text-slate-500">
                        Account
                    </NavLink>

                    <button className="transition hover:text-slate-500" onClick={logout}>
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <NavLink
                        to="/login"
                        className="transition hover:text-slate-500"
                        state={{ previousPage: window.location.pathname }}
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/signup"
                        className="transition hover:text-slate-500"
                        state={{ previousPage: window.location.pathname }}
                    >
                        Sign up
                    </NavLink>
                </>
            )}
        </nav>
    );
}

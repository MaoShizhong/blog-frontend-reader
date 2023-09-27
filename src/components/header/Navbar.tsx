import { useContext } from 'react';
import { UserContext } from '../../App';
import { NavLink } from 'react-router-dom';
import { fetchData } from '../../helpers/fetch_options';

export function Navbar() {
    const { user, redirectToHome } = useContext(UserContext);

    async function logout(): Promise<void> {
        await fetchData('/auth/logout', 'GET');
        redirectToHome();
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
                    <NavLink to="/login" className="transition hover:text-slate-500">
                        Login
                    </NavLink>

                    <NavLink to="/signup" className="transition hover:text-slate-500">
                        Sign up
                    </NavLink>
                </>
            )}
        </nav>
    );
}

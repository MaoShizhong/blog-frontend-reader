import { Header } from './components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import { getFetchOptions } from './helpers/form_options';
import { API_DOMAIN } from './helpers/domain';

type User = string | undefined;

type AuthRouteFunctions = {
    redirectToHome: (user?: string) => void;
    refreshAccessToken: () => Promise<void>;
};

export const UserContext = createContext<{ username: User } & AuthRouteFunctions>({
    username: undefined,
    redirectToHome: (): void => {},
    refreshAccessToken: async (): Promise<void> => {},
});

export function App() {
    const [user, setUser] = useState<User>(undefined);

    const navigateTo = useNavigate();

    // needed to maintain login on refresh (cannot directly access httpOnly cookies)
    useEffect((): void => {
        refreshAccessToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function redirectToHome(currentUser?: string): void {
        setUser(currentUser);
        navigateTo('/');
    }

    async function refreshAccessToken(): Promise<void> {
        const res = await fetch(`${API_DOMAIN}/auth/refresh`, getFetchOptions('GET'));

        if (res.ok) {
            // Triggers only if status 200-299 i.e. valid refresh token found
            const { username } = await res.json();
            redirectToHome(username);
        } else {
            // Force log out if no valid refresh token
            await fetch(`${API_DOMAIN}/auth/logout`);
            redirectToHome();
        }
    }

    return (
        <UserContext.Provider
            value={{
                username: user,
                redirectToHome,
                refreshAccessToken,
            }}
        >
            <Header />
            <Outlet />
        </UserContext.Provider>
    );
}

import { Header } from './components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState, createContext, Dispatch, SetStateAction } from 'react';
import { fetchData } from './helpers/fetch_options';

type User =
    | {
          id: string;
          username: string;
          bookmarkedPosts: string[];
      }
    | undefined;

type UserState = {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
};

type AuthRouteFunctions = {
    redirectToHome: (user?: User) => void;
    refreshAccessToken: () => Promise<void>;
};

export const UserContext = createContext<UserState & AuthRouteFunctions>({
    user: undefined,
    setUser: (): void => {},
    redirectToHome: (): void => {},
    refreshAccessToken: async (): Promise<void> => {},
});

export function App() {
    const [currentUser, setCurrentUser] = useState<User>(undefined);

    console.log(currentUser);

    const navigateTo = useNavigate();

    // needed to maintain login on refresh (cannot directly access httpOnly cookies)
    useEffect((): void => {
        refreshAccessToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function redirectToHome(user?: User): void {
        setCurrentUser(user);
        navigateTo('/');
    }

    async function refreshAccessToken(): Promise<void> {
        const res = await fetchData('/auth/refresh', 'GET');

        if (res instanceof Error) {
            console.error(res);
        } else if (res.ok) {
            const user = await res.json();

            setCurrentUser(user);
        } else {
            // Force log out if no valid refresh token
            await fetchData('/auth/logout', 'GET');
            redirectToHome();
        }
    }

    return (
        <UserContext.Provider
            value={{
                user: currentUser,
                setUser: setCurrentUser,
                redirectToHome,
                refreshAccessToken,
            }}
        >
            <Header />
            <Outlet />
        </UserContext.Provider>
    );
}

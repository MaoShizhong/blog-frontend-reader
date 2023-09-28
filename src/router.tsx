import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AccountHandler } from './pages/AccountHandler';
import { IndividualPost } from './pages/IndividualPost';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { DeleteProfile } from './pages/DeleteProfile';
import { ErrorPage } from './pages/ErrorPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/error', element: <ErrorPage /> },
            { path: '/login', element: <AccountHandler loginType="login" /> },
            { path: '/signup', element: <AccountHandler loginType="signup" /> },
            { path: '/:category/:title', element: <IndividualPost /> },
            { path: '/users/:userID', element: <Profile /> },
            { path: '/users/:userID/delete', element: <DeleteProfile /> },
        ],
        errorElement: <ErrorPage />,
    },
]);

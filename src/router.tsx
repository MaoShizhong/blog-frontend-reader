import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AccountHandler } from './pages/AccountHandler';
import { IndividualPost } from './pages/IndividualPost';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <AccountHandler loginType="login" /> },
            { path: '/signup', element: <AccountHandler loginType="signup" /> },
            { path: '/:category/:title', element: <IndividualPost /> },
            { path: '/users/:username', element: <Profile /> },
        ],
    },
]);

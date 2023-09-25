import { useContext } from 'react';
import { UserContext } from '../App';

export function Profile() {
    const { user } = useContext(UserContext);

    return <main className="flex justify-center py-10 w-main">Hello, {user?.username}</main>;
}

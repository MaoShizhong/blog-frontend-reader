import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import { ErrorPage } from './ErrorPage';
// import { fetchData } from '../helpers/fetch_options';
// import { ErrorList } from '../components/ErrorList';
// import { Errors } from './AccountHandler';

export function DeleteProfile() {
    const { user } = useContext(UserContext);
    const { userID } = useParams();

    // const [errors, setErrors] = useState<Errors>(null);

    const navigateTo = useNavigate();

    async function deleteAccount(): Promise<void> {
        // const res = await fetchData(`/users/${userID}`, 'DELETE');
        // if (res instanceof Error) {
        //     console.error(res);
        // } else if (res.ok) {
        //     redirectToHome();
        // } else {
        //     setErrors(await res.json());
        // }
    }

    return (
        <>
            {!user || user?.id !== userID ? (
                <ErrorPage />
            ) : (
                <div className="flex flex-col gap-12 mt-20 text-lg font-bold">
                    {/* {errors && <ErrorList errors={errors} />} */}

                    <button
                        className="px-4 py-2 uppercase transition border rounded-md shadow-md border-zinc-100 bg-zinc-50 hover:scale-95 hover:drop-shadow-lg"
                        aria-label="click to delete account"
                        onClick={deleteAccount}
                    >
                        Yes, delete me!
                    </button>
                    <button
                        className="px-4 py-2 uppercase transition border rounded-md shadow-md border-zinc-100 bg-zinc-50 hover:scale-95 hover:drop-shadow-lg"
                        aria-label="cancel account deletion"
                        onClick={(): void => navigateTo(`/users/${userID}`)}
                    >
                        No, let me stay!
                    </button>
                </div>
            )}
        </>
    );
}

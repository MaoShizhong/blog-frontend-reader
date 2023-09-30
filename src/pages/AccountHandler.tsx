import { FormEvent, useContext, useRef, useState } from 'react';
import { UserContext } from '../App';
import { fetchData } from '../helpers/fetch_options';
import { SignupFormFields } from '../components/login/SignupFormFields';
import { LoginFormFields } from '../components/login/LoginFormFields';
import { useLocation, useNavigate } from 'react-router-dom';

type ValidationError = {
    type: string;
    msg: string;
    path: string;
    location: string;
};

export type Errors = {
    errors?: ValidationError[];
    message?: string;
} | null;

export type AccessType = 'login' | 'signup';
type AccountHandlerProps = { loginType: AccessType };

export function AccountHandler({ loginType }: AccountHandlerProps) {
    const [errors, setErrors] = useState<Errors>(null);

    const { setUser } = useContext(UserContext);

    const location = useLocation();

    const formRef = useRef<HTMLFormElement>(null);
    const navigateTo = useNavigate();

    async function login(e: FormEvent, loginType: AccessType): Promise<void> {
        e.preventDefault();

        const formData = new FormData(formRef.current!);
        const endpoint = loginType === 'login' ? 'tokens' : 'user';

        const res = await fetchData(`/auth/${endpoint}`, 'POST', formData, true);

        if (res instanceof Error) {
            navigateTo('/error');
        } else {
            const user = await res.json();

            if (res.ok) {
                setUser(user);
                navigateTo(location.state.previousPage);
            } else {
                setErrors(user);
            }
        }
    }

    return (
        <form
            onSubmit={(e: FormEvent): Promise<void> => login(e, loginType)}
            className="flex flex-col items-center w-8/12 gap-4 p-6 mt-10 bg-white border-2 border-slate-50 rounded-3xl drop-shadow-2xl"
            ref={formRef}
        >
            {loginType === 'login' ? (
                <LoginFormFields errors={errors} />
            ) : (
                <SignupFormFields errors={errors} />
            )}
        </form>
    );
}

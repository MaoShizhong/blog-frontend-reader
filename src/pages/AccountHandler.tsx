import { FormEvent, useContext, useRef, useState } from 'react';
import { UserContext } from '../App';
import { fetchData } from '../helpers/fetch_options';
import { SignupFormFields } from '../components/login/SignupFormFields';
import { LoginFormFields } from '../components/login/LoginFormFields';

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

    const { redirectToHome } = useContext(UserContext);

    const formRef = useRef<HTMLFormElement>(null);

    async function login(e: FormEvent, loginType: AccessType): Promise<void> {
        e.preventDefault();
        const formData = new FormData(formRef.current!);

        const res = await fetchData(`/auth/${loginType}`, 'POST', formData);

        if (res instanceof Error) {
            console.error(res);
        } else {
            const user = await res.json();
            res.ok ? redirectToHome(user) : setErrors(user);
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

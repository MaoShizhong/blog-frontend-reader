import { ErrorList } from '../ErrorList';
import { Errors } from '../../pages/AccountHandler';
import { PasswordReqs } from './PasswordReqs';

type SignupFormProps = {
    errors: Errors;
};

export function SignupFormFields({ errors }: SignupFormProps) {
    return (
        <>
            <h1 className="text-xl font-bold">Sign up</h1>
            <p>All fields are required</p>

            {errors && <ErrorList errors={errors} />}

            <label className="flex flex-col ">
                Username (required):
                <input
                    name="username"
                    type="text"
                    autoComplete="off"
                    className="px-2 py-1 border border-black rounded-md"
                    required
                />
            </label>

            <label className="flex flex-col">
                Password (required):
                <input
                    name="password"
                    type="password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                    className="px-2 py-1 border border-black rounded-md"
                    required
                />
            </label>
            <label className="flex flex-col">
                Confirm password (required):
                <input
                    name="confirm"
                    type="password"
                    className="px-2 py-1 border border-black rounded-md"
                    required
                />
            </label>

            <PasswordReqs />

            <button className="px-4 py-1 transition bg-white border border-black rounded-md hover:scale-110">
                Sign up
            </button>
        </>
    );
}

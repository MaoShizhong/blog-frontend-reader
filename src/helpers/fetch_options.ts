export type HTTPVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type FormOptions = {
    method: HTTPVerb;
    credentials: RequestCredentials;
    body?: URLSearchParams;
};

const API_DOMAIN = 'https://mao-blog-api.adaptable.app';
// const API_DOMAIN = 'http://localhost:5000';

export async function fetchData(
    endpoint: string,
    method: HTTPVerb,
    formData?: FormData,
    isSignupLogin: boolean = false
): Promise<Response | Error> {
    try {
        const res = await fetch(`${API_DOMAIN}${endpoint}`, getFetchOptions(method, formData));

        if (res.ok || isSignupLogin) {
            return res;
        } else {
            const refresh = await fetch(`${API_DOMAIN}/auth/refresh`, getFetchOptions('GET'));

            if (!refresh.ok) {
                return refresh;
            } else {
                const retry = await fetch(
                    `${API_DOMAIN}${endpoint}`,
                    getFetchOptions(method, formData)
                );

                return retry;
            }
        }
    } catch (error) {
        return error as Error;
    }
}

function getFetchOptions(method: HTTPVerb, formData?: FormData): FormOptions {
    const formOptions: FormOptions = {
        method: method,
        credentials: 'include',
    };

    if (formData) {
        // Unable to resolve "missing size/sort fields from type"
        // eslint-disable-next-line
        formOptions.body = new URLSearchParams(formData as any);
    }

    return formOptions;
}

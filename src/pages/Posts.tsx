import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Errors } from './AccountHandler';
import { ErrorList } from '../components/ErrorList';
import { getFetchOptions } from '../helpers/form_options';
import { API_DOMAIN } from '../helpers/domain';

type Author = {
    name: string;
    username: string;
};

type Category = 'javascript/typescript' | 'html' | 'css' | 'other';

export type Post = {
    _id: string;
    author: Author;
    title: string;
    timestamp: string;
    category: Category;
    text: string[];
    isPublished: boolean;
    url: string;
};

export function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [errors, setErrors] = useState<Errors>(null);

    useEffect((): void => {
        (async (): Promise<void> => {
            try {
                const res = await fetch(`${API_DOMAIN}/posts`, getFetchOptions('GET'));

                const resAsJSON = await res.json();

                res.ok ? setPosts(resAsJSON) : setErrors(resAsJSON);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <main className="px-6 mt-10 bg-white border-2 sm:px-10 w-main drop-shadow-2xl border-slate-50 rounded-3xl">
            {errors && <ErrorList errors={errors} />}

            {posts.map((post, i) => (
                <article key={i} className="my-6 sm:my-10">
                    <Link
                        to={post._id}
                        state={{ post: post }}
                        className="text-3xl transition hover:text-slate-500"
                    >
                        {post.title}
                    </Link>

                    <p className="text-sm italic">
                        {new Date(post.timestamp).toDateString()} -{' '}
                        {post.isPublished ? 'Published' : 'Unpublished'}
                    </p>

                    <p className="text-sm">
                        Category: <i>{post.category}</i>
                    </p>

                    <p>
                        By {post.author.name} ({post.author.username})
                    </p>
                </article>
            ))}
        </main>
    );
}

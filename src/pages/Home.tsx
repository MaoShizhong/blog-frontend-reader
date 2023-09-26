import { fetchData } from '../helpers/fetch_options';
import { useEffect, useState } from 'react';
import { Errors } from './AccountHandler';
import { ErrorList } from '../components/ErrorList';
import { PostPreview } from '../components/posts/PostPreview';

type Author = {
    name: string;
    username: string;
};

type Category = 'javascript/typescript' | 'html' | 'css' | 'other';

export type Post = {
    _id: string;
    author: Author;
    title: string;
    imageURL?: string;
    timestamp: string;
    category: Category;
    text: string;
    commentCount: number;
    isPublished: boolean;
    isFeatured: boolean;
    objectFit: string;
    url: string;
    clientURL: string;
};

export function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [errors, setErrors] = useState<Errors>(null);
    const [featuredPost, setFeaturedPost] = useState<Post | null>(null);

    useEffect((): void => {
        (async (): Promise<void> => {
            const res = await fetchData('/posts', 'GET');

            if (res instanceof Error) {
                console.error(res);
            } else {
                const resAsJSON = await res.json();
                if (res.ok) {
                    setPosts(resAsJSON);
                    setFeaturedPost(resAsJSON.find((post: Post): boolean => post.isFeatured));
                } else {
                    setErrors(resAsJSON);
                }
            }
        })();
    }, []);

    return (
        <main className="flex justify-center py-10 w-main">
            {errors && <ErrorList errors={errors} />}
            <div className="flex flex-col grid-cols-2 auto-rows-auto sm:grid sm:gap-6">
                {featuredPost && <PostPreview post={featuredPost} featured={true} />}

                {posts &&
                    posts.map(
                        (post, i): JSX.Element => (
                            <PostPreview key={i} post={post} featured={false} />
                        )
                    )}
            </div>
        </main>
    );
}

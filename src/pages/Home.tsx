import { fetchData } from '../helpers/fetch_options';
import { useEffect, useState } from 'react';
import { Errors } from './AccountHandler';
import { ErrorList } from '../components/ErrorList';
import { PostPreview } from '../components/posts/PostPreview';
import { ErrorPage } from './ErrorPage';

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
    imageCredit?: string;
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
    const { posts, featuredPost, errors, fetchError, loading } = useGetPosts();

    return (
        <>
            {fetchError ? (
                <ErrorPage />
            ) : (
                <main className="flex justify-center py-10 w-main">
                    {errors || !posts ? (
                        <ErrorList errors={errors} />
                    ) : loading ? (
                        <p className="mt-20 text-lg">Fetching posts...</p>
                    ) : (
                        <div className="flex flex-col grid-cols-2 auto-rows-auto sm:grid sm:gap-6">
                            {featuredPost && <PostPreview post={featuredPost} featured={true} />}

                            {posts &&
                                posts.map(
                                    (post): JSX.Element => (
                                        <PostPreview key={post._id} post={post} featured={false} />
                                    )
                                )}
                        </div>
                    )}
                </main>
            )}
        </>
    );
}

function useGetPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
    const [errors, setErrors] = useState<Errors>(null);
    const [fetchError, setFetchError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect((): void => {
        (async (): Promise<void> => {
            const res = await fetchData('/posts', 'GET');

            if (res instanceof Error) {
                setFetchError(true);
            } else {
                const resAsJSON = await res.json();

                if (res.ok) {
                    setPosts(resAsJSON);
                    setFeaturedPost(resAsJSON.find((post: Post): boolean => post.isFeatured));
                } else {
                    setErrors(resAsJSON);
                }
            }

            setLoading(false);
        })();
    }, []);

    return { posts, featuredPost, errors, fetchError, loading };
}

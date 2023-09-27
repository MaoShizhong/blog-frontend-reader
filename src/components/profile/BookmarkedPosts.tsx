import { useEffect, useState } from 'react';
import { fetchData } from '../../helpers/fetch_options';
import { PostPreview } from '../posts/PostPreview';
import { User } from '../../App';
import { Post } from '../../pages/Home';
import { Errors } from '../../pages/AccountHandler';
import { ErrorList } from '../ErrorList';

type BookmarkedPostsProps = {
    user: User;
};

export function BookmarkedPosts({ user }: BookmarkedPostsProps): JSX.Element {
    const { bookmarkedPosts, errors, loading } = useGetBookmarkedPosts(user);

    return (
        <section className="flex flex-col gap-4 my-12" aria-label="bookmarked articles">
            {errors ? (
                <ErrorList errors={errors} />
            ) : loading ? (
                <p className="text-center">Fetching bookmarks...</p>
            ) : (
                <>
                    <h2 className="text-lg font-bold text-center">Bookmarks</h2>
                    {bookmarkedPosts.map(
                        (post, i): JSX.Element => (
                            <PostPreview key={i} post={post} featured={false} />
                        )
                    )}
                </>
            )}
        </section>
    );
}

function useGetBookmarkedPosts(user: User) {
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
    const [errors, setErrors] = useState<Errors>(null);
    const [loading, setLoading] = useState(true);

    useEffect((): void => {
        (async (): Promise<void> => {
            const res = await fetchData(`/users/${user?.id}/bookmarks`, 'GET');

            if (res instanceof Error) {
                console.error(res);
            } else {
                const resAsJSON = await res.json();

                res.ok ? setBookmarkedPosts(resAsJSON.bookmarks) : setErrors(resAsJSON);
            }

            setLoading(false);
        })();
    }, [user]);

    return { bookmarkedPosts, errors, loading };
}

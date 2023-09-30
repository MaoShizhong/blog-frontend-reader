import { useEffect, useState } from 'react';
import { fetchData } from '../../helpers/fetch_options';
import { PostPreview } from '../posts/PostPreview';
import { User } from '../../App';
import { Post } from '../../pages/Home';
import { Errors } from '../../pages/AccountHandler';
import { ErrorList } from '../ErrorList';
import { useNavigate } from 'react-router-dom';

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
                    {bookmarkedPosts.length ? (
                        bookmarkedPosts.map(
                            (post): JSX.Element => (
                                <PostPreview key={post._id} post={post} featured={false} />
                            )
                        )
                    ) : (
                        <p>You do not have any bookmarked articles</p>
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

    const navigateTo = useNavigate();

    useEffect((): void => {
        (async (): Promise<void> => {
            const res = await fetchData(`/users/${user?.id}/bookmarks`, 'GET');

            if (res instanceof Error) {
                navigateTo('/error');
            } else {
                const resAsJSON = await res.json();

                res.ok ? setBookmarkedPosts(resAsJSON.bookmarks) : setErrors(resAsJSON);
            }

            setLoading(false);
        })();
    }, [user]);

    return { bookmarkedPosts, errors, loading };
}

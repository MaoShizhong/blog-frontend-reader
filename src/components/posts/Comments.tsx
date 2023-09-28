import { useContext, useEffect, useState } from 'react';
import { Comment } from './Comment';
import { fetchData } from '../../helpers/fetch_options';
import { UserContext } from '../../App';
import { AddComment } from './AddComment';
import { Link } from 'react-router-dom';

type CommentsProps = {
    commentCount: number;
    postID: string;
};

export function Comments({ commentCount, postID }: CommentsProps) {
    const { user } = useContext(UserContext);

    const [comments, setComments] = useState<Comment[]>([]);
    const [currentCommentCount, setCurrentCommentCount] = useState(commentCount);
    const [errors, setErrors] = useState(false);

    // show all comments on post
    useEffect((): void => {
        (async (): Promise<void> => {
            const res = await fetchData(`/posts/${postID}/comments`, 'GET');

            if (res instanceof Error) {
                console.error(res);
                setErrors(true);
            } else {
                const comments = await res.json();

                setComments(comments);
            }
        })();
    }, [postID]);

    return (
        <section className="flex flex-col w-full">
            <h2 className="mb-8 text-xl">
                {currentCommentCount} {currentCommentCount === 1 ? 'comment' : 'comments'}
            </h2>

            {errors && <div>Error fetching comments!</div>}

            {user ? (
                <AddComment
                    postID={postID}
                    setComments={setComments}
                    setCommentCount={setCurrentCommentCount}
                    setErrors={setErrors}
                />
            ) : (
                <div>
                    Please{' '}
                    <Link
                        to="/login"
                        className="inline-block px-2 transition border rounded-md shadow-md bg-zinc-50 hover:drop-shadow-lg"
                    >
                        Login
                    </Link>{' '}
                    or{' '}
                    <Link
                        to="/signup"
                        className="inline-block px-2 transition border rounded-md shadow-md bg-zinc-50 hover:drop-shadow-lg"
                    >
                        Sign Up
                    </Link>{' '}
                    to post a comment.
                </div>
            )}

            <hr className="my-8" />

            <div className="flex flex-col">
                {comments.map((comment, i) => (
                    <Comment key={i} comment={comment} currentUsername={user?.username} />
                ))}
            </div>
        </section>
    );
}

import { useEffect, useState } from 'react';
import { Comment } from './Comment';
import { fetchData } from '../../helpers/fetch_options';

type CommentsProps = {
    commentCount: number;
    postID: string;
};

export function Comments({ commentCount, postID }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
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

                // if 404 then comments will be an empty array
                setComments(comments);
            }
        })();
    }, [postID]);

    const commentHeading =
        commentCount === 1 ? `${commentCount} comment:` : `${commentCount} comments:`;

    return (
        <section className="flex flex-col w-full">
            <h2 className="text-xl">{commentHeading}</h2>
            {errors && <div>Error fetching comments!</div>}

            {comments.map((comment, i) => (
                <Comment key={i} comment={comment} />
            ))}
        </section>
    );
}

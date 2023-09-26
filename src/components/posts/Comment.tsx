import { timestamp } from '../../helpers/dates';
import htmlEntities from 'he';
import { fetchData } from '../../helpers/fetch_options';
import { Dispatch, SetStateAction } from 'react';

type Commenter = {
    username: string;
};

export type Comment = {
    _id: string;
    postID: string;
    commenter: Commenter;
    timestamp: string;
    text: string;
    replies: Comment[];
};

type CommentProps = {
    comment: Comment;
    currentUsername?: string;
    setComments: Dispatch<SetStateAction<Comment[]>>;
    setCommentCount: Dispatch<SetStateAction<number>>;
};

export function Comment({ comment, currentUsername, setComments, setCommentCount }: CommentProps) {
    async function deleteComment(): Promise<void> {
        const res = await fetchData(`/comments/${comment._id}`, 'DELETE');

        if (res instanceof Error || !res.ok) {
            console.error(res);
        } else {
            setComments((prev): Comment[] => prev.filter((cmnt) => cmnt._id !== comment._id));
            setCommentCount((prev): number => prev - 1);
        }
    }

    return (
        <div className="flex flex-col justify-between gap-2 p-3 my-2 text-sm border rounded-md shadow-md">
            <div className="flex justify-between">
                <p aria-label="comment details">
                    <b>{comment.commenter.username}</b> - <i>{timestamp(comment.timestamp)}</i>
                </p>
                {currentUsername === comment.commenter.username && (
                    <button
                        onClick={deleteComment}
                        className="transition hover:text-zinc-500"
                        aria-label="Delete comment"
                    >
                        Delete
                    </button>
                )}
            </div>
            <p className="text-base break-words" aria-label="comment body">
                {htmlEntities.decode(comment.text)}
            </p>
        </div>
    );
}

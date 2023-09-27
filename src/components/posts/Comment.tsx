import { timestamp } from '../../helpers/dates';
import htmlEntities from 'he';
import { fetchData } from '../../helpers/fetch_options';
import { Dispatch, SetStateAction } from 'react';
import { Avatar } from '../profile/Avatar';

type Commenter = {
    username: string;
    avatar: string;
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
    const notDeleted = !!comment.commenter;
    const deletedClass = notDeleted ? '' : 'italic text-sm';

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
        <div className="flex flex-col justify-between gap-2 p-3 my-2 text-sm border rounded-md shadow-md bg-zinc-50">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    {notDeleted && (
                        <Avatar
                            username={comment.commenter.username}
                            avatarColor={comment.commenter.avatar}
                            isProfile={false}
                        />
                    )}
                    <p className={deletedClass} aria-label="comment details">
                        <b>{notDeleted ? comment.commenter.username : 'deleted'}</b> -{' '}
                        <i>{timestamp(comment.timestamp)}</i>
                    </p>
                </div>

                {notDeleted && currentUsername === comment.commenter.username && (
                    <button
                        onClick={deleteComment}
                        className="transition hover:text-zinc-500"
                        aria-label="Delete comment"
                    >
                        Delete
                    </button>
                )}
            </div>

            <p
                className={`text-base break-words whitespace-pre-wrap ${deletedClass}`}
                aria-label="comment body"
            >
                {htmlEntities.decode(comment.text || 'deleted')}
            </p>
        </div>
    );
}

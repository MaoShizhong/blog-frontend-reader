import { timestamp } from '../../helpers/dates';
import htmlEntities from 'he';
import { fetchData } from '../../helpers/fetch_options';
import { Avatar, FontColour } from '../profile/Avatar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type Commenter = {
    username: string;
    avatar: string;
    fontColour: FontColour;
};

export type Comment = {
    _id: string;
    postID: string;
    commenter: Commenter;
    timestamp: string;
    text: string;
    replies: Comment[];
    deleted: boolean;
};

type CommentProps = {
    comment: Comment;
    currentUsername?: string;
};

export function Comment({ comment, currentUsername }: CommentProps) {
    const [currentComment, setCurrentComment] = useState<Comment>(comment);

    const notDeleted = !currentComment.deleted;
    const deletedClass = notDeleted ? '' : 'italic text-sm';

    const navigateTo = useNavigate();

    async function deleteComment(): Promise<void> {
        const res = await fetchData(`/comments/${comment._id}`, 'DELETE');

        // Successful delete simply marks comment as deleted
        // but still counted/displayed with empty text
        if (res instanceof Error || !res.ok) {
            navigateTo('/error');
        } else {
            setCurrentComment(await res.json());
        }
    }

    return (
        <div className="flex flex-col justify-between gap-2 p-3 my-2 text-sm border rounded-md shadow-md bg-zinc-50">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    {notDeleted && (
                        <Avatar
                            username={currentComment.commenter.username}
                            avatarColor={currentComment.commenter.avatar}
                            fontColour={currentComment.commenter.fontColour}
                            isProfile={false}
                        />
                    )}
                    <p className={deletedClass} aria-label="comment details">
                        <b>{notDeleted ? currentComment.commenter.username : 'deleted'}</b> -{' '}
                        <i>{timestamp(currentComment.timestamp)}</i>
                    </p>
                </div>

                {notDeleted && currentUsername === currentComment.commenter.username && (
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
                {htmlEntities.decode(currentComment.text || 'deleted')}
            </p>
        </div>
    );
}

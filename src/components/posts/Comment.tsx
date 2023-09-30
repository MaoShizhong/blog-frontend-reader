import { timestamp } from '../../helpers/dates';
import htmlEntities from 'he';
import { fetchData } from '../../helpers/fetch_options';
import { Avatar, FontColour } from '../profile/Avatar';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useState } from 'react';
import { AddComment } from './AddComment';
import { CommentButtons } from './CommentButtons';

type Commenter = {
    username: string;
    avatar: string;
    fontColour: FontColour;
};

export type Comment = {
    _id: string;
    post: string;
    commenter: Commenter;
    timestamp: string;
    text: string;
    replies: Comment[];
    deleted: boolean;
};

type CommentProps = {
    comment: Comment;
    currentUsername?: string;
    level: number;
    setCommentCount: Dispatch<SetStateAction<number>>;
};

const levelLimit = 3;

/*
    - Nested comments - recursive - defaults to showing max 3 layers of comments
    - Last comments can be individually expanded, increasing levelLimit for that specific chain
*/
export function Comment({ comment, currentUsername, level, setCommentCount }: CommentProps) {
    const [currentLevel, setCurrentLevel] = useState(level);
    const [currentComment, setCurrentComment] = useState<Comment>(comment);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isLastLevelShown, setIsLastLevelShown] = useState(currentLevel === levelLimit);
    const [replyTextareaOpen, setReplyTextareaOpen] = useState(false);

    const deleted = currentComment.deleted;
    const deletedClass = !deleted ? 'pt-3' : 'italic pt-1';

    const hasReplies = currentComment.replies && currentComment.replies.length > 0;
    const hasRepliesToShow = currentLevel < levelLimit && hasReplies;

    const navigateTo = useNavigate();

    async function deleteComment(): Promise<void> {
        const res = await fetchData(
            `/comments/${currentComment._id}?level=${currentLevel}`,
            'DELETE'
        );

        // Successful delete simply marks comment as deleted
        // but still counted/displayed with empty text
        if (res instanceof Error || !res.ok) {
            navigateTo('/error');
        } else {
            setCurrentComment(await res.json());
        }
    }

    async function showChildReplies(): Promise<void> {
        const res = await fetchData(`/comments/${currentComment._id}/replies`, 'GET');

        if (res instanceof Error || !res.ok) {
            navigateTo('/error');
        } else {
            setCurrentComment(await res.json());
            setCurrentLevel(currentLevel - 1);
            setIsLastLevelShown(false);
        }
    }

    return (
        <>
            {currentLevel <= levelLimit && (
                <div
                    className={`flex flex-col justify-between gap-2 pb-1 pr-2 pl-3 my-1 text-sm border rounded-md shadow-md bg-zinc-50 ${deletedClass}`}
                >
                    {/* Top line */}
                    <div className="flex items-start justify-between">
                        {/* Username and timestamp */}
                        <div className="flex items-center gap-2">
                            {!deleted && (
                                <Avatar
                                    username={currentComment.commenter.username}
                                    avatarColor={currentComment.commenter.avatar}
                                    fontColour={currentComment.commenter.fontColour}
                                    isProfile={false}
                                />
                            )}
                            <p
                                className="flex flex-col sm:flex-row sm:gap-3"
                                aria-label="comment details"
                            >
                                <b>{!deleted ? currentComment.commenter.username : 'deleted'}</b>
                                <i>{timestamp(currentComment.timestamp)}</i>
                            </p>
                        </div>

                        {(!deleted || hasReplies) && (
                            <button
                                onClick={(): void => setIsExpanded(!isExpanded)}
                                aria-label={
                                    isExpanded ? 'collapse comment' : 'expand collapsed comment'
                                }
                            >
                                {isExpanded ? '🞁' : '🞃'}
                            </button>
                        )}
                    </div>

                    {/* Comment body text */}
                    {!deleted && isExpanded && (
                        <p
                            className="text-base break-words whitespace-pre-wrap"
                            aria-label="comment body"
                        >
                            {htmlEntities.decode(currentComment.text)}
                        </p>
                    )}

                    {!deleted && <hr className="mt-1" />}

                    {/* Buttons */}
                    {!deleted && isExpanded && (
                        <CommentButtons
                            showShowRepliesButton={hasReplies && isLastLevelShown}
                            replyTextareaOpen={replyTextareaOpen}
                            showChildReplies={showChildReplies}
                            deleteComment={deleteComment}
                            setReplyTextareaOpen={setReplyTextareaOpen}
                        />
                    )}

                    {replyTextareaOpen && (
                        <AddComment
                            postID={currentComment.post}
                            setRepliedComment={setCurrentComment}
                            setCommentCount={setCommentCount}
                            commentToReply={currentComment}
                            setReplyTextareaOpen={setReplyTextareaOpen}
                            setParentLevel={setCurrentLevel}
                            setIsParentLastLevelShown={setIsLastLevelShown}
                        />
                    )}

                    {/* Replies */}
                    {isExpanded &&
                        hasRepliesToShow &&
                        currentComment.replies.map(
                            (reply, i): JSX.Element => (
                                <Comment
                                    key={reply._id}
                                    comment={currentComment.replies[i]}
                                    currentUsername={currentUsername}
                                    level={currentLevel + 1}
                                    setCommentCount={setCommentCount}
                                />
                            )
                        )}
                </div>
            )}
        </>
    );
}

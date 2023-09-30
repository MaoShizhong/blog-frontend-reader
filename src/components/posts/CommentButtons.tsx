import { Dispatch, SetStateAction } from 'react';
import { DeleteButton } from '../DeleteButton';

type CommentButtonsProps = {
    isOwnComment: boolean;
    showShowRepliesButton: boolean;
    replyTextareaOpen: boolean;
    showChildReplies: () => Promise<void>;
    deleteComment: () => Promise<void>;
    setReplyTextareaOpen: Dispatch<SetStateAction<boolean>>;
};

export function CommentButtons({
    isOwnComment,
    showShowRepliesButton,
    replyTextareaOpen,
    showChildReplies,
    deleteComment,
    setReplyTextareaOpen,
}: CommentButtonsProps) {
    return (
        <div className="flex justify-end gap-8">
            {isOwnComment && <DeleteButton callback={deleteComment} />}

            {showShowRepliesButton && (
                <button
                    className="mr-auto italic transition hover:text-zinc-500"
                    onClick={showChildReplies}
                >
                    Show more replies
                </button>
            )}

            <button
                className="ml-auto transition hover:text-zinc-500"
                onClick={(): void => setReplyTextareaOpen(!replyTextareaOpen)}
            >
                {replyTextareaOpen ? 'Cancel' : 'Reply'}
            </button>
        </div>
    );
}

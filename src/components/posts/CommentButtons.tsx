import { Dispatch, SetStateAction, useContext } from 'react';
import { UserContext } from '../../App';
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
    const { user } = useContext(UserContext);
    return (
        <>
            {(user || showShowRepliesButton) && <hr className="mt-1" />}

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

                {user && (
                    <button
                        className="ml-auto transition hover:text-zinc-500"
                        onClick={(): void => setReplyTextareaOpen(!replyTextareaOpen)}
                    >
                        {replyTextareaOpen ? 'Cancel' : 'Reply'}
                    </button>
                )}
            </div>
        </>
    );
}

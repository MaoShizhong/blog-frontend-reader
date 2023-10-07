import { Dispatch, FormEvent, SetStateAction, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { fetchData } from '../../helpers/fetch_options';
import { Comment } from './Comment';

type AddCommentProps = {
    postID: string;
    // For top level comments
    setComments?: Dispatch<SetStateAction<Comment[]>>;
    // For replies
    setRepliedComment?: Dispatch<SetStateAction<Comment>>;
    // For post regardless of comment type
    setCommentCount: Dispatch<SetStateAction<number>>;
    commentToReply?: Comment;
    setReplyTextareaOpen?: Dispatch<SetStateAction<boolean>>;
    setIsParentLastLevelShown?: Dispatch<SetStateAction<boolean>>;
    setParentLevel?: Dispatch<SetStateAction<number>>;
};

export function AddComment({
    postID,
    setComments,
    setRepliedComment,
    setCommentCount,
    commentToReply,
    setReplyTextareaOpen,
    setIsParentLastLevelShown,
    setParentLevel,
}: AddCommentProps) {
    const { user } = useContext(UserContext);

    const formRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const navigateTo = useNavigate();

    console.log(user);

    function postComment(e: FormEvent): void {
        e.preventDefault();

        if (!formRef.current) {
            console.error('Error - no comment form found');
            return;
        }

        const formData = new FormData(formRef.current);

        commentToReply ? postReply(formData) : postNewComment(formData);
    }

    async function postNewComment(formData: FormData): Promise<void> {
        const res = await fetchData(
            `/posts/${postID}/comments?commenterID=${user?.id}`,
            'POST',
            formData
        );

        if (res instanceof Error || !res.ok) {
            navigateTo('/error');
        } else if (res.ok) {
            const newComment = await res.json();

            setComments!((prev): Comment[] => [newComment, ...prev]);
            setCommentCount((prev): number => prev + 1);
        }
    }

    async function postReply(formData: FormData): Promise<void> {
        const res = await fetchData(
            `/posts/${commentToReply?.post}/comments?commenterID=${user?.id}&parent=${commentToReply?._id}`,
            'POST',
            formData
        );

        if (res instanceof Error || !res.ok) {
            navigateTo('/error');
        } else if (res.ok) {
            const newComment = await res.json();

            setRepliedComment!(newComment);
            setCommentCount((prev: number): number => prev + 1);
            setReplyTextareaOpen!(false);
            setIsParentLastLevelShown!(false);
            setParentLevel!((prev: number): number => {
                return prev === 3 ? prev - 1 : prev;
            });
        }
    }

    return (
        <>
            {commentToReply && <hr />}

            <form
                className="flex flex-col gap-2"
                onSubmit={(e: FormEvent): void => {
                    postComment(e);
                    if (textareaRef.current) textareaRef.current.value = '';
                }}
                ref={formRef}
            >
                <textarea
                    name="text"
                    rows={3}
                    placeholder="Let your thoughts be heard!"
                    className="min-h-[7rem] px-2 py-1 border rounded-md shadow-md bg-zinc-50"
                    ref={textareaRef}
                    required
                ></textarea>

                <button className="self-end px-2 transition border rounded-md shadow-md active:scale-95 hover:drop-shadow-lg bg-zinc-50">
                    Post comment
                </button>
            </form>
        </>
    );
}

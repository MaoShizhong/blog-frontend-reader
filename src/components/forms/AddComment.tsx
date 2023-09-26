import { Dispatch, FormEvent, SetStateAction, useContext, useRef } from 'react';
import { fetchData } from '../../helpers/fetch_options';
import { Comment } from '../posts/Comment';
import { UserContext } from '../../App';

type AddCommentProps = {
    postID: string;
    setComments: Dispatch<SetStateAction<Comment[]>>;
    setCommentCount: Dispatch<SetStateAction<number>>;
    setErrors: Dispatch<SetStateAction<boolean>>;
};

export function AddComment({ postID, setComments, setCommentCount, setErrors }: AddCommentProps) {
    const { user } = useContext(UserContext);

    const formRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    async function postComment(e: FormEvent): Promise<void> {
        e.preventDefault();

        if (!formRef.current || !textareaRef.current) {
            console.error('Error - no comment form found');
            return;
        }

        const formData = new FormData(formRef.current);

        const res = await fetchData(
            `/posts/${postID}/comments?commenterID=${user?.id}`,
            'POST',
            formData
        );

        if (res instanceof Error) {
            console.error(res);
        } else if (res.ok) {
            const newComment = await res.json();

            setComments((prev): Comment[] => [newComment, ...prev]);
            setCommentCount((prev): number => prev + 1);

            textareaRef.current.value = '';
            console.log(newComment);
        } else {
            setErrors(await res.json());
        }
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={postComment} ref={formRef}>
            <textarea
                name="text"
                rows={3}
                placeholder="Let your thoughts be heard!"
                className="px-2 py-1 border rounded-md shadow-md bg-zinc-50"
                ref={textareaRef}
                required
            ></textarea>
            <button className="self-end px-2 border rounded-md shadow-md active:scale-95 hover:drop-shadow-lg bg-zinc-50">
                Post comment
            </button>
        </form>
    );
}

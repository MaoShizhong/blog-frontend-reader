export type Comment = {
    commenter: string;
    timestamp: string;
    text: string;
};

type CommentProps = {
    comment: Comment;
};

export function Comment({ comment }: CommentProps) {
    return <div>{comment.text}</div>;
}

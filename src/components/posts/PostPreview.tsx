import { Link } from 'react-router-dom';
import { Post } from '../../pages/Home';
import { Bookmark } from '../Bookmark';
import { useContext } from 'react';
import { UserContext } from '../../App';

type PostPreviewProps = { post: Post; featured: boolean };

export function PostPreview({ post, featured }: PostPreviewProps) {
    const { user } = useContext(UserContext);

    const commentCount =
        post.comments.length === 1
            ? `${post.comments.length} comment`
            : `${post.comments.length} comments`;

    const featuredClasses = 'row-span-2';

    return (
        <article
            className={`flex justify-between flex-col flex-1 max-w-xl gap-1 p-3 my-4 transition bg-zinc-50 rounded-md sm:my-0 shadow-md border hover:drop-shadow-lg ${
                featured && featuredClasses
            }`}
        >
            {featured && <h1 className="text-3xl font-bold text-center">Featured Article</h1>}
            <div>
                <Link
                    to={post.clientURL}
                    state={{ post: post }}
                    className="self-start text-2xl font-bold transition hover:text-zinc-500"
                >
                    {post.title}
                </Link>
                <p className="text-sm">
                    Written by {post.author.name} -{' '}
                    <i>
                        {post.category} - {new Date(post.timestamp).toDateString()}
                    </i>
                </p>
            </div>

            <div className="flex items-center self-end gap-2 mt-4">
                <p className="text-sm">{commentCount}</p>
                {user && (
                    <Bookmark
                        postID={post._id}
                        includeText={false}
                        isBookmarked={user?.bookmarkedPosts.includes(post._id)}
                    />
                )}
            </div>
        </article>
    );
}

import { Link } from 'react-router-dom';
import { Post } from '../../pages/Home';
import { Bookmark } from '../Bookmark';
import { useContext } from 'react';
import { UserContext } from '../../App';

type PostPreviewProps = { post: Post; featured: boolean };

export function PostPreview({ post, featured }: PostPreviewProps) {
    const { user } = useContext(UserContext);

    const featuredClasses = 'row-span-2';

    return (
        <article
            className={`flex justify-between flex-col flex-1 max-w-xl gap-1 p-3 my-4 transition bg-zinc-50 rounded-md sm:my-0 shadow-md border hover:drop-shadow-lg ${
                featured && featuredClasses
            }`}
        >
            {featured && <h1 className="text-3xl font-bold text-center">Featured Article</h1>}
            {featured && post.imageURL && (
                <img
                    src={post.imageURL}
                    alt="featured article image"
                    className="object-contain w-full rounded-md max-h-60"
                />
            )}

            <div className="flex gap-2">
                {!featured && (
                    <img
                        src={post.imageURL ?? '/default_article_icon.png'}
                        alt="article icon"
                        className="object-cover h-10 m-1 rounded-md aspect-square"
                    />
                )}
                <div>
                    <Link
                        to={post.clientURL}
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
            </div>

            <div className="flex items-center self-end gap-2 mt-4">
                <p className="text-sm">
                    {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
                </p>
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

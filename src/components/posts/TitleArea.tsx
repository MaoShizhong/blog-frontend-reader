import { useContext, useEffect, useRef } from 'react';
import { Bookmark } from '../Bookmark';
import { UserContext } from '../../App';

type TitleAreaProps = {
    postID: string;
    title: string;
    image?: string;
    objectFit: string;
    author: string;
    category: string;
    timestamp: string;
};

export function TitleArea({
    postID,
    title,
    image,
    objectFit,
    author,
    category,
    timestamp,
}: TitleAreaProps) {
    const { user } = useContext(UserContext);

    const titleRef = useRef<HTMLHeadingElement>(null);

    // Bypasses Vite error when assigning `textWrap` property within JSX style object
    // (experimental CSS feature in Chrome 114+)
    useEffect((): void => {
        titleRef.current!.style.cssText = 'text-wrap: balance';
    }, []);

    return (
        <div className="my-8">
            {image && (
                <img
                    src={image}
                    alt="article image"
                    className={`${objectFit} w-full mx-auto mb-10 max-h-72`}
                />
            )}

            {/* textWrap not recognised but experimental in Chrome 114+ */}
            <h1 className="my-2 text-4xl font-bold leading-tight" ref={titleRef}>
                {title}
            </h1>

            <div className="flex flex-col items-start justify-between gap-2 sm:items-center sm:flex-row">
                <p className="text-sm">
                    By <b>{author}</b> -{' '}
                    <i>
                        {category} - {timestamp}
                    </i>
                </p>

                {user && (
                    <Bookmark
                        postID={postID}
                        includeText={true}
                        isBookmarked={user?.bookmarkedPosts.includes(postID)}
                    />
                )}
            </div>
        </div>
    );
}

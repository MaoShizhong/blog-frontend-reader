import { useContext } from 'react';
import { fetchData } from '../helpers/fetch_options';
import { UserContext } from '../App';

type BookmarkProps = { postID: string; includeText: boolean; isBookmarked?: boolean };

export function Bookmark({ postID, includeText, isBookmarked }: BookmarkProps) {
    const { user, setUser } = useContext(UserContext);

    const text = isBookmarked ? 'Bookmarked' : 'Add to bookmarks';

    async function toggleBookmark(postID: string): Promise<void> {
        const res = await fetchData(
            `/users/${user?.id}?post=${postID}&bookmark=${!isBookmarked}`,
            'PATCH'
        );

        if (res instanceof Error) {
            console.error(res);
        } else if (res.ok) {
            const user = await res.json();

            setUser(user);
        } else {
            console.error(await res.json());
        }
    }

    return (
        <button
            onClick={(): Promise<void> => toggleBookmark(postID)}
            className="flex items-center gap-2 text-sm transition hover:scale-120"
        >
            {includeText && text}
            <svg width="1.3rem" height="1.3rem" viewBox="0 -60 600 600">
                <path
                    fill={isBookmarked ? '#196A69' : '#FAFAFA'}
                    d="M 84.555 -19.414 L 83.878 479.121 L 294.25 327.599 L 505.975 483.856 L 501.917 -22.796"
                ></path>
                <path
                    fill={isBookmarked ? '#196A69' : '#27272a'}
                    d="M 514.613 -58.173 L 58.138 -58.173 L 58.138 537.705 L 297.6 363.098 L 537.063 537.698 L 537.063 -58.173 L 514.613 -58.173 Z M 297.6 303.363 L 103.037 445.221 L 103.037 -8.207 L 492.163 -8.207 L 492.163 445.221 L 297.6 303.363 Z"
                ></path>
            </svg>
        </button>
    );
}

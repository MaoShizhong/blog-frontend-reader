import htmlEntities from 'he';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Comments } from '../components/posts/Comments';
import { TitleArea } from '../components/posts/TitleArea';
import { useEffect, useState } from 'react';
import { Post } from './Home';
import { fetchData } from '../helpers/fetch_options';
import { Errors } from './AccountHandler';
import { ErrorList } from '../components/ErrorList';

export function IndividualPost() {
    const { post, error, loading } = useGetPost();

    return (
        <main className="p-4 pb-20 my-4 sm:px-14 w-main">
            {error ? (
                <ErrorList errors={error} />
            ) : loading || !post ? (
                <p className="mt-20 text-lg">Fetching post...</p>
            ) : (
                <div className="flex flex-col items-center mx-auto max-w-prose">
                    <article className="w-full mb-24">
                        <TitleArea
                            postID={post._id}
                            image={post.imageURL}
                            objectFit={post.objectFit}
                            title={post.title}
                            author={post.author.name}
                            category={post.category}
                            timestamp={new Date(post.timestamp).toDateString()}
                        />

                        <Markdown
                            className="prose prose-pre:p-0"
                            children={htmlEntities.decode(post.text)}
                            components={{
                                code({ className, children }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={coldarkDark}
                                            customStyle={{ margin: 0 }}
                                            language={match![1]}
                                            wrapLongLines={true}
                                            PreTag="div"
                                        />
                                    );
                                },
                            }}
                        />
                    </article>

                    <Comments commentCount={post.commentCount} postID={post._id} />
                </div>
            )}
        </main>
    );
}

function useGetPost() {
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<Errors | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect((): void => {
        // ID is last part of post URL after -
        const postID = window.location.pathname.split('-').at(-1);

        (async (): Promise<void> => {
            const res = await fetchData(`/posts/${postID}`, 'GET');

            if (res instanceof Error || !res.ok) {
                setError(res as Errors);
            } else {
                setPost(await res.json());
            }

            setLoading(false);
        })();
    }, []);

    return { post, error, loading };
}

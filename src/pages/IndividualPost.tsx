import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import htmlEntities from 'he';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export function IndividualPost() {
    const { post } = useLocation().state;

    const titleRef = useRef<HTMLHeadingElement>(null);

    // Bypasses Vite error when assigning `textWrap` property within JSX style object
    // (experimental CSS feature in Chrome 114+)
    useEffect((): void => {
        titleRef.current!.style.cssText = 'text-wrap: balance';
    }, []);

    return (
        <main className="px-4 py-8 my-10 bg-white border-2 sm:px-14 w-main drop-shadow-2xl border-slate-50 rounded-3xl">
            <div className="flex flex-col items-center mx-auto">
                <article className="w-full mb-24">
                    <div className="mx-auto max-w-prose">
                        {/* textWrap not recognised but experimental in Chrome 114+ */}
                        <h1
                            className="my-4 text-3xl font-bold text-center sm:text-4xl"
                            ref={titleRef}
                        >
                            {post.title}
                        </h1>

                        <p className="mb-8 italic text-center">
                            {post.isPublished ? 'Published on ' : 'Unpublished - '}
                            {new Date(post.timestamp).toDateString()} - Written by{' '}
                            {post.author.name}
                        </p>
                    </div>

                    <Markdown
                        className="prose prose-pre:p-0"
                        children={htmlEntities.decode(post.text.join('\n'))}
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
            </div>
        </main>
    );
}

import { useLocation } from 'react-router-dom';
import htmlEntities from 'he';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Comments } from '../components/posts/Comments';
import { TitleArea } from '../components/posts/TitleArea';

export function IndividualPost() {
    const { post } = useLocation().state;

    return (
        <main className="p-4 my-4 sm:px-14 w-main">
            <div className="flex flex-col items-center mx-auto max-w-prose">
                <article className="w-full mb-24">
                    <TitleArea
                        postID={post._id}
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

                <Comments commentCount={post.comments.length} postID={post._id} />
            </div>
        </main>
    );
}

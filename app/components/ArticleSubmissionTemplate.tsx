import * as React from 'react';

interface ArticleSubmissionTemplateProps {
    name: string;
    email: string;
    title: string;
    excerpt: string;
    content: string;
    showAuthorName?: boolean;
}

export const ArticleSubmissionTemplate: React.FC<Readonly<ArticleSubmissionTemplateProps>> = ({
    name,
    email,
    title,
    excerpt,
    content,
    showAuthorName = true,
}) => (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
        <h1 style={{ color: '#d32f2f' }}>New Article Submission</h1>
        <p><strong>From:</strong> {name} ({email})</p>
        <p><strong>Author Attribution:</strong> {showAuthorName ? 'Show name on website' : 'Anonymous / Hide name'}</p>
        <hr />
        <h2>{title}</h2>
        <p><strong>Excerpt:</strong></p>
        <p style={{ fontStyle: 'italic', color: '#666' }}>{excerpt}</p>
        <p><strong>Content:</strong></p>
        <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
    </div>
);

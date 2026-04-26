import * as React from 'react';

interface MediaSubmissionTemplateProps {
    name: string;
    email: string;
    title: string;
    url: string;
    content: string;
    type: string;
    showAuthorName?: boolean;
}

export const MediaSubmissionTemplate: React.FC<Readonly<MediaSubmissionTemplateProps>> = ({
    name,
    email,
    title,
    url,
    content,
    type,
    showAuthorName = true,
}) => (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
        <h1 style={{ color: '#d32f2f', textTransform: 'capitalize' }}>New {type} Submission</h1>
        <p><strong>From:</strong> {name} ({email})</p>
        <p><strong>Author Attribution:</strong> {showAuthorName ? 'Show name on website' : 'Anonymous / Hide name'}</p>
        <hr />
        <h2>{title}</h2>
        <p><strong>Media URL:</strong></p>
        <p><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
        <p><strong>Description:</strong></p>
        <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
    </div>
);

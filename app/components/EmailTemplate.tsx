import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string;
    organization: string;
    subject: string;
    message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    email,
    organization,
    subject,
    message,
}) => (
    <div>
        <h1>New Contact from {name}</h1>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Organization:</strong> {organization}</p>
        <hr />
        <p>{message}</p>
    </div>
);
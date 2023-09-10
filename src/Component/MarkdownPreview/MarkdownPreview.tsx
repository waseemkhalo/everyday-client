import React from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownPreview.scss';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  try {
    return (
      <div className="markdown-preview">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  } catch (error) {
    console.error('Markdown rendering error:', error);
    return <div className="markdown-preview">Error rendering Markdown</div>;
  }
};

export default MarkdownPreview;

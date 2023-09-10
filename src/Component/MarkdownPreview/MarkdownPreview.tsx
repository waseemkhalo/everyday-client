import ReactMarkdown from 'react-markdown';
import './MarkdownPreview.scss';

interface MarkdownPreviewProps {
  content: string;
}


const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <div className="markdown-preview">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
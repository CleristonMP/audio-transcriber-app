import { useState } from "react";

interface TranscriptionEditorProps {
  transcription: string;
}

const TranscriptionEditor: React.FC<TranscriptionEditorProps> = ({
  transcription,
}) => {
  const [editedText, setEditedText] = useState(transcription);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <textarea
        className="w-full h-96 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
      />
    </div>
  );
};

export default TranscriptionEditor;

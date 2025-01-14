import React, { useState, useEffect } from 'react';
import { FileText, Image, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FilePreview = ({ fileUrl, fileType }: { fileUrl: string, fileType: string }) => {

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [fileUrl]);

  const handleLoadError = () => {
    setError('Failed to load file preview');
  };

  const renderPreview = () => {
    // Handle images (PNG, JPG, JPEG)
    if (fileType.match(/^image\/(png|jpe?g)$/i)) {
      return (
        <div className="w-full flex justify-center overflow-hidden">
          <img
            src={fileUrl}
            alt="File preview"
            className="max-w-full max-h-[600px] rounded-lg shadow-md object-contain "
            onError={handleLoadError}
            // onLoad={handleLoadSuccess}
          />
        </div>
      );
    }
    
    // Handle PDFs
    if (fileType === 'application/pdf') {
    return (
        <div className="w-full h-[600px] rounded-lg shadow-md overflow-hidden">
            <iframe
                src={`${fileUrl}#toolbar=1`}
                className="w-full h-full border-0"
                // onLoad={handleLoadSuccess}
                onError={handleLoadError}
                style={{ display: 'block' }}
            />
        </div>
    );

    
}

    // Unsupported file type
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Unsupported file type: {fileType}
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <div className="w-full">
      
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {renderPreview()}
    </div>
  );
};

export default FilePreview;
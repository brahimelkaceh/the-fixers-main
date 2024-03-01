import React, { useState } from 'react';
import { Button, CircularProgress, TextField, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { storage } from 'src/libs/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import toast, { Toaster } from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';

interface ImageUpload {
  name: string;
  // Add other properties as needed
}

const DownloadFiles: React.FC = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageUpload(file);
    }
  };

  const uploadFile = () => {
    if (!imageUpload || loading) return;

    const imageRef = ref(storage, `Files/${imageUpload.name}`);

    setLoading(true);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        toast.success('File uploaded successfully');
      })
      .catch((error: FirebaseError) => {
        console.error('Error uploading file:', error.message);
        toast.error('Failed to upload file');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <TextField
        type="file"
        onChange={handleFileChange}
      />
      <Button
        onClick={uploadFile}
        startIcon={
          loading ? (
            <CircularProgress
              color="success"
              size={12}
            />
          ) : (
            <DownloadIcon />
          )
        }
        variant="outlined"
      >
        {loading ? 'En cours...' : 'Télécharger'}
      </Button>
    </div>
  );
};

export default DownloadFiles;

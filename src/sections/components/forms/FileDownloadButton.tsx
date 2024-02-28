import React, { useState } from 'react';
import { Button, CircularProgress, SvgIcon, Typography, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const FileDownloadButton = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    // Replace 'your_excel_file_url' with the actual URL of your Excel file
    const excelFileUrl = "/Déclaration_sur_l'honneur.docx";

    // Create an invisible anchor element
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = excelFileUrl;

    anchor.download = "Déclaration_sur_l'honneur.docs"; // Specify the desired file name

    // Append the anchor element to the document
    document.body.appendChild(anchor);
    console.log(anchor);
    // Trigger a click on the anchor element to start the download
    anchor.click();

    // Remove the anchor element from the document
    document.body.removeChild(anchor);

    setLoading(false);
  };

  return (
    <div>
      <Button
        onClick={handleDownload}
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
        {loading ? 'en cours...' : 'Télécharger'}
      </Button>
    </div>
  );
};

export default FileDownloadButton;

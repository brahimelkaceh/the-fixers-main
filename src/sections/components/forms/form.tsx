import React, { useState } from 'react';
import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'; // Import yup
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Send01 from '@untitled-ui/icons-react/build/esm/Send01';
import { FileUploader } from 'src/sections/dashboard/file-manager/file-uploader';
import { useDialog } from 'src/hooks/use-dialog';
import { Alert, CircularProgress, SvgIcon } from '@mui/material';
import Upload01 from '@untitled-ui/icons-react/build/esm/Upload01';
import DownloadFiles from './DownloadFiles';
import FirebaseUsers from 'src/api/users';
import { User } from 'src/api/users/user-interface';
import toast, { Toaster } from 'react-hot-toast';

// Define the validation schema
const validationSchema = yup.object({
  nom: yup.string().required('Nom complet est requis'),
  entreprise: yup.string().required('Entreprise partenaire est requis'),
  projet: yup.string().required('Intitulé du projet est requis'),
  email: yup.string().email('Format email invalide').required('Addresse Email est requis'),
  // files: yup.mixed().required('Veuillez sélectionner un fichier'),
});

const firebaseNewUser = new FirebaseUsers();

export const SubmitForm: FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const uploadDialog = useDialog();

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      nom: '',
      entreprise: '',
      projet: '',
      email: '',
    },
    validationSchema: validationSchema, // Use the validation schema
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values);
      // handleUpload();
      try {
        await firebaseNewUser.createUser(values as unknown as User);
        toast.success('Utilisateur créé avec succès !');
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création du Utilisateur!');
        console.error('Erreur lors de la création du Utilisateur!: ', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('No files selected for upload');
      return;
    }

    const firebaseUsers = new FirebaseUsers();
    console.log('return upload files', firebaseUsers);

    try {
      await firebaseUsers.uploadFiles(formik.values.nom, files);
    } catch (error) {
      console.log('erorr' + error.message);

      toast.error('Error uploading files:', error.message);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: 'neutral.900',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        color: 'neutral.100',
        py: '120px',
        p: 4,
        my: 2,
        borderRadius: 2,
      }}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={3}
        >
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Nom complet"
              name="nom"
              required
              value={formik.values.nom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nom && Boolean(formik.errors.nom)}
              helperText={formik.touched.nom && formik.errors.nom}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Entreprise partenaire"
              name="entreprise"
              required
              value={formik.values.entreprise}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.entreprise && Boolean(formik.errors.entreprise)}
              helperText={formik.touched.entreprise && formik.errors.entreprise}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Intitulé du projet"
              name="projet"
              required
              value={formik.values.projet}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.projet && Boolean(formik.errors.projet)}
              helperText={formik.touched.projet && formik.errors.projet}
              size="small"
            />
          </Grid>
          <Grid
            container
            xs={12}
            spacing={4}
          >
            <Grid
              xs={12}
              md={8}
            >
              <TextField
                fullWidth
                required
                label="Addresse Email"
                name="email"
                type="email"
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid
              xs={12}
              md={4}
              alignSelf={'end'}
            >
              <Button
                sx={{
                  width: '100%',
                  py: 1.3,
                }}
                onClick={uploadDialog.handleOpen}
                startIcon={
                  <SvgIcon>
                    <Upload01 />
                  </SvgIcon>
                }
                color="info"
                variant="outlined"
              >
                Déposer ma candidature
              </Button>
              <FileUploader
                onClose={uploadDialog.handleClose}
                open={uploadDialog.open}
                onSelectFiles={(files) => {
                  console.log('files', files);
                  setFiles(files);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 6 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={formik.isSubmitting ? <CircularProgress size={12} /> : <Send01 />}
          >
            Valider
          </Button>
        </Box>
      </form>
    </Box>
  );
};

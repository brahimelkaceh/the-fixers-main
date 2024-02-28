import React from 'react';
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
import { Alert, SvgIcon } from '@mui/material';
import Upload01 from '@untitled-ui/icons-react/build/esm/Upload01';

// Define the validation schema
const validationSchema = yup.object({
  nom: yup.string().required('Nom complet est requis'),
  entreprise: yup.string().required('Entreprise partenaire est requis'),
  projet: yup.string().required('Intitulé du projet est requis'),
  email: yup.string().email('Format email invalide').required('Addresse Email est requis'),
  files: yup.mixed().required('Veuillez sélectionner un fichier'),
});

export const SubmitForm: FC = () => {
  const uploadDialog = useDialog();

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      nom: '',
      entreprise: '',
      projet: '',
      email: '',
      files: null,
    },
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
    validationSchema: validationSchema, // Use the validation schema
  });

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
                  // Update the Formik state with multiple selected files
                  formik.setFieldValue('files', files);
                }}
              />
            </Grid>
            {formik.touched.files && formik.errors.files && (
              <Alert severity="error">{formik.errors.files}</Alert>
            )}
          </Grid>
        </Grid>
        <Box sx={{ mt: 6 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Send01 />}
          >
            Valider
          </Button>
        </Box>
      </form>
    </Box>
  );
};

import type { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SubmitForm } from '../components/forms/form';

export const HomeCta: FC = () => (
  <Box
    sx={{
      backgroundColor: 'neutral.800',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      backgroundImage: 'url("/assets/gradient-bg.svg")',
      color: 'neutral.100',
      py: '120px',
    }}
    id={'form-section'}
  >
    <Container maxWidth="md">
      <Stack spacing={2}>
        <Typography
          align="center"
          color="inherit"
          variant="h3"
        >
          Start saving time today!
        </Typography>
        <Typography
          align="center"
          color="inherit"
          variant="subtitle2"
        >
          Not just a set of tools, the package includes ready-to-deploy conceptual applications
          written in JavaScript & TypeScript.
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <SubmitForm />
      </Stack>
    </Container>
  </Box>
);
import type { FC } from 'react';
import EyeIcon from '@untitled-ui/icons-react/build/esm/Eye';
import LayoutBottomIcon from '@untitled-ui/icons-react/build/esm/LayoutBottom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';

import { HomeCodeSamples } from './home-code-samples';
import FileDownloadButton from '../components/forms/FileDownloadButton';

export const HomeHero: FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        pt: '120px',
      }}
    >
      <Container maxWidth="lg">
        <Box maxWidth="sm">
          <Typography
            variant="h1"
            sx={{ mb: 2 }}
          >
            Let us worry about the&nbsp;
            <Typography
              component="span"
              color="primary.main"
              variant="inherit"
            >
              User Experience
            </Typography>
            , you focus on Developing.
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            A professional kit that comes with ready-to-use MUI components developed with one common
            goal in mind, help you build faster & beautiful applications.
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={1}
            sx={{ my: 3 }}
          >
            <Rating
              readOnly
              value={4.7}
              precision={0.1}
              max={5}
            />
            <Typography
              color="text.primary"
              variant="caption"
              sx={{ fontWeight: 700 }}
            >
              4.7/5
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              based on (70+ reviews)
            </Typography>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <FileDownloadButton />

            <Button
              // color="inherit"
              variant="contained"
              component={RouterLink}
              href={'#form-section'}
              startIcon={
                <SvgIcon fontSize="small">
                  <LayoutBottomIcon />
                </SvgIcon>
              }
            >
              Components
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            pt: '60px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              overflow: 'hidden',
              width: '100%',
              fontSize: 0,

              '& img': {
                borderTopLeftRadius: (theme) => theme.shape.borderRadius * 2.5,
                borderTopRightRadius: (theme) => theme.shape.borderRadius * 2.5,
                boxShadow: 16,
                width: '100%',
              },
            }}
          >
            <img src={'/assets/main-hero.png'} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

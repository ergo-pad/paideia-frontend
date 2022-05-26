import { Grid, Container, Box, Typography, Button } from '@mui/material'
import { DarkTheme } from "@theme/theme"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';

const perkTitleStyle = {
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: '133%',
  color: DarkTheme.palette.text.primary,
  textTransform: 'uppercase',
  fontFamily: '"Space Grotesk" !important',
  mt: '2px',
  mb: '16px',
}

const paragraphStyle = {
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '0.15px',
}

export default function Perks() {
  return (
    <>
      <Container sx={{ position: 'relative', flexGrow: 1, px: '24px', pl: { xs: '60px', md: '24px' } }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: '730px',
            width: '1467px',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
            zIndex: '-1',
            ml: '-24px',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Image
            src="/quote-bg.png"
            layout="fill"
            objectFit="contain"
            objectPosition="center top"
            quality={100}
          />
        </Box> 
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: '730px',
            width: '1467px',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
            zIndex: '-1',
            ml: '-24px',
            display: { xs: 'block', md: 'none' },
          }}
        >
          <Image
            src="/quote-small.png"
            layout="fill"
            objectFit="contain"
            objectPosition="center top"
            quality={100}
          />
        </Box>
        <Grid container sx={{ pt: '120px', pb: '40px' }}>
          <Grid item md={3}></Grid>
          <Grid item md={7}>
            <Typography sx={{
              fontFamily: '"Space Grotesk"',
              fontWeight: '400',
              fontSize: { xs: '24px', md: '33px' },
              lineHeight: { xs: '24px', md: '36px' },
            }}>
              Using our tools, individuals who don&apos;t have fair access to financial systems may take control and compete in a society that is imbalanced and stacked against them, without needing the approval of the wealthy or elite.
            </Typography>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
        <Grid container sx={{ pb: '120px' }}>
          <Grid item md={4}></Grid>
          <Grid item md={6}>
            <Grid container justifyContent="flex-end" rowSpacing={2} sx={{ borderTop: '1px solid white' }}>
              <Grid item md={6}>
                <Typography sx={{
                  fontFamily: '"Inter"',
                  fontSize: '10px',
                  fontWeight: '400',
                  lineHeight: '12px',
                  letterSpacing: '0.17px'
                }}>
                  Through Paideia, DAOs can distribute governance tokens, raise funds, manage their treasury, create proposals on expenditures or governance, have a forum for stakeholders to discuss all ideas and proposals, and easily deploy their funds to achieve their goals.
                </Typography>
              </Grid>
              <Grid item md={6} sx={{ textAlign: 'right' }}>
                <Typography sx={{
                  fontFamily: '"Inter"',
                  fontSize: '12px',
                  fontWeight: '400',
                  lineHeight: '16px',
                  letterSpacing: '0.17px',
                  textTransform: 'uppercase',
                  mb: '12px',
                }}>
                  Page 9. Paideia Whitepaper
                </Typography>
                <Button endIcon={<ArrowForwardIosIcon />} sx={{ color: '#FC9E4F' }}>
                  Read More
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </Container>
    </>
  )
}

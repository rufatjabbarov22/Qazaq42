import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './AboutUsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTractor } from '@fortawesome/free-solid-svg-icons';

const theme = createTheme();

const AboutUsPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ overflow: 'hidden' }}>
        {/* Parallax effect */}
        <Box
          sx={{
            backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.wallpaperscraft.ru/image/single/pole_trava_tropinka_124349_2560x1600.jpg)',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <Container maxWidth="md" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', padding: '20px' }}>
            <Typography variant="h3" component="h1" align="center" gutterBottom className="rotate-scale-up" color='#654321'>
              About Qazaq
            </Typography>
            <Grid container spacing={4}>
              {[
                { title: 'Our Mission', text: 'At Qazaq, we are dedicated to revolutionizing the field of earth scanning by leveraging the power of artificial intelligence. Our mission is to provide precise and efficient scanning services for various industries, ensuring that we help clients make informed decisions based on accurate subsurface data.' },
                { title: 'Focus on Azerbaijan', text: 'We are proud to operate in Azerbaijan, a country known for its vast and fertile land. Our earth scanning technology optimizes land use by identifying hidden resources and potential issues beneath the surface.' },
                { title: 'Artificial Intelligence in Earth Scanning', text: 'Qazaq\'s AI-powered systems analyze massive amounts of data from earth-scanning devices, providing real-time insights and accurate predictions. This allows industries to plan projects with precision, reducing risks and increasing efficiency.' },
                { title: 'Our Commitment to the Future', text: 'We are committed to refining our AI technology and developing advanced earth-scanning techniques to meet evolving industry needs. Our focus on innovation will benefit Azerbaijan and industries worldwide.' },
              ].map((section, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box sx={{ padding: '20px' }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: "#263d60" }}>
                      {section.title}
                    </Typography>
                    <Typography variant="body1" align="justify">
                      {section.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        
        <Container className="team-section">
          <Typography variant="h3" component="h2" className="team-title">
            Our Team
          </Typography>
          <Grid container spacing={3}>
            {[
              { name: 'Simara Kerimli', role: 'CEO', quote: 'Leading with vision and passion.', link: 'https://www.linkedin.com/in/simar%C9%99k%C9%99rimli/', img: 'https://ca.slack-edge.com/T0423U1MW21-U06GZL3HWJ0-dfb69c792ca9-512' },
              { name: 'Samir Ibrahimov', role: 'CTO', quote: 'Innovating for a better tomorrow.', link: 'https://www.linkedin.com/in/samiribrh/', img: 'https://ca.slack-edge.com/T0423U1MW21-U06GX6LL0AW-5c8b0814ecb1-512' },
              { name: 'Kamran Mahmudov', role: 'Project Manager', quote: 'Delivering projects with excellence.', link: 'https://www.linkedin.com/in/kamran-mahmudov-546532240/', img: 'https://ca.slack-edge.com/T0423U1MW21-U06HL084LD6-a32967ebed0d-512' },
              { name: 'Rufat Jabbarov', role: 'you know who I am', quote: 'Looking deep to build a better future.', link: 'https://www.linkedin.com/in/rufat-jabbarov-b73872310/', img: 'https://ca.slack-edge.com/T0423U1MW21-U06H6J3APNY-5a78d8002ca6-512' },
            ].map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box className="team-member">
                  <Link href={member.link} underline="none">
                    <img src={member.img} alt={`Team Member ${index + 1}`} className="team-photo" />
                    <Typography className="team-name">{member.name}</Typography>
                  </Link>
                  <Typography className="team-role">{member.role}</Typography>
                  <Typography className="team-quote">"{member.quote}"</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box sx={{ position: 'relative', margin: '50px 0', textAlign: 'center' }}>
          <Box sx={{ 
            width: '100%', 
            height: '10px',
            backgroundColor: 'black', 
            position: 'relative', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Box className="tractor-animation" sx={{ 
              position: 'absolute', 
              top: '-30px',
              left: '0',
              animation: 'moveTractor 10s linear infinite'
            }}>
              <FontAwesomeIcon icon={faTractor} size="3x" color="orange" />
            </Box>
          </Box>
        </Box>

        <Container sx={{ marginTop: '50px', textAlign: 'center' }}>
          <Typography variant="h3" component="h2" className="team-title">
            Our Partners
          </Typography>
          <Grid container spacing={3}>
            {[
              { name: 'Holberton School Azerbaijan', link: 'https://holbertonschool.com', img: 'https://img.stackshare.io/company/30738/default_1d45fcb881e6ba830afabf465d151e581c67442f.png' },
              { name: 'PASHA Holding', link: 'https://pasha-holding.az', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSyvAyptZxaGoX3LHCBjsrmigdVTsQAx_n-T-njG_VYIB3ScmMbl7AzU4n4w0yUxQk5_A&usqp=CAU' },
            ].map((partner, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Box className="partner">
                  <Link href={partner.link} underline="none">
                    <img src={partner.img} alt={`Partner ${index + 1}`} className="partner-photo" />
                    <Typography className="partner-name">{partner.name}</Typography>
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AboutUsPage;

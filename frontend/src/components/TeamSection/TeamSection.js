import React from 'react';
import './TeamSection.css';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const TeamSection = () => {
  return (
    <Container className="team-section1" maxWidth={false}>
  <Typography variant="h3" component="h2" className="team-title">
    Our Team
  </Typography>
  <Grid container spacing={3} justifyContent="center">
    {/* Team Member 1 */}
    <Grid item xs={12} sm={6} md={3}>
      <Box className="team-member">
        <Link href="https://www.linkedin.com/in/simar%C9%99k%C9%99rimli/" underline="none">
          <img
            src="https://ca.slack-edge.com/T0423U1MW21-U06GZL3HWJ0-dfb69c792ca9-512"
            alt="Team Member 1"
            className="team-photo"
          />
          <Typography className="team-name">Simara Kerimli</Typography>
        </Link>
        <Typography className="team-role">CEO</Typography>
        <Typography className="team-quote">"Leading with vision and passion."</Typography>
      </Box>
    </Grid>
    {/* Team Member 2 */}
    <Grid item xs={12} sm={6} md={3}>
      <Box className="team-member">
        <Link href="https://www.linkedin.com/in/samiribrh/" underline="none">
          <img
            src="https://ca.slack-edge.com/T0423U1MW21-U06GX6LL0AW-5c8b0814ecb1-512"
            alt="Team Member 2"
            className="team-photo"
          />
          <Typography className="team-name">Samir Ibrahimov</Typography>
        </Link>
        <Typography className="team-role">CTO</Typography>
        <Typography className="team-quote">"Innovating for a better tomorrow."</Typography>
      </Box>
    </Grid>
    {/* Team Member 3 */}
    <Grid item xs={12} sm={6} md={3}>
      <Box className="team-member">
        <Link href="https://www.linkedin.com/in/kamran-mahmudov-546532240/" underline="none">
          <img
            src="https://ca.slack-edge.com/T0423U1MW21-U06HL084LD6-a32967ebed0d-512"
            alt="Team Member 3"
            className="team-photo"
          />
          <Typography className="team-name">Kamran Mahmudov</Typography>
        </Link>
        <Typography className="team-role">Project Manager</Typography>
        <Typography className="team-quote">"Delivering projects with excellence."</Typography>
      </Box>
    </Grid>
    {/* Team Member 4 */}
    <Grid item xs={12} sm={6} md={3}>
      <Box className="team-member">
        <Link href="https://www.linkedin.com/in/rufat-jabbarov-b73872310/" underline="none">
          <img
            src="https://ca.slack-edge.com/T0423U1MW21-U06H6J3APNY-5a78d8002ca6-512"
            alt="Team Member 4"
            className="team-photo"
          />
          <Typography className="team-name">Rufat Jabbarov</Typography>
        </Link>
        <Typography className="team-role">"You know who I am"</Typography>
        <Typography className="team-quote">"Looking deep to build a better future."</Typography>
      </Box>
    </Grid>
  </Grid>
</Container>

  );
};

export default TeamSection;
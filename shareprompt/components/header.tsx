import React from 'react';
import { Typography, Box } from '@mui/material';

const Heading = () => {
  return (
    <Box textAlign="center" my={4}>
      <Typography variant="h2" component="h1" sx={{ fontWeight: "600", fontSize: { xs: '2rem', md: '3rem' } }} gutterBottom>
        Explore the Tapestry of Minds
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: "500", fontSize: { xs: '1.5rem', md: '2rem' } }} color="orange">
        Where Thoughts Unfold and Ideas Converge
      </Typography>
      <Typography variant="subtitle1" color="lightgray" my={2} sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
        Embark on a captivating journey with <code >'Explore the Tapestry of Minds,' where ideas converge in a vibrant harmony.</code> This digital platform transcends conventional thinking, fostering innovation and connection. Dive into a landscape of diverse thoughts, discovering global perspectives and contributing your unique insights. Join the intellectual voyage, shaping the future one idea at a time in a community where imagination weaves the fabric of progress.
      </Typography>
    </Box>
  );
};

export default Heading;

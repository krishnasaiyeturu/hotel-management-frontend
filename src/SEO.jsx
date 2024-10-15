import React from 'react';
import { Helmet } from 'react-helmet';

export const SEO = () => {
  return (
    <Helmet>
      <title>Aspen Grand Hotels in LaPorte</title>
      <meta name="description" content="Discover Aspen Grand Hotels in La Porte. Enjoy comfortable accommodations, top-notch amenities, and exceptional service. Book your stay today!" />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href="https://www.aspenl.com/" />

      <meta property="og:title" content="Aspen Grand Hotels in La Porte" />
      <meta property="og:description" content="Book your stay at Aspen Grand Hotels in La Porte for a memorable experience." />
      <meta property="og:image" content="/src/assets/ASPENLOGO.jpg" />
      <meta property="og:url" content="https://www.aspenl.com/" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Aspen Grand Hotels in La Porte" />
      <meta name="twitter:description" content="Comfortable accommodations and exceptional service await you at Aspen Grand Hotels." />
      <meta name="twitter:image" content="/src/assets/ASPENLOGO.jpg" />
    </Helmet>
  );
};

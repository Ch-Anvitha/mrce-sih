import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "Internal SIH 2026 | MRCE", 
  description = "Participate in the Internal Smart India Hackathon 2026 at Malla Reddy College of Engineering. Form a team, build innovative solutions, and represent MRCE nationally.",
  type = "website"
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="MRCE Internal SIH 2026" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

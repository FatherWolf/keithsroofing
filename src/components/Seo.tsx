import React from 'react';
import { Helmet } from 'react-helmet';

type SeoProps = { title: string; description: string };

export function Seo({ title, description }: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://keithsroofing.com" />
    </Helmet>
  );
}

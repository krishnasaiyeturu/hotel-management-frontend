import React from 'react';
import Head from 'react-helmet';
import AspenLogo from './assets/ASPENLOGO.jpg';

const DOMAIN = 'https://www.aspenl.com/';
const MAIN_KEYWORDS = 'hotels, business, rooms, laporte, aspen, texas';

const DEFAULT_TITLE = 'Aspen Grand Hotels in LaPorte';
const DEFAULT_DESCRIPTION = 'Welcome to ASPEN GRAND HOTELS, where elegance meets comfort in a stunning blend of modern luxury and timeless charm.';
const DEFAULT_IMAGE_CARD = AspenLogo;
const FAVICON_SOURCE = AspenLogo;
const POSTFIX_TITLE = ' - My Website'

export const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  link,
  keywords,
  imageCard = DEFAULT_IMAGE_CARD,
  largeTwitterCard,
  addPostfixTitle,
  noIndex,
  children
}) => {

  let metaTitle

  if (addPostfixTitle) {
    metaTitle = title + POSTFIX_TITLE
  } else {
    metaTitle = title
  }

  const metaDesc = description ?? DEFAULT_DESCRIPTION.slice(0, 90)
  const metaLink = DOMAIN + link

  const metaKeywords = keywords?.length
    ? MAIN_KEYWORDS + ", " + keywords
    : MAIN_KEYWORDS

  let metaImageCard

  if (imageCard) {
    if (imageCard.startsWith("https")) {
      metaImageCard = imageCard
    } else {
      metaImageCard = DOMAIN + imageCard
    }
  } else {
    metaImageCard = DEFAULT_IMAGE_CARD
  }

  const metaRobots = noIndex ? "noindex, nofollow" : "index, follow"

  const twitterCardType = largeTwitterCard ? "summary_large_image" : "summary"

  return (
    <Head>
      <html lang="en" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={metaLink} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={metaRobots} />
      <link rel="icon" content={FAVICON_SOURCE} />

      {/* OG Tags */}
      {/* https://ogp.me/ */}
      <meta property="og:url" title={metaLink} />
      <meta property="og:title" title={metaTitle} />
      <meta property="og:description" title={metaDesc} />
      <meta property="og:type" content="..." />
      <meta property="og:image" content={metaImageCard} />

      {/* Twitter tags */}
      {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started */}
      <meta property="twitter:site" title="twitter username of website" />
      <meta property="twitter:title" title={metaTitle} />
      <meta property="twitter:description" title={metaDesc} />
      <meta
        property="twitter:creator"
        content="twitter username of webpage content"
      />
      <meta property="twitter:card" content={twitterCardType} />
      <meta property="twitter:image" content={metaImageCard} />

      {/* https://moz.com/blog/meta-referrer-tag */}
      <meta name="referrer" content="origin-when-crossorigin" />

      {children}
    </Head>
  );
};

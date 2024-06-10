/* eslint-disable no-dupe-keys */
import '../styles/index.scss';
import { Footer, Navbar, PromotionalBanner } from '@/components';
import { Providers } from '@/components/Providers';
import GoogleAnalytics from '@/services/GoogleAnalytics/GoogleAnalytics';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import StructuredData from '@/components/StructuredData';
import { getImageURL } from '@/components/utils';

const poppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST_URL),
  title: 'Discover and Experience Unforgettable Moments | Yapsody Events',
  description:
    'Find the best live events, concerts, sports, and more near you. Join us for unforgettable experiences.',
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/apple-touch-icon.png'],
    shortcut: ['/apple-touch-icon.png'],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Discover and Experience Unforgettable Moments | Yapsody Events',
    description: 'Yapsody Events - Discover Events From All Over The World',
  },
};

const logoUrl = getImageURL({
  key: 'logo/Logo_Light.jpg',
  width: 1000,
  height: 1000,
});

const organisationSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url: 'https://yapsody.events/',
  logo: logoUrl,
  name: 'Yapsody LLC',
  sameAs: [
    'https://www.facebook.com/yapsodyllc/',
    'https://www.instagram.com/yapsody/',
    'https://www.linkedin.com/company/yapsody/',
    'https://twitter.com/@Yapsody',
    'https://www.youtube.com/yapsody/',
    'https://www.pinterest.com/yapsody/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1 (844) 311-2755',
    contactType: 'Customer Service',
    email: 'support@yapsody.com',
    areaServed: 'US',
    availableLanguage: 'English',
  },
};

const websiteSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Yapsody Events',
  url: 'https://yapsody.events/',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_APPLICATION_ENVIRONMENT === 'production' && (
          <Script
            id="ms-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "j11ovroz1n");
          `,
            }}
          />
        )}
        <StructuredData
          data={organisationSchemaData}
          dataKey="Organisation-Data"
        />
        <StructuredData data={websiteSchemaData} dataKey="Website-Data" />
      </head>
      <body className={poppinsFont.className}>
        <Providers>
          <Suspense>
            <GoogleAnalytics
              GA_MEASUREMENT_ID={process.env.NEXT_GOOGLE_ANAYLTICS_CODE}
            />
          </Suspense>
          <PromotionalBanner />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

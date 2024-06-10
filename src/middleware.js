import { NextResponse } from 'next/server';
import { getEventCountries } from '@/services';

async function fetchCountries() {
  const data = await getEventCountries({});
  const countriesList = data?.data?.map((country) => {
    return {
      abb: country?.abbreviations?.split(','),
      url_params: country?.url_params,
    };
  });
  return countriesList || [];
}

export async function middleware(request) {
  const response = NextResponse.next();
  const headersList = request.headers;
  const pathname = request?.nextUrl?.pathname;

  response.cookies.set('x-url', `${pathname}`);

  const userLocationCountry =
    headersList.get('cloudfront-viewer-country-name') || 'united-states';

  const countries = await fetchCountries();

  const country = countries?.find((country) =>
    country?.abb?.includes(
      userLocationCountry?.trim()?.toLowerCase()?.replace(/ /g, '-')
    )
  )?.url_params;

  if (
    userLocationCountry &&
    country &&
    !pathname?.includes('country') &&
    !pathname?.includes('city')
  ) {
    return NextResponse.redirect(new URL(`/country/${country}`, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/', '/country/:path*'],
};

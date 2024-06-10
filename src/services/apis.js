const API_ROOT = process.env.NEXT_PUBLIC_BASE_API_URL;

const apiRoutes = {
  events: API_ROOT + '/event-discovery/events',
  events_categories: API_ROOT + '/event-discovery/events/categories',
  artists: API_ROOT + '/event-discovery/artists',
  banners: API_ROOT + '/event-discovery/promotions',
  discovery_pages: API_ROOT + '/event-discovery/discoveries',
  countries: API_ROOT + '/event-discovery/countries',
  city_events: API_ROOT + '/event-discovery/events/location/city',
  country_events: API_ROOT + '/event-discovery/events/location/country',
};

const defaultSearchQuery = {
  page_no: 1,
  page_size: 60,
  sort_order: 'asc',
  sort_by: 'start_date',
};

export const createQueryString = (params) => {
  return `?${Object.keys(params)
    .map((key) => (params[key] ? key + '=' + params[key] : ''))
    .filter(Boolean)
    .join('&')}`;
};

const defaultCategoryQuery = {
  sort_by: 'category_order',
  sort_order: 'asc',
};

export const getEventCategories = async () => {
  const url =
    `${apiRoutes.events_categories}` +
    createQueryString({ ...defaultCategoryQuery });

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  const data = await response.json();

  return data.data;
};

export const getEvents = async ({ query, setLoading, onSuccess, onError }) => {
  const result = {
    data: undefined,
    error: undefined,
  };
  setLoading?.(true);
  try {
    const url =
      `${apiRoutes.events}` +
      createQueryString({ ...defaultSearchQuery, ...query });
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    const data = await response.json();

    if (response.ok && response.status < 400) {
      result.data = data?.data?.events;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    setLoading?.(false);
    return result;
  }
};

export const getEventsCount = async ({ query, onSuccess, onError }) => {
  const result = {
    data: undefined,
    error: undefined,
  };

  try {
    const url = `${apiRoutes.events}/count` + createQueryString(query);
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    if (response.ok && response.status < 400) {
      result.data = data?.data?.count;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    return result;
  }
};

export const getEventById = async ({ id, onSuccess, onError } = {}) => {
  const result = {
    data: undefined,
    error: undefined,
  };

  try {
    const response = await fetch(`${apiRoutes.events}/${id}`, {
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    if (response.ok && response.status < 400) {
      result.data = data?.data?.event;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    return result;
  }
};

const bannerDefaultSearchQuery = {
  page_no: 1,
  page_size: 21,
  sort_order: 'asc',
};

export const getEventBanners = async ({
  query,
  setLoading,
  onSuccess,
  onError,
}) => {
  const result = {
    data: undefined,
    error: undefined,
  };
  setLoading?.(true);
  try {
    const url =
      `${apiRoutes.banners}` +
      createQueryString({ ...bannerDefaultSearchQuery, ...query });

    const response = await fetch(url);
    const data = await response.json();
    if (response.ok && response.status < 400) {
      result.data = data?.data?.promotions;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    setLoading?.(false);
    return result;
  }
};

const defaultDiscoveryPagesSearchQuery = {
  page_no: 1,
  page_size: 102,
  sort_order: 'asc',
  sort_by: 'start_date',
};

export const getDiscoveryEventsData = async ({
  slug,
  setLoading,
  onSuccess,
  onError,
  query,
}) => {
  const result = {
    data: undefined,
    error: undefined,
  };
  setLoading?.(true);
  try {
    const url =
      `${apiRoutes.discovery_pages}/${slug}` +
      createQueryString({ ...defaultDiscoveryPagesSearchQuery, ...query });

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && response.status < 400) {
      result.data = data?.data;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    setLoading?.(false);
    return result;
  }
};

export const getDiscoveryEventsCountData = async ({
  slug,
  onSuccess,
  onError,
  query,
}) => {
  const result = {
    data: undefined,
    error: undefined,
  };

  try {
    const url =
      `${apiRoutes.discovery_pages}/${slug}/count` +
      createQueryString({ ...defaultDiscoveryPagesSearchQuery, ...query });

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    if (response.ok && response.status < 400) {
      result.data = data?.data?.count;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    return result;
  }
};

const countryCitiesDefaultSearchQuery = {
  sort_order: 'asc',
};

export const getEventCountries = async ({
  query,
  setLoading,
  onSuccess,
  onError,
}) => {
  const result = {
    data: undefined,
    error: undefined,
  };
  setLoading?.(true);
  try {
    const url =
      `${apiRoutes.countries}` +
      createQueryString({ ...countryCitiesDefaultSearchQuery, ...query });

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && response.status < 400) {
      result.data = data?.data?.countries;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    setLoading?.(false);
    return result;
  }
};

export const getCountryCities = async ({
  countryName,
  query,
  setLoading,
  onSuccess,
  onError,
}) => {
  const result = {
    data: undefined,
    error: undefined,
  };
  setLoading?.(true);
  try {
    const url =
      `${apiRoutes.countries}/${countryName}/cities` +
      createQueryString({ ...countryCitiesDefaultSearchQuery, ...query }) +
      '&' +
      'count=0' +
      '&' +
      'top_cities=0';

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && response.status < 400) {
      result.data = data?.data?.cities;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    setLoading?.(false);
    return result;
  }
};

const defaultCountryCitiesEventsQuery = {
  page_no: 1,
  page_size: 60,
  sort_order: 'asc',
  sort_by: 'start_date',
};

export const getCitiesEvents = async ({
  cityName,
  query,
  setLoading,
  onSuccess,
  onError,
}) => {
  const result = {
    data: undefined,
    error: undefined,
  };
  setLoading?.(true);
  try {
    const url =
      `${apiRoutes.city_events}/${cityName}` +
      createQueryString({ ...defaultCountryCitiesEventsQuery, ...query });

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    if (response.ok && response.status < 400) {
      result.data = data?.data?.events;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    setLoading?.(false);
    return result;
  }
};

export const getCitiesEventsCount = async ({
  cityName,
  query,
  onSuccess,
  onError,
}) => {
  const result = {
    data: undefined,
    error: undefined,
  };

  try {
    const url =
      `${apiRoutes.city_events}/${cityName}/count` + createQueryString(query);
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    if (response.ok && response.status < 400) {
      result.data = data?.data?.eventsCount;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    return result;
  }
};

export const getCountriesEvents = async ({
  countryName,
  query,
  setLoading,
  onSuccess,
  onError,
}) => {
  const result = {
    data: undefined,
    error: undefined,
  };
  setLoading?.(true);
  try {
    const url =
      `${apiRoutes.country_events}/${countryName}` +
      createQueryString({ ...defaultCountryCitiesEventsQuery, ...query });
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    if (response.ok && response.status < 400) {
      result.data = data?.data?.events;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    setLoading?.(false);
    return result;
  }
};

export const getCountriesEventsCount = async ({
  countryName,
  query,
  onSuccess,
  onError,
}) => {
  const result = {
    data: undefined,
    error: undefined,
  };

  try {
    const url =
      `${apiRoutes.country_events}/${countryName}/count` +
      createQueryString(query);
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    if (response.ok && response.status < 400) {
      result.data = data?.data?.eventsCount;
      onSuccess?.(result.data);
    } else {
      result.error = data?.error || {};
      onError?.(data?.error);
    }
  } finally {
    return result;
  }
};

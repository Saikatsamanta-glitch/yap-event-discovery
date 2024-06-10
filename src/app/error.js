'use client';

import EmptyState from '@/components/EmptyState';

export default function ErrorPage() {
  return (
    <EmptyState
      title="Something Went Wrong"
      subtitle="Please try reloading the page"
      illustration="no-search-result"
      buttonTitle="Reload"
      onClick={() => {
        location.reload();
      }}
    />
  );
}

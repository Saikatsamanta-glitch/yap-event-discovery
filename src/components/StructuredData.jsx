export default function StructuredData({ data, dataKey = 'structured-data' }) {
  return (
    <script
      key={dataKey}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

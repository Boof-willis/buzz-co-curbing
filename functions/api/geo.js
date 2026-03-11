export function onRequest(context) {
  return new Response(
    JSON.stringify({
      country: context.request.headers.get('cf-ipcountry'),
      region: context.request.headers.get('cf-region'),
      city: context.request.headers.get('cf-ipcity'),
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

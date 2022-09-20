export async function fetchJson(
  resource: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<unknown> {
  const response = await fetch(resource, init);
  const data = (await response.json()) as unknown;

  return data;
}

export async function fetcher(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch car info");
  }
  return data;
}

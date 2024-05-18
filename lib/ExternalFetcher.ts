// lib/fetcher.ts
const externalFetcher = async (url: string) => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
        'X-RapidAPI-Host': 'car-api2.p.rapidapi.com',
      },
    };
  
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
    return response.json();
  };
  
  export default externalFetcher;
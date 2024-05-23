export const externalFetcher = async <T>(url: string): Promise<T> => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string,
      "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error("Error in externalFetcher:", error);
    throw error;
  }
};
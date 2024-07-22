const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
};

export async function getData(url) {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        `Failed to fetch content from ${url}. Status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return error;
  }
}

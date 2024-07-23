const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
};
export const fetchMovies = async (query) => {
  if (!query) return [];

  try {
    const response = await fetch(
      `${process.env.REACT_APP_MOVIE_HOST}/search/movie?query=${query}`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

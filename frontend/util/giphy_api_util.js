export const fetchSearchGiphys = ({searchTerm, offset, limit}) => {
  return $.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&offset=${offset}&limit=${limit}&rating=pg-13`,
    dataType: 'json'
  });
};
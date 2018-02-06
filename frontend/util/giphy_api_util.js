export const fetchSearchGiphys = ({searchTerm, offset, limit}) => {
  return $.ajax({
    method: 'GET',
    url: `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&offset=${offset}&limit=${limit}`,
    dataType: 'json'
  });
};

// keep local state for search term and offset
// if search term is the same then load more, if the search term changes then you set 
// the offset back to zero
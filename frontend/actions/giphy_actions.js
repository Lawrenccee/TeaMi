import * as GiphyApi from '../util/giphy_api_util';

export const RECEIVE_GIPHYS = "RECEIVE_GIPHYS";
export const CLEAR_GIPHYS = "CLEAR_GIPHYS";

export const receiveGiphys = (giphys) => ({
  type: RECEIVE_GIPHYS,
  giphys,
});

export const clearGiphys = () => ({
  type: CLEAR_GIPHYS,
});

export const fetchSearchGiphys = ({ searchTerm, offset, limit }) => 
  dispatch => (
  GiphyApi.fetchSearchGiphys({ searchTerm, offset, limit })
    .then((giphys) => dispatch(receiveGiphys(giphys.data)))
);
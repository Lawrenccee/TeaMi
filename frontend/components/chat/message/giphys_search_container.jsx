import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GiphysSearch from './giphys_search';
import { fetchSearchGiphys, clearGiphys } from '../../../actions/giphy_actions';

const mapStateToProps = state => ({
  giphys: state.entities.giphys,
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => {
  return { 
    fetchSearchGiphys: ({ searchTerm, limit, offset }) => ( 
      dispatch(fetchSearchGiphys({ searchTerm, limit, offset })) 
    ),
    clearGiphys: () => dispatch(clearGiphys()),
  };
};

export default withRouter(
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )(GiphysSearch)
);

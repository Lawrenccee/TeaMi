import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearChatHighlight } from '../../actions/ui_actions';
import Nav from './nav';

const mapStateToProps = (state, ownProps) => ({

});

const mapDisptachToProps = (dispatch, ownProps) => ({
  clearChatHighlight: () => dispatch(clearChatHighlight()),
});

export default withRouter(
  connect(
    null,
    mapDisptachToProps
  )(Nav)
);
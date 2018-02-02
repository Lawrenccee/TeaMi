import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ChatList from './chat_list';
import { fetchChats } from '../../../actions/chat_actions';

const mapStateToProps = (state, ownProps) => ({
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatList)
);
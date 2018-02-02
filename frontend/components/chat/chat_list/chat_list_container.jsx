import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ChatList from './chat_list';
import { fetchChats } from '../../../actions/chat_actions';
import { selectAllChats } from '../../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  chats: selectAllChats(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChats: () => dispatch(fetchChats())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatList)
);
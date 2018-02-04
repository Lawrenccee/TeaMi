import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ChatListItem from './chat_list_item';
import { receiveChatHighlight } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => ({
  chatHighlight: state.ui.chatHighlight,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  receiveChatHighlight: (chatId) => dispatch(receiveChatHighlight(chatId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatListItem)
);
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateChat } from '../../../actions/chat_actions';
import ChatInfo from './chat_info';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateChat: ({ chat, members }) => dispatch(updateChat({ chat, members })),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ChatInfo)
);
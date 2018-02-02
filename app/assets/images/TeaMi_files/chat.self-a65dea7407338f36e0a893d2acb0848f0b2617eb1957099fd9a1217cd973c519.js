App.chat = (chat_id, reactReceive) => { 
  App.cable.subscriptions.create ({ channel: "ChatChannel", chat_id: chat_id}, {
    connected: function() {
      // Called when the subscription is ready for use on the server
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
    },

    received: function(data) {
      // Called when there's incoming data on the websocket for this channel
      // reactReceive is a function set in the react component to handle the data received
      // when the stuff is done.
      reactReceive(data); // data will be in JSON form, so either receive it
      // or just fetch the chat again after data is received to update view...
    },

    speak: function(message) {
      return this.perform('speak', {
        message: message
      });
    }
  });
};

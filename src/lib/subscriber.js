import io from "socket.io-client";

const SERVER = process.env.REACT_APP_Q_SERVER || "https://eivy-q-server.herokuapp.com";

/** Class representing a subscriber instance to the Queue. */
class Q {
  constructor(q) {
    // q is a socket.io namespace
    this.q = q;
    this.sockets = [];
  }

  /**
   * This function helps us scubscribe
   * @param event {string} - indicating the event name (socket.io room in actuality)
   * @param callback {function} - Callback to execute on hearing the subscribed event
   */
  subscribe(event, callback) {
    //console.log('in the subscribe with event: ', event, 'callback', callback);
    // event is a socket.io room
    // We use it as the key to the sockets object
    // as well as the name of the room that socket.io manages.
    this.sockets[event] = io.connect(`${SERVER}/${this.q}`);
    this.sockets[event].emit("subscribe", event, (err, status) => {
      if (err) {
        console.error(err);
      } else {
        console.log(status);
      }
    });
    this.sockets[event].on("trigger", callback);
  }

  // Return a list of all available events (rooms) from the server
  list() {}

  subscriptions() {
    return Object.keys(this.sockets);
  }
}

export default Q;


/** Class representing a subscriber instance to the Queue. */
console.log('mocked subscriber required');

class Q {
  constructor(q) {
    this.events = {};
  }

  subscribe(event, callback) {
    if(!this.events[event]){
      this.events[event] = []
    }
    this.events[event].push(callback);
    // so now we have this.events as an object with keys of the event name
    // where each event key is an array of callback functions that are subscribed to the event:
    // e.g. {'create':[callback1, callback2]}
    // so
    // when the Dashboard does this:
    // 
    /* (client is the subscriber module)
    client.subscribe("create", payload => {
      this.updateActions(payload.payload);
    });
    // then the events object looks like this:
    this.events => {
      "create": [
        (payload => {
          this.updateActions(payload.payload);
        })
      ]
    }
    // so when we want to mock a "create" event
    // we can loop through this.events["create"] and run all the functions with the payload
    */
  }

  // Return a list of all available events (rooms) from the server
  list() {}

  subscriptions() {
    return Object.keys(this.sockets);
  }

  emit(event, payload){

    // do a fake emit for testing
    // look up all the subscribe functions registered for event
    // call the callback with the payload
    console.log('mocking socket emit', event, payload);
    if(!this.events[event]){ return }
    this.events[event].forEach(callback => {
      console.log('calling callback with payload', payload);
      callback(payload);
    });
  }
}

export default Q;

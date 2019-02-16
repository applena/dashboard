import React from "react";
// import io from 'socket.io-client';
import ClientConnection from "./lib/subscriber";

const client = new ClientConnection("database");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: []
    };

    client.subscribe("create", payload => {
      this.updateActions(payload);
    });
  }

  //[collection: 'teams', id:'123', actio:'create']
  updateActions = data => {
    this.setState({ actions: [...this.state.actions, data] });
  };

  render() {
    return (
      <>
        <ul>
          {this.state.actions.map((action, idx) => (
            <li key={idx}>
              {action.collection} : {action.action} : {action.idx}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Dashboard;

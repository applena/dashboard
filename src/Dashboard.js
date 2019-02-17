import React from "react";
import ClientConnection from "./lib/subscriber";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: []
    };
    this.client = new ClientConnection("database");

    this.client.subscribe("create", payload => {
      console.log('maypload', payload);
      this.updateActions(payload.payload);
    });

    this.client.subscribe("update", payload => {
      this.updateActions(payload.payload);
    })

    this.client.subscribe("delete", payload => {
      this.updateActions(payload.payload);
    })
  }

  //[collection: 'teams', id:'123', actio:'create']
  updateActions = data => {
    console.log('updating the actions state in dashboard', data);
    this.setState({ actions: [...this.state.actions, data] });
  };

  render() {
    console.log('state',this.state)
    return (
      <>
        <ul>
          {this.state.actions.map((action, idx) => (
            <li key={idx}>
              {action.collections} : {action.action} : {action.id}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Dashboard;

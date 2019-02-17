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

    client.subscribe("update", payload => {
      this.updateActions(payload);
    })

    client.subscribe("delete", payload => {
      this.updateActions(payload);
    })
  }

  // deleteActions = data => {
  //   let newArr = [];
  //   console.log('updating a single recrod in the dashboard', data);
  //   this.state.actions.filter(record => {
  //     if(record.id !== data.id){
  //       newArr.push(record);
  //     }
  //   });
  //   this.setState({actions: newArr});
  // }

  // changeActions = data => {
  //   let newArr = [];
  //   console.log('updating a single recrod in the dashboard', data);
  //   this.state.actions.map(record => {
  //     if(record.id === data.id){
  //       record = data;
  //     }
  //     newArr.push(record);
  //   });
  //   this.setState({actions: newArr});
  // }

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

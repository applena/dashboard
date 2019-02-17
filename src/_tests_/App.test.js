import React from 'react';
import ReactDOM from 'react-dom';

jest.mock('../lib/subscriber');
import App from '../App';
import Dashboard from '../Dashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe ('dashboard', () => {
  
  it('changes state when it hears a "create" event', ()=> {
    const payload = {messageHistroy:[], payload:{ collections:'bob', action: "create", id: 1 }};

    let component = mount(
      <Dashboard />
    );

    const dashboard = component.instance();

    dashboard.client.emit('create', payload);
    expect(component.state('actions')).toEqual([{ collections:'bob', action: "create", id: 1 }]);
  });

  it('updates the rendered log when it hear a "create" event', (done)=> {
    const payload = {messageHistroy:[], payload:{ collections:'bob', action: "create", id: 1 }}
    

    let component = mount(
      <Dashboard />
    );

    const dashboard = component.instance();

    dashboard.client.emit('create', payload);

    setTimeout(()=>{
      expect(component.find("ul").text()).toEqual('bob : create : 1');
      done();
    }, 1000);
  });

  it('changes state when it hears a "update" event', ()=> {
    const payload = {messageHistroy:[], payload:{ collections:'bob', action: "create", id: 1 }};
    const payloadUp = {messageHistroy:[], payload:{collections:'notBob', action:'update', id:1 }};

    let component = mount(
      <Dashboard />
    );

    const dashboard = component.instance();

    dashboard.client.emit('create', payload);
    dashboard.client.emit('update', payloadUp);
    expect(component.state('actions')[1]).toEqual({ collections:'notBob', action: "update", id: 1 });
  });

  it('updates the rendered log when it hear a "update" event', (done)=> {
    const payload = {messageHistroy:[], payload:{ collections:'bob', action: "create", id: 1 }};
    const payloadUp = {messageHistroy:[], payload:{collections:'notBob', action:'update', id:1 }};

    let component = mount(
      <Dashboard />
    );

    const dashboard = component.instance();

    dashboard.client.emit('create', payload);
    dashboard.client.emit('update', payloadUp);
    setTimeout(()=>{
      expect(component.find("ul").text()).toEqual('bob : create : 1notBob : update : 1');
      done();
    }, 1000);
  });

  it('changes state when it hears a "delete" event', ()=> {
    const payload = {messageHistroy:[], payload:{ collections:'bob', action: "create", id: 1 }};
    const payloadUp = {messageHistroy:[], payload:{collections:'bob', action:'delete', id:1 }};

    let component = mount(
      <Dashboard />
    );

    const dashboard = component.instance();

    dashboard.client.emit('create', payload);
    dashboard.client.emit('delete', payloadUp);
    expect(component.state('actions')[1]).toEqual({ collections:'bob', action: "delete", id: 1 });
  });

  it('updates the rendered log when it hear a "delete" event', (done)=> {
    const payload = {messageHistroy:[], payload:{ collections:'bob', action: "create", id: 1 }};
    const payloadUp = {messageHistroy:[], payload:{collections:'notBob', action:'delete', id:1 }};

    let component = mount(
      <Dashboard />
    );

    const dashboard = component.instance();

    dashboard.client.emit('create', payload);
    dashboard.client.emit('delete', payloadUp);
    setTimeout(()=>{
      expect(component.find("ul").text()).toEqual('bob : create : 1notBob : delete : 1');
      done();
    }, 1000);
  });
});

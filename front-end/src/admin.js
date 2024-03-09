import ReactDOM from 'react-dom/client';
import React, { useState } from "react";
import "./style.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from 'react-router-dom';
import $ from 'jquery';
let title = "Cultural Programmes Collection Website";

const fakeData_Event = [{"ID":1,"name":"Errol","price":32,"quota":45},
{"ID":2,"name":"Bobbe","price":71,"quota":9},
{"ID":3,"name":"Pasquale","price":19,"quota":36},
{"ID":4,"name":"Maridel","price":92,"quota":88},
{"ID":5,"name":"Arthur","price":47,"quota":99},
{"ID":6,"name":"Joleen","price":97,"quota":15},
{"ID":7,"name":"Jeanne","price":31,"quota":65},
{"ID":8,"name":"Rachel","price":8,"quota":33},
{"ID":9,"name":"Hildagarde","price":68,"quota":34},
{"ID":10,"name":"Glenn","price":86,"quota":74}]

const fakeData_User = [{
  "ID": 1,
  "username": "lfeary0",
  "password": "sM9>?S_LN",
  "isAdmin": false
}, {
  "ID": 2,
  "username": "ecoan1",
  "password": "kD0!T=yOzH*3t?o",
  "isAdmin": false
}, {
  "ID": 3,
  "username": "kcroux2",
  "password": "sA4|Z6<ur~0&}%",
  "isAdmin": true
}, {
  "ID": 4,
  "username": "mwolfenden3",
  "password": "aW2<HRqEa8iw~4~",
  "isAdmin": false
}, {
  "ID": 5,
  "username": "lwilcock4",
  "password": "rW5\\/~%T+ad!uX6O",
  "isAdmin": false
}, {
  "ID": 6,
  "username": "fsanchis5",
  "password": "qX0)tOHY",
  "isAdmin": true
}, {
  "ID": 7,
  "username": "vdaulton6",
  "password": "pQ5@kQ)j8tM8",
  "isAdmin": true
}, {
  "ID": 8,
  "username": "cbollen7",
  "password": "yG1.4$S5Iknm\"th",
  "isAdmin": false
}, {
  "ID": 9,
  "username": "avasilchikov8",
  "password": "uL0|S6/qQ{lWH",
  "isAdmin": true
}, {
  "ID": 10,
  "username": "ebyles9",
  "password": "rR9+xqh5D+i~",
  "isAdmin": false
}]

export default class Admin extends React.Component{
    render() {
       return (
        <div style={{ backgroundColor: "#FBE8A6", minHeight: "100vh"}}>
          <div className='row' style={{width: "100%"}}>
            <Logout onLogout={this.props.onLogout}/>
            <div className='col-sm-1'></div>
            <h1 className='col-sm-8' style={{textAlign: "center", marginTop: 0}}>{title}</h1>
          </div>
          <h1 style={{width: "100%", textAlign: "center", marginTop: 30}}>Admin Dashboard</h1>
          <br />
          <NavTable />
        </div>
      )
    }
}

class Logout extends React.Component{

  render() {
    return (
      <button className='col-sm-1 btn btn-primary' style={{backgroundColor: "#303C6C"}} onClick={() => this.props.onLogout()}>Logout</button>
    )
  }
}

class NavTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {viewEvent: true};
  }
  render() {
    return (
      <div className='container'>
      <nav className="navbar navbar-expand-lg navbar-light justify-content-center" style={{backgroundColor: "#D2FDFF", borderTopRightRadius:20, borderTopLeftRadius:20}}>
        <ul className='navbar-nav flex-row' style={{backgroundColor: "#D2FDFF"}}>
          <li className='nav-item active' style={{backgroundColor: "#D2FDFF"}}>
            <a className='nav-link' href='#event' style={this.state.viewEvent?{fontWeight: "bolder", color: "Highlight"}:{fontWeight: "bolder"}} onClick={() => this.setState({viewEvent: true})}>Events</a>
          </li>
          <li className='nav-item active' style={{marginLeft: "10vw", backgroundColor: "#D2FDFF"}}>
            <a className='nav-link' href='#user' style={!this.state.viewEvent?{fontWeight: "bolder", color: "Highlight"}:{fontWeight: "bolder"}} onClick={() => this.setState({viewEvent: false})}>Users</a>
          </li>
        </ul>
      </nav>
        {this.state.viewEvent ? <EventTable /> : <UserTable />}
      </div>
    )
  }
}

class UserTable extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      edit: undefined,
      add: false,
      accounts: []
    };
  }

  editHandle = (ID) => {
    this.setState({edit:ID, add:false});
  }

  addHandle = () => {
    this.setState({add:true, edit:undefined});
  }

  handleAdd = (newAccount) => {
    this.setState((prev) => ({accounts: [...prev.accounts, newAccount]}));
  }

  handleUpdate = (newAccount) => {
    let accounts = this.state.accounts;
    accounts.forEach((value, index) => {
      if (value.ID === newAccount.ID) {
        accounts[index] = newAccount
      }
    });
    this.setState({accounts: accounts});
  }

  handleDelete = (newAccount) => {
    let accounts = this.state.accounts;
    let deleteID;
    accounts.forEach((value, index) => {
      if (value.ID === newAccount.ID) {
        deleteID = index;
      }
    });
    accounts.splice(deleteID, 1);
    this.setState({accounts: accounts});
  }

  async componentDidMount() {
    try {
      let response = await fetch('http://localhost:3000/account/all', {
        method: 'GET'
      });
      response = await response.json();

      console.log(response);

      if (response.success) {
        this.setState({ accounts: response.data });
      }
      else {
        alert(response.data);
      }
    } catch (error) {
      // Handle any errors from the async operation
      console.error('Error fetching data:', error);
      this.setState({ accounts: fakeData_User });
    }
  }

  render() {
    return(<table id='event' className="table" style={{backgroundColor: "#F4976C"}}>
      <thead>
      <tr key={0}>
        <th style={{width: "20%"}}>ID</th>
        <th style={{width: "20%"}}>Username</th>
        <th style={{width: "20%"}}>Password</th>
        <th style={{width: "15%"}}>Account Type</th>
        <th style={{width: "25%"}}><button className='btn btn-info' style={{paddingTop:0, paddingBottom:0}} onClick={this.addHandle}><i className="bi bi-plus-square" style={{marginRight:4}}></i>Add</button></th>
      </tr>
      </thead>
      <tbody>
      {this.state.add?
          <AddUser Cancel={() => this.setState({add:false})} onAdd={this.handleAdd} />
        :<></>}
        {this.state.accounts.map((data) => <UserTableRow data={data} edit_id={this.state.edit} edit={this.editHandle} onAdd={this.handleAdd} onUpdate={this.handleUpdate} onDelete={this.handleDelete} />)}
      </tbody>
  </table>)
  }
}

class UserTableRow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      usernameInput: undefined,
      passwordInput: undefined,
      isAdmin: false
    };
  }

  handleConfirm = async () => {
    try {
      const data = {
        username: this.state.usernameInput,
        ID: this.props.edit_id,
        password: this.state.passwordInput,
        isAdmin: this.state.isAdmin
      };

      const respond = await fetch('http://localhost:3000/account/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const response = await respond.json();
      if (response.success) {
        this.props.onUpdate(response.data);
      }
    } catch (error) {
      // Handle any errors from the async operation
      console.error('Error fetching data:', error);
    }
    this.setState({usernameInput: '',
    passwordInput: ''})
    this.props.edit(undefined)
  }

  handleDelete = async () => {
    try {
      const data = {
        ID: this.props.data["ID"],
      };

      console.log(data);

      let response = await fetch('http://localhost:3000/account/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      response = await response.json();
      if (response.success) {
        this.props.onDelete(response.data);
      }
      else {
        alert(response.data);
      }
    }
     catch (error) {
      // Handle any errors from the async operation
      console.error('Error fetching data:', error);
    }
    this.setState({usernameInput: '',
    passwordInput: ''})
    this.props.edit(undefined)
  }

  handleCancel = () => {
    this.setState({
      usernameInput: '',
      passwordInput: ''
    });
    this.props.edit(undefined)
  }

  render(){
    return (
      <tr key={this.props.data["ID"]}>
        <th>{this.props.data["ID"]}</th>
        <th>
          {this.props.edit_id === this.props.data["ID"]?
              <input placeholder={this.props.data["username"]}
              value = {this.state.usernameInput}
              onChange={(e) => this.setState({usernameInput: e.target.value})} />:
              this.props.data["username"]}
        </th>
        <th>{this.props.edit_id === this.props.data["ID"]?
              <input placeholder={this.props.data["password"]}
              value = {this.state.passwordInput}
              onChange={(e) => this.setState({passwordInput: e.target.value})} />:
              this.props.data["password"]}</th>
        <th>{this.props.edit_id === this.props.data["ID"]?
             <select name='isAdmin' value = {this.state.isAdmin} onChange={(e) => this.setState({isAdmin: e.target.value})}>
              <option value="false">User</option>
              <option value="true">Admin</option>
             </select>:
              this.props.data["isAdmin"]? 'Admin' : 'User'
              }</th>
        <th>
          <button className='btn' style={{maxHeight:35}} onClick={() => this.props.edit(this.props.data["ID"])}><i className="bi bi-pencil-square"/></button>
          <button className='btn' style={{maxHeight:35}} onClick={this.handleDelete}><i className="bi bi-trash3"/></button>
          {this.props.edit_id === this.props.data["ID"]?<button className='btn btn-success' onClick={this.handleConfirm}>Confirm</button>:<></>}
          {this.props.edit_id === this.props.data["ID"]?<button className='btn btn-danger' onClick={this.handleCancel} style={{marginLeft:2, marginBottom:4}}>Cancel</button>:<></>}
          </th>
      </tr>
    )
  }
}

class AddUser extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: '',
      isAdmin: false
    };
  }

  handleConfirm = async () => {
    try {
      const data = {
        username: this.state.usernameInput,
        password: this.state.passwordInput,
        isAdmin: this.state.isAdmin === 'true'
      };

      const respond = await fetch('http://localhost:3000/account/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const response = await respond.json();
      console.log(response.data);

      if (response.success) {
        this.props.onAdd(response.data);
      }
    } catch (error) {
      // Handle any errors from the async operation
      console.error('Error fetching data:', error);
    }
  }

  render(){
    return(
      <tr key={"new"}>
      <th>New</th>
      <th><input type='text' id='id' value = {this.state.usernameInput} onChange={(e) => this.setState({usernameInput: e.target.value})} /></th>
      <th><input type='text' id='password' value = {this.state.passwordInput} onChange={(e) => this.setState({passwordInput: e.target.value})} /></th>
      <th><select name='isAdmin' value = {this.state.isAdmin} onChange={(e) => this.setState({isAdmin: e.target.value})}>
        <option value="false">User</option>
        <option value="true">Admin</option>
        </select></th>
      <th>
        <button className='btn btn-success' onClick={this.handleConfirm}>Confirm</button>
        <button className='btn btn-danger' style={{marginLeft:2, marginBottom:4}} onClick={this.props.Cancel}>Cancel</button>
      </th>
    </tr>
    )
  }
}

class EventTable extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      edit: undefined,
      add: false,
      events: [],
      toggle: false
    };
  }

  editHandle = (ID) => {
    this.setState({edit:ID, add: false});
  }

  addHandle = () => {
    this.setState({edit:undefined, add: true});
  }

  handleAdd = (newEvent) => {
    this.setState((prev) => ({events: [...prev.events, newEvent]}));
  }

  handleUpdated = (newEvent) => {
    let newEvents = this.state.events;
    let id;  
    newEvents.forEach((element, index) => {
      if (element.ID === newEvent.ID) {
        id = index;
        console.log(element);
        console.log(newEvent);
        newEvents[index] = newEvent;
      }
    });
    console.log('event id:', newEvents[id]);
    this.setState({events: newEvents});
    this.setState((prev) => ({toggele: !prev.toggele}));
  }

  handleDelete = (newEvent) => {
    let newEvents = this.state.events;
    console.log('newEvents: ', newEvents);
    let id;
    newEvents.forEach((element, index) => {
      if (element.ID === newEvent.ID) {
        id = index;
      }
    });
    console.log('id: ', id);
    newEvents.splice(id, 1);
    this.setState({events: newEvents});
  }

  async componentDidMount() {
    try {
      let response = await fetch('http://localhost:3000/event/all', {
        method: 'GET'
      });
      response = await response.json();
      if (response.success) {
        this.setState({ events: response.data });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ accounts: fakeData_User });
    }
  }

  render() {
    return(<table className="table" style={{backgroundColor: "#F4976C"}}>
      <thead>
      <tr key={0}>
        <th style={{width: "15%", cursor: "pointer"}}>ID</th>
        <th style={{width: "20%", cursor: "pointer"}}>Name</th>
        <th style={{width: "20%", cursor: "pointer"}}>Price</th>
        <th style={{width: "20%", cursor: "pointer"}}>Quota</th>
        <th style={{width: "25%"}}><button className='btn btn-info' style={{paddingTop:0, paddingBottom:0}} onClick={this.addHandle}><i className="bi bi-plus-square" style={{marginRight:4}}></i>Add</button></th>

      </tr>
      </thead>
      <tbody>
        {this.state.add ? <AddEvent Cancel={() => this.setState({add:false})} onAdd={this.handleAdd} /> : <></>}
        {this.state.events.map((data) => <EventTableRow data={data} edit_id={this.state.edit} edit={this.editHandle} edited={this.handleUpdated} onDelete={this.handleDelete} />)}
      </tbody>
  </table>)
  }
}

class AddEvent extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      eventNameInput: '',
      eventPriceInput: 1, 
      eventQuotaInput: 1
    };
  }

  handleClick = async () => {
    try {
      const newEvent = {
        name: this.state.eventNameInput,
        price: +this.state.eventPriceInput,
        quota: +this.state.eventQuotaInput
      };

      console.log(newEvent);

      let response = await fetch('http://localhost:3000/event/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      });

      response = await response.json();
      if (response.success) {
        this.props.onAdd(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ accounts: fakeData_User });
    }
  }

  render(){
    return(
      <tr key={"new"}>
        <th>New</th>
        <th>
          <input type='text' id='eventNameInput' value={this.state.eventNameInput}
                    onChange={(e) => this.setState({eventNameInput : e.target.value})} />
        </th>
        <th>
          $<input type='number' id='eventPriceInput' value={this.state.eventPriceInput}
                    onChange={(e) => this.setState({eventPriceInput: e.target.value})} min={1} />
        </th>
        <th>
          <input type='number' id='eventQuotaInput' value={this.state.eventQuotaInput}
                    onChange={(e) => this.setState({eventQuotaInput: e.target.value})} min={1} />
        </th>
        <th>
          <button className='btn btn-success' onClick={this.handleClick}>Confirm</button>
          <button className='btn btn-danger' style={{marginLeft:2, marginBottom:4}} onClick={this.props.Cancel}>Cancel</button>
        </th>
      </tr>
    )
  }
}

class EventTableRow extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      eventNameInput: undefined,
      eventPriceInput: undefined,
      eventQuotaInput: undefined
    };
  }

  handleEdit = async () => {
    try {
      const newEvent = {
        ID: +this.props.edit_id,
        name: this.state.eventNameInput ? this.state.eventNameInput : this.props.data["name"],
        price: this.state.eventPriceInput ? +this.state.eventPriceInput : this.props.data["price"],
        quota: this.state.eventQuotaInput ? +this.state.eventQuotaInput : this.props.data["quota"]
      };

      let response = await fetch('http://localhost:3000/event/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      });

      response = await response.json();
      console.log(response);
      if (response.success) {
        this.props.edited(response.data);
      }
      else {
        alert(response.data);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ accounts: fakeData_User });
    }
  }

  handleDelete = async () => {
    try {
      const newEvent = {
        ID: +this.props.data["ID"],
      };

      let response = await fetch('http://localhost:3000/event/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      });

      response = await response.json();
      console.log(response);
      if (response.success) {
        this.props.onDelete(response.data);
      }
      else {
        alert(response.data);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ accounts: fakeData_User });
    }
  }

  handleCancel = () => {
    this.props.edit(undefined);
  }

  render() {
    return (
      <tr key={this.props.data["ID"]}>
        <th>{this.props.data["ID"]}</th>
        <th>
          {this.props.edit_id === this.props.data["ID"]?
              <input
              placeholder={this.props.data["name"]}
              value={this.props.eventNameInput}
              onChange={(e) => this.setState({eventNameInput: e.target.value})} />:
              this.props.data["name"]}
        </th>

        <th>
          ${this.props.edit_id === this.props.data["ID"]?
              <input 
              type='number'
              placeholder={this.props.data["price"]}
              value={this.state.eventPriceInput}
              onChange={(e) => this.setState({eventPriceInput: e.target.value})} />:
              this.props.data["price"]}
        </th>

        <th>
          {this.props.edit_id === this.props.data["ID"]?
              <input 
              type='number'
              placeholder={this.props.data["quota"]}
              value={this.state.eventQuotaInput}
              onChange={(e) => this.setState({eventQuotaInput: e.target.value})} />:
              this.props.data["quota"]}
        </th>

        <th>
          <button className='btn' style={{maxHeight:35}} onClick={() => this.props.edit(this.props.data["ID"])}><i className="bi bi-pencil-square"/></button>
          <button className='btn' style={{maxHeight:35}} onClick={this.handleDelete}><i className="bi bi-trash3"/></button>
          {this.props.edit_id === this.props.data["ID"]?<button className='btn btn-success' onClick={this.handleEdit}>Confirm</button> : <></>}
          {this.props.edit_id === this.props.data["ID"]?<button className='btn btn-danger' onClick={this.handleCancel} style={{marginLeft:2, marginBottom:4}}>Cancel</button> : <></>}
        </th>
      </tr>
    )
  }
}

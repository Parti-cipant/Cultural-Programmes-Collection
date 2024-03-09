import React from "react";
import "./style.css";
import "leaflet/dist/leaflet.css";

let title = "Cultural Programmes Collection Website";
let classTitle = "CSCI 2720 Grp20";

export default class Login extends React.Component{
    render(){
      return (
        // Fred will do this part
        <body style={{ backgroundColor: "#FBE8A6", minHeight: "100vh"}}>
            <h1 style={{width: "100%", textAlign: "center", marginTop: 0}}>{classTitle}</h1>
            <h1 style={{width: "100%", textAlign: "center", }}>{title}</h1>
            <br />
            <LoginForm {...this.props} />
        </body>
      )
    }
}

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAdmin: undefined,
        };
    }

    inputUsername = (e) => {
        this.setState({username: e.target.value})
    }

    inputPassword = (e) => {
        this.setState({password: e.target.value})
    }

    inputUserType = (e) => {
        this.setState({isAdmin: e.target.value === "Admin"})
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);
        // document.getElementById("loginForm").requestSubmit();
        // if (this.state.isAdmin !== undefined) {
        //     this.props.updateLogin(true, this.state.isAdmin);
        // }
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        });
        response = await response.json();
        if (response.success) {
            let data = this.state;
            if (!this.state.isAdmin) {
                console.log(response.data);
                data = response.data;
                data['isAdmin'] = this.state.isAdmin;
            }
            this.props.onLogin(data);
        }
        else {
            alert(response.data);
        }
    }

    render(){
        return(
            <div className='container' style={{maxWidth: 450, marginTop: "10vh", borderRadius: 20, borderColor: "black", border: "solid",
                                                padding: 15, backgroundColor: "#B4DFE5"}}>
                <form id='loginForm' onSubmit={this.handleSubmit}>
                    <div class="form-group row">
                        <label for="inputUsername" class="col-sm-4 col-form-label">Username :</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="inputUsername" placeholder="Username" value={this.state.username} onChange={this.inputUsername} required/>
                        </div>
                    </div>
                    <div class="form-group row" style={{marginTop: 20}}>
                        <label for="inputPassword" class="col-sm-4 col-form-label">Password :</label>
                        <div class="col-sm-7">
                            <input type="password" class="form-control" id="inputPassword" placeholder="Password" value={this.state.password} onChange={this.inputPassword} required/>
                        </div>
                    </div>
                    <fieldset class="form-group" style={{marginTop: 20}} onChange={this.inputUserType}>
                        <div class="row">
                            <legend class="col-form-label col-sm-4 pt-0" style={{borderBottom: 0}}>User Type:</legend>
                            <div class="col-sm-8">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="UserTypeRadios" id="UserRadio" value="User" required/>
                                    <label class="form-check-label" for="UserRadio">User</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="UserTypeRadios" id="AdminRadio" value="Admin" required/>
                                    <label class="form-check-label" for="AdminRadio">Admin</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div class="form-group row justify-content-md-center" style={{marginTop: 20}}>
                        <button type="submit" class="btn btn-primary col-sm-4" style={{ backgroundColor: "#303C6C", width: "85%"}}>Sign in</button>
                    </div>
                </form>
            </div>
        )
    }
}

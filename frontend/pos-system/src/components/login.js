import React, {Component} from 'react';
import {setAuthentication} from '../Util/Auth/AuthTokenManager';
import {withRouter} from "react-router-dom";


class Login extends Component {

    async getCredentials(e){

        const username = this.refs.inputusername.value;
        const password = this.refs.inputpassword.value;

        console.log('Username: '+ username);
        console.log('Password: '+ password);

        let url = "http://localhost:8080/api/auth/log_in";
        let response = {
            status : 120,
            content:{},
            error:{}
        };

       await  fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "cache-control": "no-cache",
            },
            credentials:"include",
            method: 'post',
            body: JSON.stringify({username: username, password: password })

        }).then(
                (result) => {
            let auth = false;
            console.log(result['status'])
            if(result['status']===200){
                auth = true;
                response['status'] =200;
                setAuthentication(auth);
                this.props.history.push('/orders');
            }

        }).catch( function(error) {
            response['status'] = 280;
            console.log(error)
        });

        if(response['status']===120){
            response['status'] = 401;
        }

        console.log(response);
    }

    render() {
        return (
            <div className="container login-container">
                <form>
                    <fieldset>
                        <legend>Log In</legend>
                        <div className="credentials">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Username</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       placeholder="Enter username" ref="inputusername"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                       placeholder="Password" ref="inputpassword"/>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.getCredentials.bind(this)}>Log In</button>
                    </fieldset>
                </form>
            </div>
        );
    }

}

export default withRouter(Login);
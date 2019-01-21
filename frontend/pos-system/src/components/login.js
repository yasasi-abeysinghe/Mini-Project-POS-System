import React, {Component} from 'react';


class Login extends Component {

    getCredentials(e){
        e.preventDefault();
        const username = this.refs.inputusername.value;
        const password = this.refs.inputpassword.value;

        console.log('Username: '+ username);
        console.log('Password: '+ password);
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

export default Login;
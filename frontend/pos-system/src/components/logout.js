import React, {Component} from "react";
import {setAuthentication} from '../Util/Auth/AuthTokenManager';
import {withRouter} from "react-router-dom";


class Logout extends Component {
    constructor(props) {
        super(props);
    }

    userLogout = ()=>{
        let response = {
            status : 120,
            content:{},
            error:{}
        };

        fetch("http://localhost:8080/api/auth/log_out", {
            headers: {
                "Content-Type": "application/json",
                "cache-control": "no-cache",
            },
            credentials:"include",
            method: 'post',
            body: JSON.stringify({ })

        }).then((responseData)=> {
            response['status'] = responseData['status'];
            if(response['status']===200){
                setAuthentication(false);
                response['status'] =200;

                this.props.history.push('/');

            }
        }).catch( function(error) {
            response['status'] = 280;
            console.log(error)
        });

        console.log(response);
    }

    render() {
        return (
            <button type="button" className="btn btn-primary" onClick={this.userLogout}>Logout</button>
        );
    }

}


export default withRouter(Logout);
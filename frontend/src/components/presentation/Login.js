import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fieldCd } from '../../constants/typeCodes';
import { auth } from '../../firebase/firebase';
import logo from '../../static/images/logo.png'
import axios from "axios"

class Login extends Component {
    state = {
        UserEmail:"",
        UserPassword:"",
    }
    onChangeEmail=(e)=>{
       let value=e.target.value;
       this.setState({UserEmail:value})
    }
    onChangePassword=(e)=>{
        let value=e.target.value;
        this.setState({UserPassword:value})
     }
     Signin=(e)=>{
        e.preventDefault();
        let {UserEmail,UserPassword}=this.state;
        auth.signInWithEmailAndPassword(UserEmail,UserPassword).then(auth=>{
            if(auth){
                let uid=auth.user.uid;
                this.props.addUser(uid);
                let admin=false;
                axios.get("/api/users/"+uid).then((res)=>{
                    let{is_admin}=res.data.user;
                    if(is_admin===1){
                        admin=true;
                        this.props.addAdmin(is_admin);
                    }
                    this.props.history.push(admin?"/admin":"/homepage");
                })
            }
        }).catch(error => alert(error.message));
     }
    render() {
        let {UserEmail,UserPassword}=this.state;
        return (
            <div className="container mid full-height login">
                <div className='login-container'>
                    <NavLink to='/'>
                        <img className="login__logo" src={logo} alt='logo'></img>
                    </NavLink>
                    <h2 className='form-heading center'>Sign-in</h2>
                    <div className='form-section'>
                        <div className='input-group full'>
                            <label>Email-Id</label>
                            <div className='effect'>
                                <input type='text' value={UserEmail} name={fieldCd.UserEmail} onChange={this.onChangeEmail} /><span></span>
                            </div>
                            <div className='error'></div>
                        </div>

                        <div className='input-group full'>
                            <label>Password</label>
                            <div className='effect'>
                                <input type='password' value={UserPassword} name={fieldCd.UserPassword} onChange={this.onChangePassword} /><span></span>
                            </div>
                            <div className='error'></div>
                        </div>
                        <div className='form-buttons'>
                            <button className='btn' onClick={this.Signin}>Sign In</button>
                            {/* <NavLink to='/getting-started' className='center back-btn'>Back</NavLink> */}
                        </div>
                        <div className="form-buttons no-account">
                            <p> If you don't already have an account please
                               <NavLink to='/register'><span className="open-register-form"> register</span></NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { user: state.user };
}
const mapDispatchToProps=(dispatch)=>{
    return{
        addUser:(user)=>{dispatch({type:'ADD_USER',user:user})},
        addAdmin:(admin)=>{dispatch({type:'ADD_ADMIN',admin:admin})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);

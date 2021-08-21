import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fieldCd } from '../../constants/typeCodes';
import { auth } from '../../firebase/firebase';
import logo from '../../static/images/logo.png'
import axios from "axios"

class Register extends Component {
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
      Signup=(e)=>{
        e.preventDefault();
        let {UserEmail,UserPassword}=this.state;
        auth.createUserWithEmailAndPassword(UserEmail,UserPassword).then(auth=>{
            if(auth){
                let uid=auth.user.uid;
                this.props.addUser(uid);
                let obj={uid};
                axios.post("/api/users",obj).then((res)=>{
                    this.props.history.push("/settings");
                }).catch(error => alert(error.message));
            }
        }).catch(error => alert(error.message));
     }
    render() {
        let {UserEmail,UserPassword}=this.state;
        return (
            <div className="container mid full-height register">
                <div className='register-container'>
                    <NavLink to='/'>
                        <img className="register__logo" src={logo} alt='logo'></img>
                    </NavLink>
                    <h2 className='form-heading center'>Create An Account</h2>
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
                            <button className='btn' onClick={this.Signup}>Create An Account</button>
                            {/* <NavLink to='/getting-started' className='center back-btn'>Back</NavLink> */}
                        </div>
                        <div class="form-buttons no-account">
                            <p> If you already have an account then please
                               <NavLink to='/login'><span class="open-register-form"> signin</span></NavLink>
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
        addUser:(user)=>{dispatch({type:'ADD_USER',user:user})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);

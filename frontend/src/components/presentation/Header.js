import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import logo from '../../static/images/logo.png'
import { auth } from '../../firebase/firebase';
import {withRouter} from 'react-router-dom'
class Header extends Component {
    state = {}
    handleAuth=()=>{
        if(this.props.user!=null){
            this.props.addUser(null);
            auth.signOut().then((res)=>{
                this.props.history.push('/')
            }).catch(error => alert(error.message));
        }
    }
    render() {
        let {user}=this.props;
        return (
            <header className="header">
                <nav className="nav">
                    <div className="logo-container full-height">
                        <NavLink to={user?(this.props.admin===1)?"admin":'/homepage':'/'}>
                            <img className="logo" src={logo} alt='logo'></img>
                        </NavLink>
                    </div>
                    <div className="header-link-container full-height">
                        <ul>
                            <li className={(this.props.user!=null)?" hide":"signup text-larger"}>
                                <NavLink to="/register">
                                    Register
                            </NavLink>
                            </li>
                            <li className='signin' onClick={this.handleAuth}>
                                <NavLink to={!this.props.user && '/login'}  className='text-blue text-larger'>
                                    {this.props.user==null?"Sign In":"Sign Out"}
                                </NavLink>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <NavLink to={this.props.user==null?"/login":"/getting-started"} className='text-larger'>
                                    Create Resume
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={this.props.user==null?"/login":"/homepage"} className='text-larger'>
                                    Jobs
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { user: state.user,admin:state.admin };
}
const mapDispatchToProps=(dispatch)=>{
    return{
        addUser:(user)=>{dispatch({type:'ADD_USER',user:user})}
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));
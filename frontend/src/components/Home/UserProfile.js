import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProfileDetails from './ProfileDetails'

class UserProfile extends Component {
    state = {}
    update=(name)=>{
        this.props.updateMenu(name);
    }
    render() {
        return (
            <div className='user__profile'>
                <ProfileDetails></ProfileDetails>
                <div className='user__nav center'>
                    <NavLink to='settings'><p>Update Personal Details</p></NavLink>
                </div>
                <div className='user__nav center' onClick={()=>this.update("home")}>
                    <p>All Jobs</p>
                </div>
                <div className='user__nav center' onClick={()=>this.update("opportunities")}>
                    <p>New Opportunities</p>
                </div>
                <div className='user__nav center' onClick={()=>this.update("applied-jobs")}>
                    <p>Applied Jobs</p>
                </div>
                <div className='user__nav center' onClick={()=>this.update("offers")}>
                    <p>Offers</p>
                </div>
                <div className='user__nav center'>
                    <p><NavLink to="/stats">Statistics</NavLink></p> 
                </div>
                <div className='user__nav center no_border'>
                    <NavLink to='/getting-started'><p>Resume</p></NavLink>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { menu: state.menu };
}
const mapDispatchToProps=(dispatch)=>{
    return{
        updateMenu:(menu)=>{dispatch({type:'UPDATE_MENU',menu:menu})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);

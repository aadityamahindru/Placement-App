import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProfileDetails from '../Home/ProfileDetails'

class AdminProfile extends Component {
    state = {}
    update = (name) => {
        this.props.updateMenu(name);
    }
    render() {
        return (
            <div className='user__profile'>
                <ProfileDetails></ProfileDetails>
                <div className='user__nav center'>
                    <NavLink to='/admin-settings'><p>Update Personal Details</p></NavLink>
                </div>
                <div className='user__nav center'>
                    <p><NavLink to="/post-job">Post A New Job</NavLink></p>
                </div>
                <div className='user__nav center'>
                    <p><NavLink to="/admin-offers">Offer Letters</NavLink></p>
                </div>
                <div className='user__nav center'>
                    <p><NavLink to="/stats">Statistics</NavLink></p> 
                </div>
                <div className='user__nav center no_border'>
                    <p><NavLink to="/placed">Placed Students List</NavLink></p>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { menu: state.menu };
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateMenu: (menu) => { dispatch({ type: 'UPDATE_MENU', menu: menu }) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
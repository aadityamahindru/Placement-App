import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import logo from '../../static/images/resume.png'
class LandingPage extends Component {
    state = {}
    render() {
        return (
            <div className="container lp-page center">
                <div>
                    <h1>Find a job that matches your skills</h1>
                    <p >Get placed in the company that matches with your skill set</p>
                    <br></br>
                    <div >
                        <NavLink to={this.props.user==null?"/login":this.props.admin===1?"/admin":"/homepage"} className='btn'><span>Get Started</span>
                        </NavLink>
                    </div>
                    <img src={logo} className="lp-resume" alt="logo" />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { user: state.user,admin:state.admin };
}
export default connect(mapStateToProps)(LandingPage);

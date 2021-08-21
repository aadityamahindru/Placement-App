import React, { Component } from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import userImg from "../../static/images/user.png"
class ProfileDetails extends Component {
    state = {
        firstName: "",
        lastName: "",
        src: "",
        branch: "",
    }
    componentWillReceiveProps(nextProps){
        let{user}=nextProps;
        if(user){
            let path = "/api/users/" + user;
            if (user != null) {
                axios.get(path).then((res) => {
                    let { first_name, last_name, branch, img_url } = res.data.user;
                    this.setState({
                        firstName: first_name,
                        lastName: last_name,
                        branch: branch,
                        src: img_url
                    })
                })
            }
        }
    }
    componentDidMount() {
        let path = "/api/users/" + this.props.user;
        if (this.props.user != null) {
            axios.get(path).then((res) => {
                let { first_name, last_name, branch, img_url } = res.data.user;
                this.setState({
                    firstName: first_name,
                    lastName: last_name,
                    branch: branch,
                    src: img_url
                })
            })
        }
    }
    render() {
        let { firstName, lastName, branch, src } = this.state;
        return (
            <div className='profile__details'>
                <div className="profile__img container mid">
                    <img src={src==='null' ? userImg : src} alt="dp" />
                </div>
                <div className='details__section margin_five'>
                    <p className='username center'>{firstName + " " + lastName}</p>
                    <p className='branch center'>{branch}</p>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { user: state.user };
}
export default connect(mapStateToProps)(ProfileDetails);

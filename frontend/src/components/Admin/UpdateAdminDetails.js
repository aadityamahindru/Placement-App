import React, { Component } from 'react';
import axios from "axios"
import { fieldCd } from '../../constants/typeCodes';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import userImg from "../../static/images/user.png"
class UpdateAdminDetails extends Component {
    state = {
        details: {},
        src: ""
    }
    fileInputRef = React.createRef();
    imgObj;
    onSubmit = () => {
        let { details } = this.state;
        let path = "/api/users/" + this.props.user;
        axios.patch(path, details).then((res) => {
            this.props.history.push("/homepage");
        }).catch(error => alert(error.message));
    }
    onChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        let details = this.state.details
        this.setState({ details: { ...details, [key]: value } })
    }
    updateImage = () => {
        this.imgObj = this.fileInputRef.current.files[0];
        let imgNewSrc = URL.createObjectURL(this.imgObj);
        let formData = new FormData();
        formData.append("user", this.imgObj);
        let path = "/api/users/" + this.props.user;
        axios.patch(path, formData).then((res) => {
            this.setState({
                src: imgNewSrc,
            });
        })
    }
    componentDidMount() {
        let path = "/api/users/" + this.props.user;
        axios.get(path).then((res) => {
            let { img_url } = res.data.user;
            this.setState({
                src: img_url,
                details:res.data.user
            })
        })
    }
    render() {
        let {user}= this.props;
        let {first_name,last_name,phone,email_id}=this.state.details
        return (
            <div className='container mid full-height details'>
                <div className='section'>
                    <div className='add-details'>
                        <h2 className='form-heading center'>Personal Details</h2>
                        <div className="full userImg_box">
                            <img src={!this.state.src ? userImg : this.state.src} alt="user-img" className="user_img" />
                            <div>
                                <label>Upload Image</label>
                                <input type="file" ref={this.fileInputRef} onChange={this.updateImage} />
                            </div>
                        </div>
                        <div className='form-section'>
                            <div className='input-group'>
                                <label>First Name</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.FirstName} onChange={this.onChange} value={first_name}/><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Last Name</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.LastName} onChange={this.onChange} value={last_name}/><span></span>
                                </div>
                                <div className='error'></div>
                            </div>
                            <div className='input-group'>
                                <label>Email</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Email} onChange={this.onChange} value={email_id}/><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Phone</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Phone} onChange={this.onChange} value={phone}/><span></span>
                                </div>
                                <div className='error'></div>
                            </div>
                            <div className='form-buttons'>
                                <button className='btn' onClick={this.onSubmit}>Update Details</button>
                                <NavLink to='/admin' className={user==null?"hide center back-btn":"center back-btn"}>Back</NavLink>
                            </div>

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
export default withRouter(connect(mapStateToProps)(UpdateAdminDetails));
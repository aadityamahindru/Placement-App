import React, { Component } from 'react';
import axios from "axios"
import { fieldCd } from '../../constants/typeCodes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import userImg from "../../static/images/user.png"
class UpdateDetails extends Component {
    state = {
        details: {},
        src: ""
    }
    fileInputRef = React.createRef();
    imgObj;
    onSubmit = () => {
        let { details } = this.state;
        if(!details.img_url){
            details.img_url=this.state.src;
        }
        let path = "/api/users/" + this.props.user;
        axios.patch(path, details).then(() => {
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
        axios.patch(path,formData).then((res) => {
            this.setState({
                src: imgNewSrc
            });
        })
    }
    componentWillReceiveProps(nextProps){
        let path = "/api/users/" + nextProps.user;
        axios.get(path).then((res)=>{
            let {img_url}=res.data.user;
            console.log(res.data);
            this.setState({
                src:img_url,
                details:res.data.user
            })
        }).catch((err)=>alert(err))
    }
    componentDidMount(){
        let path = "/api/users/" + this.props.user;
        axios.get(path).then((res)=>{
            let {img_url}=res.data.user;
            console.log(res.data);
            this.setState({
                src:img_url,
                details:res.data.user
            })
        })
    }
    render() {
        let {first_name,last_name,phone,email_id,enroll_no,year,tenth_per,twelve_per,grad_per,backlogs,branch}=this.state.details
        return (
            <div className='container mid full-height details'>
                <div className='section'>
                    <div className='add-details'>
                        <h2 className='form-heading center'>Personal Details</h2>
                        <div className="full userImg_box">
                            <img src={!this.state.src?userImg:this.state.src} alt="user-img" className="user_img" />
                            <div>
                                <label>Upload Image</label>
                                <input type="file" ref={this.fileInputRef} onChange={this.updateImage}/>
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

                            <div className='input-group'>
                                <label>Enrollment Number</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Enroll} onChange={this.onChange} value={enroll_no}/><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Graduation Year</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.GraduationYear} onChange={this.onChange} value={year}/><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Branch</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Branch} onChange={this.onChange} value={branch}/><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Backlogs</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Backlogs} onChange={this.onChange} value={backlogs}/><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>10th Precentage</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Tenth} onChange={this.onChange} value={tenth_per}/><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>12th Precentage</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Twelve} onChange={this.onChange} value={twelve_per}/><span></span>
                                </div>
                                <div className='error'></div>
                            </div>
                            <div className='input-group full'>
                                <label>Graduation Precentage</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.GradMarks} onChange={this.onChange} value={grad_per}/><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='form-buttons'>
                                <button className='btn' onClick={this.onSubmit}>Update Details</button>
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
export default withRouter(connect(mapStateToProps)(UpdateDetails));
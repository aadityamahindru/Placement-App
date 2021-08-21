import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { fieldCd } from '../../constants/typeCodes';
import axios from "axios"
class PostJob extends Component {
    state = {
        jobDetails:{}
    }
    onChange=(event)=>{
        let key = event.target.name;
        let value = event.target.value;
        let jobDetails = this.state.jobDetails
        this.setState({ jobDetails: { ...jobDetails, [key]: value } })
    }
    onSubmit = () => {
        let { jobDetails } = this.state;
        let path = "/api/jobs";
        axios.post(path, jobDetails).then((res) => {
            this.props.history.push("/admin");
        }).catch(error => alert(error.message));
    }
    componentDidMount(){
        window.scroll(0, 0);
    }
    render() {
        return (
            <div className='container mid details full-height'>
                <div className='section'>
                    <div className='form-card'>
                        <h2 className='form-heading center'>Job Details</h2>
                        <div className='form-section'>
                            <div className='input-group'>
                                <label>Company Name</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.CompanyName} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>
                            <div className='input-group'>
                                <label>Job Designation</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.JobDesig} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>CTC</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.CTC} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Location</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Location} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Joining</label>
                                <div className='effect'>
                                    <input type='date' name={fieldCd.Joining} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>10th Percentage</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Tenth} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>12th Percentage</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Twelve} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Graduation Percentage</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.GradMarks} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Backlogs</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Backlogs} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Schedule</label>
                                <div className='effect'>
                                    <input type='date' name={fieldCd.Schedule} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group full'>
                                <label>CTC Break-Up</label>
                                <div className='effect'>
                                    <textarea name={fieldCd.CtcBreakup} onChange={this.onChange} className="textbox-height"  /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>
                            <div className='input-group full'>
                                <label>Selection Process</label>
                                <div className='effect'>
                                    <textarea name={fieldCd.SelectionProcess} onChange={this.onChange} className="textbox-height"  /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>
                            <div className='input-group full'>
                                <label>Job Description</label>
                                <div className='effect'>
                                    <textarea name={fieldCd.JobDesc} onChange={this.onChange} className="textbox-height" /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='form-buttons'>
                                <button className='btn' onClick={this.onSubmit}>Post Job</button>
                                <NavLink to='/admin' className='center back-btn'>Back</NavLink>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostJob;
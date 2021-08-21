import React, { Component } from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { NavLink } from 'react-router-dom';
class JobDetails extends Component {
    state = {
        appliedStudents: [],
        companyName: ""
    }
    componentDidMount() {
        window.scroll(0, 0);
        if (this.props.jobId) {
            axios.get("/api/users/applied/" + this.props.jobId).then((res) => {
                let { user } = res.data;
                this.setState({ appliedStudents: user })
            }).then(() => {
                axios.get("/api/jobs/" + this.props.jobId).then((res) => {
                    let { company_name } = res.data.job;
                    this.setState({ companyName: company_name })
                })
            })
        }
    }
    render() {
        let { appliedStudents } = this.state;
        return (
            <div className="job-stats">
                <div className="details-table mid">
                    <table id="user" className="table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Id</th>
                                <th>Phone No.</th>
                                <th>Enrollment No</th>
                                <th>10th Percentage</th>
                                <th>12th Percentage</th>
                                <th>Graduation Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appliedStudents.map((user, index) => {
                                    let { first_name, last_name, email_id, phone, enroll_no, tenth_per, twelve_per, grad_per } = user;
                                    return <tr key={index}>
                                        <td align="center">{first_name}</td>
                                        <td align="center">{last_name}</td>
                                        <td align="center">{email_id}</td>
                                        <td align="center">{phone}</td>
                                        <td align="center">{enroll_no}</td>
                                        <td align="center">{tenth_per}</td>
                                        <td align="center">{twelve_per}</td>
                                        <td align="center">{grad_per}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="excel-container">
                    <ReactHTMLTableToExcel table="user" filename={this.state.companyName + "-applied-list"} sheet="Sheet" buttonText="Export As An Excel File" className="excel btn"></ReactHTMLTableToExcel>
                    <NavLink to="/update-job-desc" className="edit">Edit Job Information</NavLink>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { jobId: state.jobId, admin: state.admin };
}
export default connect(mapStateToProps)(JobDetails);
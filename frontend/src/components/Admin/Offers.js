import React, { Component } from 'react';
import axios from "axios"
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
class Offers extends Component {
    state = {
        appliedStudents: [],
        filterStudent: [],
        studentNotFound:false
    }
    componentDidMount() {
        window.scroll(0, 0);
        if (this.props.jobId) {
            axios.get("/api/users/applied/" + this.props.jobId).then((res) => {
                let { user } = res.data;
                this.setState({ appliedStudents: user, filterStudent: user })
            })
        }
    }
    search = (event) => {
        let value = event.target.value;
        let searchStudent = this.state.appliedStudents.filter((user) => {
            return (user.first_name.toLowerCase().includes(value.toLowerCase()) || user.last_name.toLowerCase().includes(value.toLowerCase()));
        })
        if(searchStudent.length==0){
            this.setState({ filterStudent: searchStudent,studentNotFound:true })
        }else{
            this.setState({ filterStudent: searchStudent,studentNotFound:false })
        }
    }
    change = (event) => {
        let uid = event.target.name;
        let checked = event.target.checked;
        let { jobId } = this.props;
        let path = "/api/offers/" + uid;
        if (!checked) {
            let obj = { job_id: jobId, ol: false };
            axios.patch(path, obj);
        } else {
            let obj = { job_id: jobId, ol: true };
            axios.patch(path, obj);
        }
    }
    render() {
        let { filterStudent } = this.state;
        return (
            <div className="container mid">
                <div className="search-bar">
                    <label>Search </label>
                    <input type="text" onChange={this.search} />
                    <SearchIcon></SearchIcon>
                </div>
                <div className="shadow offer-table">
                    {this.state.studentNotFound? <p className="no-result">No Result Found</p> :
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
                                    <th>Offer Letter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterStudent.map((user, index) => {
                                        let { uid, first_name, last_name, email_id, phone, enroll_no, tenth_per, twelve_per, grad_per } = user;
                                        return <tr key={index}>
                                            <td align="center">{first_name}</td>
                                            <td align="center">{last_name}</td>
                                            <td align="center">{email_id}</td>
                                            <td align="center">{phone}</td>
                                            <td align="center">{enroll_no}</td>
                                            <td align="center">{tenth_per}</td>
                                            <td align="center">{twelve_per}</td>
                                            <td align="center">{grad_per}</td>
                                            <td align="center"><input type="checkbox" name={uid} onChange={this.change} defaultChecked={user.ol == 1} /></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { jobId: state.jobId, admin: state.admin };
}
export default connect(mapStateToProps)(Offers);
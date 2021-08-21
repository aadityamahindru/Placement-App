import React, { Component } from 'react'
import axios from "axios";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
class PlacedStudents extends Component {
    state = {
        placedStudents: [],
    }
    componentDidMount() {
        window.scroll(0, 0);
        axios.get("/api/offers/all").then((res) => {
            let { users } = res.data;
            console.log(users);
            this.setState({ placedStudents: users })
        })
    }
    render() {
        let { placedStudents } = this.state;
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                placedStudents.map((user, index) => {
                                    let { first_name, last_name, email_id, phone, enroll_no } = user;
                                    return <tr key={index}>
                                        <td align="center">{first_name}</td>
                                        <td align="center">{last_name}</td>
                                        <td align="center">{email_id}</td>
                                        <td align="center">{phone}</td>
                                        <td align="center">{enroll_no}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="excel-container">
                    <ReactHTMLTableToExcel table="user" filename={"placed-list"} sheet="Sheet" buttonText="Export excel" className="excel btn"></ReactHTMLTableToExcel>
                </div>
            </div>
        );
    }
}
export default (PlacedStudents);
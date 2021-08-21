import React, { Component } from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import joblogo from "../../static/images/jobbg.jpg"
import BusinessIcon from '@material-ui/icons/Business';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import CurrencyFormat from 'react-currency-format';
class JobDescription extends Component {
    state = {
        companyName: "",
        jobDescription: "",
        ctc: "",
        joining: "",
        ctcBreakup: "",
        jobDesig: "",
        location: "",
        disabled: true,
        applyJob: "Apply",
        tenth_per: "",
        twelve_per: "",
        grad_per: "",
        backlogs: ""
    }
    apply = async () => {
        let { applyJob } = this.state;
        let { user, jobId } = this.props;
        if (applyJob === "Apply") {
            axios.post("/api/jobs/apply", { user_id: user, jobid: jobId }).then((res) => {
                this.setState({ applyJob: "Applied" });
            }).catch((err) => alert(err))
        } else {
            let response = false;
            function confirmBox() {
                return new Promise(function (resolve, reject) {
                    confirmAlert({
                        title: 'Confirm to Withdraw Application',
                        message: 'Clicking this will withdraw your Application',
                        buttons: [
                            {
                                label: 'Accept',
                                onClick: () => {
                                    response = true;
                                    resolve();
                                }
                            },
                            {
                                label: 'Cancel',
                                onClick: () => {
                                    response = false
                                    resolve();
                                }
                            }
                        ]
                    })
                })
            }
            await confirmBox();
            if (response === true) {
                let checkPath = "/api/jobs/" + this.props.user + "/check/" + this.props.jobId;
                axios.delete(checkPath).then((res) => {
                    this.setState({ applyJob: "Apply" });
                })
            }
        }
    }
    componentDidMount() {
        window.scroll(0, 0);
        let path = "/api/jobs/" + this.props.jobId;
        axios.get(path).then((res) => {
            let { job } = res.data;
            this.setState({
                companyName: job.company_name,
                jobDescription: job.job_desc,
                ctc: job.ctc,
                joining: job.joining,
                ctcBreakup: job.ctc_breakup,
                location: job.location,
                jobDesig: job.job_desig,
                tenth_per: job.tenth_per,
                twelve_per: job.twelve_per,
                grad_per: job.grad_per,
                backlogs: job.backlogs
            })
        })
        let checkPath = "/api/jobs/" + this.props.user + "/check/" + this.props.jobId;
        axios.get(checkPath).then((res) => {
            let { applied } = res.data;
            if (applied) {
                this.setState({ applyJob: "Applied" });
            } else {
                this.setState({ applyJob: "Apply" });
            }
        })
        axios.get("/api/offers/" + this.props.user + "/check/" + this.props.jobId).then((res) => {
            console.log(res.data.offer)
            if (!res.data.offer) {
                let uPath = "/api/jobs/eligible/" + this.props.user + "/jb/" + this.props.jobId;
                axios.get(uPath).then((res) => {
                    let { eligible } = res.data;
                    this.setState({ disabled: !eligible });
                })
            } else {
                this.setState({ disabled: true })
            }
        })
    }
    render() {
        let { companyName, location, joining, ctcBreakup, jobDescription, jobDesig, ctc, tenth_per, twelve_per, grad_per, backlogs } = this.state;
        joining = joining.substring(0, 10);
        return (
            <div className="jd">
                <img className="jobDesc_image" src={joblogo} alt="job-logo" />
                <div className="jd-section">
                    <div className="job_description" >
                        <div className="jobDesc_info container mid">
                            <div className="jobDesc_aboutCompany">
                                <BusinessIcon></BusinessIcon>
                                <div className="info">
                                    <p className="jobDesc_desig">{jobDesig}</p>
                                    <p>{companyName}</p>
                                </div>
                            </div>


                            <p className="newline">{jobDescription}</p>
                            <p><span className="title">Location: </span><span>{location}</span></p>
                            <p><span className="title">Joining Date: </span><span>{joining}</span></p>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <p><span className="title">Cost To Company: </span><span>{value}</span></p>
                                )}
                                decimalScale={2}
                                value={ctc}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₹ "}
                            />
                            <p className="newline"><span className="title">CTC Breakup: </span><br /><br />
                                <span>{ctcBreakup}</span>
                            </p>
                        </div>

                        <p className="margin-five">Eligibility Criteria</p>
                        <div className="jobDesc_info jd_section">
                            <p><span className="title">10th Percentage: </span><span>{tenth_per + "%"}</span></p>
                            <p><span className="title">12th Percentage: </span><span>{twelve_per + "%"}</span></p>
                            <p><span className="title">Graduation Percentage: </span><span>{grad_per + "%"}</span></p>
                            <p><span className="title">Number of Backlogs Allowed: </span><span>{backlogs}</span></p>
                        </div>

                    </div>
                    <div className="apply container mid">
                        <button className="Apply Job" disabled={this.state.disabled} onClick={this.apply}>{this.state.applyJob}</button>
                        <p>By clicking the apply button you agree to apply for the particular jobs and furter your details will be transferred to TnP of BPIT</p>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { jobId: state.jobId, user: state.user };
}
export default connect(mapStateToProps)(JobDescription);

import React, { Component } from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessIcon from '@material-ui/icons/Business';
import { connect } from 'react-redux';
import CurrencyFormat from "react-currency-format"
import { withRouter } from 'react-router-dom'
class JobContainer extends Component {
    state = {
        jobId: this.props.job.job_id,
    }
    openJob = () => {
        if (this.props.menu === "offers") return;
        this.props.addJobId(this.state.jobId);
        this.props.history.push((this.props.admin === 1) ? 'admin-job-details' : '/job-description');
    }
    render() {

        let { company_name, job_desig, ctc, joining, location } = this.props.job;
        joining = joining.substring(0, 10);
        return (
            <div className="job_container">
                <div className="building_logo">
                    <BusinessIcon></BusinessIcon>
                </div>
                <div className="company_details">
                    <div className="about_company">
                        <p className="company_name" onClick={this.openJob}>{company_name}</p>
                        <p className="job_desig">{job_desig}</p>
                    </div>
                    <div className="location">
                        <LocationOnIcon></LocationOnIcon>
                        <p>{location}</p>
                    </div>
                    <div className="company_extra">

                        <CurrencyFormat
                            renderText={(value) => (
                                <p className="ctc">{"CTC:  " + value}</p>
                            )}
                            decimalScale={2}
                            value={ctc}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₹ "}
                        />
                        <p className="joining">{"Joining Date:  " + joining}</p>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return { jobId: state.jobId, admin: state.admin, menu: state.menu };
}
const mapDispatchToProps = (dispatch) => {
    return {
        addJobId: (jobId) => { dispatch({ type: 'ADD_JOBID', jobId: jobId }) }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobContainer));
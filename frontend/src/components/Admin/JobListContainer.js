import React, { Component } from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessIcon from '@material-ui/icons/Business';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
class JobListContainer extends Component {
    state = {
        jobId:this.props.job.job_id,
    }
    openJob=()=>{
        this.props.addJobId(this.state.jobId);
        this.props.history.push("/offerpage");
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
                        <p>Location: </p>
                        <LocationOnIcon></LocationOnIcon>
                        <p>{location}</p>
                    </div>
                    <div className="company_extra">
                        <p className="ctc">{"CTC:  ₹ " + ctc}</p>
                        <p className="joining">{"Joining Date:  " + joining}</p>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state,ownProps)=>{
    return {jobId:state.jobId};
}
const mapDispatchToProps=(dispatch)=>{
    return{
        addJobId:(jobId)=>{dispatch({type:'ADD_JOBID',jobId:jobId})}
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(JobListContainer));
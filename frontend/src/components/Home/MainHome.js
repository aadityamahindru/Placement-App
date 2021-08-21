import axios from "axios";
import React, { Component } from 'react'
import { connect } from "react-redux";
import JobContainer from "./JobContainer";
class MainHome extends Component {
    state = {
        jobs: [],
        menu: this.props.menu,
        jobNotFound:false
    }
    componentWillReceiveProps(nextProps) {
        let { menu } = nextProps;
        if (menu === "home") {
            axios.get("/api/jobs").then((res) => {
                window.scroll(0, 0);
                let { jobs } = res.data;
                let noJob=false;
                if(jobs.length==0)noJob=true;
                this.setState({
                    jobs: jobs,
                    jobNotFound:noJob
                })
            })
        } else if (menu === "opportunities") {
            let path="/api/jobs/search/"+this.props.user;
            axios.get(path).then((res) => {
                window.scroll(0, 0);
                let { jobs } = res.data;
                let noJob=false;
                if(jobs.length==0)noJob=true;
                this.setState({
                    jobs: jobs,
                    jobNotFound:noJob
                })
            })
        } else if(menu==="applied-jobs") {
            let path="/api/jobs/apply/"+this.props.user;
            axios.get(path).then((res) => {
                window.scroll(0, 0);
                let { jobs } = res.data;
                let noJob=false;
                if(jobs.length==0)noJob=true;
                this.setState({
                    jobs: jobs,
                    jobNotFound:noJob
                })
            })
        }else{
            axios.get("/api/offers/"+this.props.user).then((res)=>{
                let { jobs } = res.data;
                let noJob=false;
                if(jobs.length==0)noJob=true;
                window.scroll(0, 0);
                this.setState({
                    jobs: jobs,
                    jobNotFound:noJob
                })
            })
        }
    }
    componentDidMount() {
        axios.get("/api/jobs").then((res) => {
            console.log(res);
            let { jobs } = res.data;
            this.setState({
                jobs: jobs,
            })
        })
    }
    render() {
        return (
            <div className="main_home">
                {   this.state.jobNotFound?<p className="no-result">No Result Found</p>:
                    this.state.jobs.map((job) => {
                        return <JobContainer job={job} key={job.job_id}></JobContainer>
                    })
                }
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { menu: state.menu,user:state.user };
}
export default connect(mapStateToProps)(MainHome);


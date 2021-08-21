import React, { Component } from 'react';
import axios from "axios"
import JobListContainer from './JobListContainer';
import SearchIcon from '@material-ui/icons/Search';
class OfferJobs extends Component {
    state = {
        jobs: [],
        filterJobs:[],
        jobNotFound:false
    }
    componentDidMount() {
        window.scroll(0, 0);
        axios.get("/api/jobs").then((res) => {
            console.log(res);
            let { jobs } = res.data;
            this.setState({
                jobs: jobs,
                filterJobs:jobs
            })
        })
    }
    search = (event) => {
       let value=event.target.value;
       let searchJobs=this.state.jobs.filter((job)=>{
           return job.company_name.toLowerCase().includes(value.toLowerCase());
       })
       if(searchJobs.length==0){
        this.setState({filterJobs:searchJobs,jobNotFound:true})
       }else{
        this.setState({filterJobs:searchJobs,jobNotFound:false})
       }
    }
    render() {
        return (
            <div className="container mid offer__jobs">
                <div className="search-bar">
                    <label>Search</label>
                    <input type="text" onChange={this.search} />
                    <SearchIcon></SearchIcon>
                </div>
                <div className="job-list">
                    {   this.state.jobNotFound?<p className="no-result">No Result Found</p>:
                        this.state.filterJobs.map((job) => {
                            return <JobListContainer job={job} key={job.job_id}></JobListContainer>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default OfferJobs;
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/presentation/Login';
import Contact from './components/presentation/Contact';
import Education from './components/presentation/Education';
import FinalizePage from './components/presentation/FinalizePage';
import Footer from './components/presentation/Footer';
import GettingStarted from './components/presentation/GettingStarted';
import Header from './components/presentation/Header';
import LandingPage from './components/presentation/LandingPage';
import './static/scss/App.scss'
import Register from './components/presentation/Register';
import { connect } from 'react-redux';
import HomePage from './components/Home/HomePage';
import JobDescription from './components/Home/JobDescription';
import UpdateDetails from './components/Home/UpdateDetails';
import { auth } from './firebase/firebase'
import AdminHomePage from './components/Admin/AdminHomePage';
import UpdateAdminDetails from './components/Admin/UpdateAdminDetails';
import JobDetails from './components/Admin/JobDetails';
import axios from "axios"
import PostJob from './components/Admin/PostJob';
import UpdateJob from './components/Admin/UpdateJob';
import Stats from './components/presentation/Stats';
import OfferJobs from './components/Admin/OfferJobs';
import Offers from './components/Admin/Offers';
import PlacedStudents from './components/Admin/PlacedStudents';
class App extends Component {
  state = { }
  componentDidMount(){
      auth.onAuthStateChanged((user)=>{
        if(user){
          this.props.addUser(user.uid);
          axios.get("/api/users/"+user.uid).then((res)=>{
            let{is_admin}=res.data.user;
            this.props.addAdmin(is_admin);
          })
        }else{
          this.props.addUser(null);
        }
      })
  }
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Switch>
          <Route path='/getting-started' component={GettingStarted} />
          <Route path='/contact' component={Contact} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/homepage' component={HomePage}/>
          <Route path='/settings' component={UpdateDetails}/>
          <Route path='/education' component={Education} />
          <Route path='/finalize' component={FinalizePage} />
          <Route path="/admin" component={AdminHomePage}/>
          <Route path="/placed" component={PlacedStudents}/>
          <Route path="/admin-job-details" component={JobDetails}/>
          <Route path="/update-job-desc" component={UpdateJob}/>
          <Route path="/admin-settings" component={UpdateAdminDetails}/>
          <Route path='/admin-offers' component={OfferJobs}/>
          <Route path='/offerpage' component={Offers}/>
          <Route path="/post-job" component={PostJob}/>
          <Route path='/stats' component={Stats}/>
          <Route path='/job-description' component={JobDescription} />
          <Route path='/' component={LandingPage} />
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.user };
}
const mapDispatchToProps=(dispatch)=>{
    return{
        addUser:(user)=>{dispatch({type:'ADD_USER',user:user})},
        addAdmin:(admin)=>{dispatch({type:'ADD_ADMIN',admin:admin})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);


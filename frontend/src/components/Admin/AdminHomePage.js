import React, { Component } from 'react'
import AdminProfile from './AdminProfile'
import MainHome from '../Home/MainHome'
class AdminHomePage extends Component {
    state = {}
    componentDidMount(){
        window.scroll(0, 0);
    }
    render() {
        return (
            <div className='homepage container mid'>
                <div className='home__userProfile'>
                    <AdminProfile></AdminProfile>
                </div>
                <div className="home__main">
                    <MainHome></MainHome>
                </div>

            </div>
        );
    }
}

export default AdminHomePage;

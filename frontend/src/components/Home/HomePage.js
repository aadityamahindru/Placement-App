import React, { Component } from 'react'
import MainHome from './MainHome'
import UserProfile from './UserProfile'
class HomePage extends Component {
    state = {}
    componentDidMount() {
        window.scroll(0, 0);
    }
    render() {
        return (
            <div className='homepage container mid'>
                <div className='home__userProfile'>
                    <UserProfile ></UserProfile>
                </div>
                <div className="home__main">
                    <MainHome></MainHome>
                </div>

            </div>
        )
    }
}

export default HomePage;

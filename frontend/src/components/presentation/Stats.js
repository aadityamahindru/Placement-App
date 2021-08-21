import React, { Component } from 'react';
import axios from "axios"
import Chart from "./Chart"
class Stats extends Component {
    state = {
        avgPackage: 0,
        maxPackage: 0,
        totalOffers: 0,
        stats: {}
    }
    componentDidMount() {
        window.scroll(0, 0);
        axios.get("/api/offers").then((res) => {
            this.setState({ avgPackage: res.data.avg })
        })
        axios.get("/api/offers/highest").then((res) => {
            this.setState({ maxPackage: res.data.max })
        })
        axios.get("/api/offers/total").then((res) => {
            this.setState({
                totalOffers: res.data.count,
            })
        })
    }
    render() {
        return (
            <div className="stats container mid">
                <div className="overall-details">
                    <div className="avg-package card shadow">
                        <p className="center blue-color">Average Package</p>
                        <p className="text-larger center">{"₹ " + this.state.avgPackage==0?0:this.state.avgPackage}</p>
                    </div>
                    <div className="highest-package card shadow">
                        <p className="center blue-color">Highest Package</p>
                        <p className="text-larger center">{"₹ " + this.state.maxPackage==0?0:this.state.maxPackage}</p>
                    </div>
                    <div className="avg-package card shadow">
                        <p className="center blue-color">Total Offers</p>
                        <p className="text-larger center">{!this.state.totalOffers?0:this.state.totalOffers}</p>
                    </div>
                </div>
                <div className="graph shadow">
                   <Chart></Chart>
                </div>
            </div>
        );
    }
}

export default Stats;
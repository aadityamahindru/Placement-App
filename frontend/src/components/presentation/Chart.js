import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from "axios";
function Chart() {
    const [chartData, setChartData] = useState({});
    const chart = () => {
        axios.get("/api/users/count").then((res)=>{
            console.log(res.data.dataArr)
            setChartData({
                labels: [ "Placed Students","Unplaced Students"],
                datasets: [
                    {
                        label: "Placement Statistics",
                        backgroundColor: [
                            '#00A6B4',
                            '#6800B4'
                        ],
                        hoverBackgroundColor: [
                            '#003350',
                            '#35014F'
                        ],
                        data: res.data.dataArr
                    }
                ]
            })
        })
    }
    useEffect(() => {
        chart();
    }, [])
    return (
        <div>
            <Pie
                data={chartData} width={600} 
                options={{
                    title: {
                        display: true,
                        text: 'Placement Record 2021',
                        fontSize: 25,
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }}
            />
        </div>
    );
}

export default Chart;

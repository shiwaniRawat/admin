import React from 'react'
import classes from "./Latest.module.css" ;  
import {Line} from 'react-chartjs-2'  ; 
export default function Latest() {
    
    const data = {
        labels: [],
        datasets: [
          {
            label: 'Latest Hits',
            data: []
          },
          {
            label: 'Popular Hits',
            data: []
          },
          {
            label: 'Featured',
            data: []
          }
        ]
      }
    
      const getChartData = () => {
    
        let tempData = data;
        const getCharts = JSON.parse(localStorage.getItem("ApiDataBase")).dasbhoardPage.latestHits;
    
        tempData.datasets[0].data = getCharts.latest;
        tempData.datasets[1].data = getCharts.popular;
        tempData.datasets[2].data = getCharts.featured;
    
        tempData.labels = getCharts.months;
    
        if (tempData.datasets) {
          let colors = ['#4bc0c0', '#ff6384', '#9966ff'];
          tempData.datasets.forEach((set, i) => {
            set.borderColor = colors[i];
            set.borderWidth = 3;
            set.fill = false
          });
        }
    
        return tempData;
      }
    
    return (

        <div className={classes.hits}>
        <div>
          <h2>Latest Hits</h2>
          <Line
            options={{
              responsive: true,
              legend: {
                labels: {
                  fontColor: "white",
                }
              },
              scales: {
                yAxes: [{
                  ticks: {
                    fontColor: "white",
                    stepSize: 10,
                    beginAtZero: false,
                    min: 10,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Hits',
                    fontColor: "white",
                  }
  
                }],
                xAxes: [{
                  ticks: {
                    fontColor: "white",
                  }
                }]
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }}
            data={getChartData}
          />
        </div>
      </div>

    )
}
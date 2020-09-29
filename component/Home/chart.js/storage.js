import React from 'react'
import classes from "./storage.module.css" 
import { Pie } from 'react-chartjs-2';
export default function storage() {

    const data = {
      labels: [],
      datasets: [{
        data: [],
        borderWidth: 2
      }],
  
    }
  
    const getChartData = () => {
  
      const getCharts = JSON.parse(localStorage.getItem("ApiDataBase")).dasbhoardPage.storage;
  
      const dependentData = Object.values(getCharts);
      const mainLabels = Object.getOwnPropertyNames(getCharts);
      const tempData = data;
  
      tempData.labels = [...mainLabels].map((item, pos) => {
        return item.charAt(0).toUpperCase() + `${item.slice(1)} Storage (${dependentData[pos]})`;
      });
  
      tempData.datasets[0].data = [...dependentData];
      tempData.datasets[0].backgroundColor = [
        '#a8d582', '#4ed6b8', '#f7604d'
      ]
  
      return tempData;
    }
  
  
    return (
      <div className={classes.storage}>
        <div>
          <h2>Storage Information</h2>
          <Pie height={200}
            options={{
              responsive: true,
              legend: {
                labels: {
                  fontColor: 'white',
                  fontSize: 14
                }
              }
            }}
            data={getChartData}
          />
        </div>
      </div>
    );
  }
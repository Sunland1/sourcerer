import React , {useState} from 'react'
import { GET_REPO } from '../api/github'
import { useQuery } from '@apollo/client'
import Chart from "react-google-charts";

import store from '../store'



function BarChart(){
    const {loading, error, data} = useQuery(GET_REPO);

    if(loading){
        return <p>Loading</p>
    }else{
        const repos = data.viewer.repositories
        const dataChart = {}
        for(let i = 0 ; i < repos.nodes.length ; i++){
            if(dataChart[repos.nodes[i].languages.nodes[0].name] !== undefined){
                dataChart[repos.nodes[i].languages.nodes[0].name] += 1
            }
            else{
                dataChart[repos.nodes[i].languages.nodes[0].name] = 0
            }
        }

        const dataChartTab = [['LAnguages' , 'nbRepos']]
        for (const property in dataChart) {
            dataChartTab.push([property, dataChart[property]])
          }

        return(
            <div className="flex flex-col rounded-md shadow-xl bg-gray-200 p-3 mb-48">
                    <div className="flex flex-row">
                        <h1 className="text-2xl mr-96">Bar Chart</h1>
                    </div>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={dataChartTab}
                        options={{
                            title: 'TOP 5 des languages utiliser pour un repos',
                            chartArea: { width: '50%' },
                            hAxis: {
                            title: 'Total',
                            minValue: 0,
                            },
                            vAxis: {
                            title: 'Languages',
                            },
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '1' }}
                    />
            </div>
        )
    }
}



export default BarChart;
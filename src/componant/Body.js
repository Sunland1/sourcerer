import React from 'react'
import Repositories from './Repositories'
import BarChart from './BarChart'


function Body(){
    return(
        <div className="flex flex-col items-center mt-32">
            <BarChart/>
            <Repositories/>
        </div>
    )
}




export default Body
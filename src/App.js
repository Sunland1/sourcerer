import React, { useEffect, useState } from 'react'
import { GET_REPO,GET_VIEWER } from './api/github';
import {useLazyQuery,useQuery } from '@apollo/client';
import './styles/App.css';
import Sourcerer from './pages/Sourcerer';
import store from './store';






function App() {

  const {loading, error, data} = useQuery(GET_VIEWER);

  if(loading){
    return <p>Loading</p>
  }else{
    store.dispatch({type: "CREATE_USER" , data})
    return(
      <> 
        <Sourcerer/>
      </>
    )
  }
}     

export default App;

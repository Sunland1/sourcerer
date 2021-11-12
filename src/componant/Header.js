import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowCircleDown} from '@fortawesome/free-solid-svg-icons'

import store from '../store'
import { GET_REPO_LOC } from '../api/github'
import { useQuery } from '@apollo/client'

function Header(){
    const user = store.getState().user
    const {loading , error , data } = useQuery(GET_REPO_LOC)

    function reload(){
        window.location.reload()
    }

    if(loading){
        return <p>Loading</p>
    }else{
        let loc = 0
        const dataRepo = data.viewer.repositories.nodes
        for(let i = 0 ; i < dataRepo.length ; i++ ){
            for(let j = 0 ; j < dataRepo[i].object.entries.length ; j++ ){
                if(dataRepo[i].object.entries[j].object.text !== undefined && dataRepo[i].object.entries[j].object.text != null){
                    loc += dataRepo[i].object.entries[j].object.text.split(/\r\n|\r|\n/).length
                }
            }
        }
        return(
            <div className="flex flex-col shadow items-center bg-gray-100 w-screen">
                <div className="flex flex-col items-center mb-10">
                    <h1 className="text-2xl m-5 text-center">{user.username}</h1>
                    <div className="flex flex-col rounded-full bg-black p-1 w-20 h-20 shadow-xl">
                        <img src={user.urlPhoto} alt="Image de l'utilisateur github" className="flex-1 rounded-full"/>
                    </div>
                </div>
                <div className="flex flex-row absolute top-36 items-center">
                    <div className="bg-gray-200 rounded-md shadow-md p-4 m-5">
                        <p>Commits</p>
                        <p>{user.nbCommit}</p>
                    </div>
                    <div className="bg-gray-200 rounded-md shadow-md p-4 m-5">
                        <p>Repos</p>
                        <p>{user.nbRepos}</p>
                    </div>
                    <div className="bg-gray-200 rounded-md shadow-md p-4 m-5">
                        <p>Lines of code</p>
                        <p>{loc}</p>
                    </div>
                    <div className="bg-gray-200 flex-1 rounded-md shadow-md p-4 m-5">
                        <p>Followers</p>
                        <p>{user.nbFollowers}</p>
                    </div>
                    <div className="bg-green-100 flex-1 rounded-md shadow-md p-4 m-5">
                        <p>Following</p>
                        <p>{user.nbFollowing}</p>
                    </div>
                    <div className="bg-green-100 flex-1 rounded-md shadow-md p-4 m-5">
                        <button onClick={() => reload()}>
                            Refresh
                            <FontAwesomeIcon icon={faArrowCircleDown}/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    
}



export default Header;
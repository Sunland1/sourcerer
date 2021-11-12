import React , {useState} from 'react'
import { GET_REPO } from '../api/github'
import { useQuery } from '@apollo/client'


import store from '../store'
import ControlledPopup from './ControlledPopup'



function Repositories(){
    const user = store.getState().user
    const date = new Date()

    const {loading, error, data} = useQuery(GET_REPO);

    if(loading){
        return <p>Loading</p>
    }else{
        store.dispatch({type: "CREATE_REPO" , data})
        const repos = data.viewer.repositories
        const contributionRepo = data.viewer.contributionsCollection.commitContributionsByRepository
        const row_repositories = []
        for(let i = 0 ; i < repos.nodes.length ; i ++ ){
            for(let j = 0 ; j < contributionRepo.length ; j++){
                if(repos.nodes[i].name === contributionRepo[j].repository.name){
                    row_repositories.push(
                        <div className="flex flex-row mt-5 p-5 bg-gray-400 rounded-md">
                                <p className="mr-40">{repos.nodes[i].name}</p>
                                <p className="mr-20">{contributionRepo[j].contributions.totalCount}</p>
                                <p className="mr-20">{repos.nodes[i].collaborators.totalCount}</p>
                                <p className="mr-12">{repos.nodes[i].languages.nodes[0].name}</p>
                                <ControlledPopup repo={repos.nodes[i]}/>
                        </div>
                    )
                }
            }
        }

        return(
            <div className="flex flex-col rounded-md shadow-xl bg-gray-200 p-3">
                <div className="flex flex-row">
                    <h1 className="text-2xl mr-96">Repositories</h1>
                    <div>
                        <p>{user.nbRepos} repos</p>
                        <p>Last updated : {date.toDateString()}</p>
                    </div>
                </div>
                <div className="flex flex-row mt-5 p-5 bg-gray-300 rounded-md">
                        <p className="mr-5">#</p>
                        <p className="mr-32">Repository</p>
                        <p className="mr-12">Commits</p>
                        <p className="mr-12">Team</p>
                        <p className="mr-12">Language</p>
                </div>
                {row_repositories}
            </div>
        )
    }
    
    
}






export default Repositories
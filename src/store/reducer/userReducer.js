export default function user(state = {}, action){
    const data = action.data
    switch(action.type){
        case "CREATE_USER" : 
            return {
                username: data.viewer.login,
                urlPhoto: data.viewer.avatarUrl,
                nbCommit: data.viewer.contributionsCollection.totalCommitContributions,
                nbRepos: data.viewer.repositories.totalCount,
                LOC: null,
                nbFollowers: data.viewer.followers.totalCount,
                nbFollowing: data.viewer.following.totalCount
            } 
        default : 
            return state
    }
}
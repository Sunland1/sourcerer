export default function repository(state = {}, action){
    const data = action.data
    switch(action.type){
        case "CREATE_REPO" :
            state = data.viewer
            return state
        default : 
            return state
    }
}
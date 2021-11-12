import { combineReducers } from "redux";
import counter from './counterReducer'
import user from './userReducer'
import repo from './repositoryReducer'

export default combineReducers({
    counter,
    user,
    repo
})
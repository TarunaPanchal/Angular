import { ACTION_LOGOUT, ACTION_LOGIN } from '../actions/appActions'


export interface appReducerState {
    login: boolean
}

const initalState: appReducerState = {
    login: false
}

export function reducer(state = initalState , action): appReducerState{
    switch(action.type){
        case ACTION_LOGOUT:
         return {
             ...state,
             login: false
         }
         case ACTION_LOGIN:
          return {
            ...state,
            login: true
          }
    }
    return state
}
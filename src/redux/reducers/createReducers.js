

const createReducer = (state={data:null}, action)=>{
    switch (action.type) {
        case 'products':
          return {...state, data: action?.data};
        default:
          return state
    }

}



export default createReducer

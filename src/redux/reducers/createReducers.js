

const createReducer =(state={data:null}, action)=>{
    // console.log(action.data)
    switch (action.type) {
        case 'products':
          return {...state, data: action?.data};
        default:
          return state
    }

}

// function tourData(state={data:null}, action) {
//     switch (action.type) {
//       case 'tour':
//         return {...state, data: action?.data};
//       default:
//         return state
//     }
// }


export default createReducer
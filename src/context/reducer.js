export const initialState = {
    User : null,
    set_open : null,
    imageUrl : null,
    Caption : '',
    Setsubmit : null
}

const reducer = (state, action) => {


    switch(action.type){

        
        case 'SET_USER':
            return {
                ...state, 
                User : action.item 
            }
        

        case 'SET_OPEN':
            return {
                ...state,
                set_open : action.item
                
            }
        
        case 'CAPTION':
            return {
                ...state,
                caption : action.item
                
            }

        case 'SUBMIT':
            return {
                ...state,
                Setsubmit : action.item
                
            }
        
        case 'IMAGE':
            return {
                ...state,
                imageUrl : action.item
                
            }

        default:
            return state;
    }
}

export default reducer;
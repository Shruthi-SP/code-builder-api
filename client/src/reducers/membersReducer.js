const membersInitialValue = []

const membersReducer = (state = membersInitialValue, action) => {
    switch (action.type) {
        case 'ALL_MEMBERS': {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}
export default membersReducer
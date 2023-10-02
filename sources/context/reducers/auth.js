import { REGISTER_CLEAR_STATE, REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS } from "../../constants/actionTypes";

const authReducer = (state, { type, payload }) => {

    switch (type) {
        case REGISTER_LOADING:
            return {
                ...state,
                loading: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload
            }
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case REGISTER_CLEAR_STATE:
            return {
                ...state,
                loading: false,
                data: null,
                error:null
            }
        default:
            return state
    }
}
export default authReducer;
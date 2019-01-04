import { 
    RECEIVE_POSTS, 
    UPDATE_POST_COMMENTS_COUNT,
    UPDATE_POST_VOTE_SCORE,
    DELETE_POST,
    ADD_POST
} from '../actions/posts'

export default function posts (state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS : 
            return {
                ...state,
                ...action.posts
            }
        case UPDATE_POST_COMMENTS_COUNT :
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    commentCount: action.commentCount
                }
            }
        case UPDATE_POST_VOTE_SCORE :
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    voteScore: action.voteScore
                }
            }
        case DELETE_POST :
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    deleted: true
                }
            }
        case ADD_POST :
            return {
                ...state,
                [action.post.id]: action.post
            }
        default : 
            return state
    }
}
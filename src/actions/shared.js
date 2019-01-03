import { showLoading, hideLoading } from 'react-redux-loading'
import { getInitialData } from '../api/ReadableAPI'
import { receiveCategories } from '../actions/categories'
import { receivePosts } from '../actions/posts'

export function handleInitialData () {
    return (dispatch) => {

        dispatch(showLoading())

        getInitialData().then((data) => {
            dispatch(receivePosts(data.posts))
            dispatch(receiveCategories(data.categories))
            dispatch(hideLoading())
        })
    }
}
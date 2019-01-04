import { showLoading, hideLoading } from 'react-redux-loading'
import { getComments, saveComment, voteComment, removeComment } from '../api/ReadableAPI'
import { updatePostCommentsCount } from '../actions/posts'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT_VOTE_SCORE = 'UPDATE_COMMENT_VOTE_SCORE'
export const DELETE_COMMENT = 'DELETE_COMMENT'


function addComment (comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function handleAddComment (comment) {
    return (dispatch, getState) => {
        
        const { posts } = getState()
        const commentCount = posts[comment.parentId].commentCount+1

        dispatch(showLoading())

        return saveComment(comment)
            .then(res => dispatch(addComment(res)))
            .then(() => dispatch(updatePostCommentsCount(comment.parentId, commentCount)))
            .then(() => dispatch(hideLoading()))
    }
}

function receiveComments (comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export function handleReceiveComments (postId) {
    return (dispatch) => {
        dispatch (showLoading())
        return getComments(postId)
            .then((data) => dispatch(receiveComments(data)))
            .then(() => dispatch(hideLoading()))
    }
}

function updateCommentVoteScore(commentId, voteScore) {
    return {
        type: UPDATE_COMMENT_VOTE_SCORE,
        commentId,
        voteScore
    }
}

export function handleUpdateCommentVoteScore(commentId, option) {
    return (dispatch) => {
        dispatch(showLoading())
        return voteComment(commentId, option)
            .then((res) => dispatch(updateCommentVoteScore(commentId, res.voteScore)))
            .then(() => dispatch(hideLoading()))
    }
}

function deleteComment(commentId) {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export function handleDeleteComment(commentId) {
    return (dispatch, getState) => {

        const { posts, comments } = getState()
        const parentId = comments[commentId].parentId
        const commentCount = posts[parentId].commentCount-1
        console.log('comment count', commentCount)
        dispatch(showLoading())
        return removeComment(commentId)
            .then(() => dispatch(deleteComment(commentId)))
            .then(() => dispatch(updatePostCommentsCount(parentId, commentCount)))
            .then(() => dispatch(hideLoading()))
    }
}
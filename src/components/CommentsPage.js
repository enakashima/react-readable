import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleReceiveComments } from '../actions/comments'
import Post from './Post'
import Comment from './Comment'
import NewComment from './NewComment'

class CommentsPage extends Component {

    componentDidMount() {
        const { postId } = this.props.match.params
        this.props.dispatch(handleReceiveComments(postId))
    }

    render () {
        const { comments } = this.props
        const { postId } = this.props.match.params
        
        return (
            <Fragment>
                <ul>
                    <li>
                        <Post id={postId} redirectOnDelete='/'/>
                    </li>
                    <li><NewComment postId={postId}/></li>
                    <li><h3 className='center'>Comments</h3></li>
                    {comments.map((commentId) => (
                        <li key={commentId}>
                            <Comment id={commentId} />
                        </li>
                    ))}
                </ul>
                

            </Fragment>
        )
    }
}

function mapStateToProps({ comments }, props) {
    const { postId } = props.match.params
    return {
        comments: 
            Object.keys(comments).filter((commentId) => comments[commentId].parentId === postId && comments[commentId].deleted === false)
            .sort((a, b) => comments[b].timestamp - comments[a].timestamp)
    }
}

export default connect(mapStateToProps)(CommentsPage)
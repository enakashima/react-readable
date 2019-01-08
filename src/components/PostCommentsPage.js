import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleReceiveComments } from '../actions/comments'
import Post from './Post'
import Comment from './Comment'
import NewComment from './NewComment'
import { comment } from 'postcss-selector-parser';

class CommentsPage extends Component {

    componentDidMount() {
        const { postId } = this.props.match.params
        this.props.dispatch(handleReceiveComments(postId))
    }

    render () {
        const { comments } = this.props
        const { postId } = this.props.match.params
        
        console.log('comments', comments)

        return (
            <ul>
                <li>
                    <Post id={postId} redirectOnDelete='/'/>
                </li>
                <li><NewComment postId={postId}/></li>
                
                <li className='center'>
                    {comments.length !== 0 
                        ? <h3>Comments</h3>
                        : 'No comments yet!'
                    }
                </li>

                {comments.map((commentId) => (
                    <li key={commentId}>
                        <Comment id={commentId} />
                    </li>
                ))}
            </ul>
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
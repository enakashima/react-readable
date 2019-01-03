import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { FaComment, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { TiDelete} from 'react-icons/ti'
import { Redirect } from 'react-router-dom'

import { handleUpdatePostVoteScore, handleDeletePost } from '../actions/posts'

class Post extends Component {

    state = {
        deleted : false
    }

    handleDelete = (e) => {
        e.preventDefault()
        const { dispatch, redirectOnDelete } = this.props
        
        dispatch(handleDeletePost(this.props.id))

        if(redirectOnDelete) {
            this.setState({deleted: true})
        }
    }

    handleDislike = (e) => {
        e.preventDefault()
        this.handleVoteScoreChange('downVote')
    }

    handleLike = (e) => {
        e.preventDefault()
        this.handleVoteScoreChange('upVote')
    }

    handleVoteScoreChange(option) {
        const { dispatch, id } = this.props

        dispatch(handleUpdatePostVoteScore(id, option))
    }

    render () {
        const { id, redirectOnDelete } = this.props
        const { deleted } = this.state
        const { author, body, category, commentCount, timestamp, title, voteScore } = this.props.post

        if(deleted) {
            return <Redirect to={redirectOnDelete}/>
        }

        return (
            <Link to={`/post/${id}`} className='card'>
                <div className='remove-button'>
                    <button 
                        className='icon-button'
                        onClick={this.handleDelete}>
                        <TiDelete />
                    </button> 
                </div>
                <span className='title'>{title}</span>
                <div className='timestamp'>{formatDate(timestamp)} - {category}</div>
                <div className='author'>Author: @{author}</div>
                <p className='body'>{body}</p>
                <div className='card-footer'>
                    <FaComment />
                    <span>{commentCount}</span>
                    <button 
                        className='icon-button-thumbs-down'
                        onClick={this.handleDislike}>
                        <FaThumbsDown />
                    </button>
                    <button 
                        className='icon-button-thumbs-up'
                        onClick={this.handleLike}>
                        <FaThumbsUp />
                    </button>
                    <span className='vote-score'>{voteScore}</span>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({posts}, {id}) {
    return {
        post: posts[id]
    }
}

export default connect(mapStateToProps)(Post)
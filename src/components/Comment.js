import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { handleUpdateCommentVoteScore } from '../actions/comments'

class Comment extends Component {

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

        dispatch(handleUpdateCommentVoteScore(id, option))
    }

    render () {

        const { author, timestamp, body, voteScore} = this.props.comment

        return (
            <div className='card'>
                <div className='timestamp'>{formatDate(timestamp)}</div>
                <div className='author'>Author: @{author}</div>
                <p className='body'>{body}</p>
                <div className='card-footer'>
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
            </div>
        )
    }
}

function mapStateToProps({ comments }, { id }) {
    return {
        comment: comments[id]
    }
}

export default connect(mapStateToProps)(Comment)
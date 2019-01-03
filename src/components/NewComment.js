import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddComment } from '../actions/comments'
import { generateUID } from '../utils/helpers'

class NewComment extends Component {

    state = {
        name: '',
        comment: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const comment = {
            id: generateUID(),
            timestamp: new Date().getTime(),
            body: this.state.comment,
            author: this.state.name ? this.state.name : 'anonymous',
            parentId: this.props.postId
        }

        this.props.dispatch(handleAddComment(comment))

        this.setState(() => ({
            name: '',
            comment: ''
        }))
    }

    handleNameChange = (e) => {
        const name = e.target.value;

        this.setState({
            name
        })
    }

    handleCommentChange = (e) => {
        const comment = e.target.value;

        this.setState({
            comment
        })
    }

    render () {
        const { name, comment } = this.state

        return (
            <div>
                <form className='comment-form' onSubmit={this.handleSubmit}>
                    <input 
                        type='text' 
                        placeholder='Your name' 
                        className='input'
                        value={name}
                        onChange={this.handleNameChange}
                        maxLength={20} />
                    <textarea 
                        className='textarea'
                        placeholder="What's in your mind?"
                        maxLength={300} 
                        value={comment}
                        onChange={this.handleCommentChange}/>
                    <button 
                        type='submit' 
                        className='btn'
                        disabled={'' === comment}>
                        SUBMIT
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewComment)
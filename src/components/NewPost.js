import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPost } from '../actions/posts'
import { generateUID } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

class NewPost extends Component {

    state = {
        name: '',
        post: '',
        category: '',
        title: '',
        created: false
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const post = {
            id: generateUID(),
            timestamp: new Date().getTime(),
            title: this.state.title,
            body: this.state.post,
            author: this.state.name ? this.state.name : 'anonymous',
            category: this.state.category
        }

        this.props.dispatch(handleAddPost(post))

        this.setState(() => ({
            name: '',
            post: '',
            category: '',
            title: '',
            created: true
        }))
    }

    handleCategoryChange = (e) => {
        const category = e.target.value;
        this.setState({
            category
        })
    }

    handleTitleChange = (e) => {
        const title = e.target.value;
        this.setState({
            title
        })
    }

    handleNameChange = (e) => {
        const name = e.target.value;
        this.setState({
            name
        })
    }

    handlePostChange = (e) => {
        const post = e.target.value;
        this.setState({
            post
        })
    }

    render () {
        const { name, post, category, title, created } = this.state

        if(created) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <form className='form' onSubmit={this.handleSubmit}>
                    <select 
                        className={category === '' ? 'input default-selected' : 'input'}
                        value={category}
                        onChange={this.handleCategoryChange}>
                        <option default >Select the Category</option>
                        {Object.keys(this.props.categories).map((key) => (
                            <option key={key} value={this.props.categories[key].name}>{this.props.categories[key].name}</option>
                        ))}
                    </select>
                    <input 
                        type='text' 
                        placeholder='Your name' 
                        className='input'
                        value={name}
                        onChange={this.handleNameChange}
                        maxLength={20} />
                    <input 
                        type='text' 
                        placeholder="What's that post about?" 
                        className='input'
                        value={title}
                        onChange={this.handleTitleChange}
                        maxLength={60} />
                    <textarea 
                        className='textarea'
                        placeholder="What's in your mind?"
                        maxLength={300} 
                        value={post}
                        onChange={this.handlePostChange}/>
                    <button 
                        type='submit' 
                        className='btn'
                        disabled={post === '' || category === '' || title === ''}>
                        SUBMIT
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ categories }) {
    return {
        categories
    }
}
export default connect(mapStateToProps)(NewPost)
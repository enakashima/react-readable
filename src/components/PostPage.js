import React, { Component    } from 'react'
import { connect } from 'react-redux'
import Post from './Post'

class Posts extends Component {
    render () {
        const { posts } = this.props
        
        return (
            <ul>
                {posts.map((id) => (
                    <li key={id}>
                        <Post id={id} />
                    </li>
                ))}
            </ul>
        )
    }
}

function mapStateToProps ({posts}) {
    return {
        posts: Object.keys(posts)
            .filter(key => !posts[key].deleted)
            .sort((a,b) => posts[b].timestamp - posts[a].timestamp)
    }
}

export default connect(mapStateToProps)(Posts)
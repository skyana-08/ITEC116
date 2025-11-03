import { useState } from 'react'
import PostList from '../Postings/PostList.jsx'
import CreatePost from '../Postings/CreatePost.jsx'

const Dashboard = ({ currentUser, onLogout }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Welcome to Our Blog Platform',
      content: 'This is a sample blog post demonstrating our platform features. You can create posts, add comments, and interact with other users.',
      author: 'Admin',
      createdAt: '2024-01-15',
      comments: [
        { id: 1, text: 'Great post! Looking forward to more content.', author: 'Jane Doe', createdAt: '2024-01-16' },
        { id: 2, text: 'Very informative, thanks for sharing!', author: 'John Smith', createdAt: '2024-01-16' }
      ]
    },
    {
      id: 2,
      title: 'Getting Started with React',
      content: 'React is a powerful JavaScript library for building user interfaces. Here are some tips for beginners:\n\n1. Start with functional components\n2. Learn hooks early\n3. Practice with small projects\n4. Understand the component lifecycle',
      author: 'React Expert',
      createdAt: '2024-01-14',
      comments: [
        { id: 3, text: 'This helped me understand React better!', author: 'Mike Johnson', createdAt: '2024-01-15' }
      ]
    }
  ])

  const handleCreatePost = (newPost) => {
    const post = {
      id: posts.length + 1,
      ...newPost,
      author: currentUser.name,
      createdAt: new Date().toISOString().split('T')[0],
      comments: []
    }
    setPosts(prev => [post, ...prev])
    setShowCreateModal(false)
  }

  const handleAddComment = (postId, commentText) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: post.comments.length + 1,
          text: commentText,
          author: currentUser.name,
          createdAt: new Date().toISOString().split('T')[0]
        }
        return {
          ...post,
          comments: [...post.comments, newComment]
        }
      }
      return post
    }))
  }

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId))
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-welcome">
            <h1>Blog Platform</h1>
            <p>Welcome back, {currentUser.name}!</p>
          </div>
          <div className="dashboard-actions">
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              Create Post
            </button>
            <button 
              className="btn btn-secondary"
            >
              View Posts
            </button>
            <button 
              className="btn btn-danger"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <PostList 
        posts={posts}
        currentUser={currentUser}
        onAddComment={handleAddComment}
        onDeletePost={handleDeletePost}
      />

      <CreatePost 
        onCreatePost={handleCreatePost}
        onCancel={() => setShowCreateModal(false)}
        isOpen={showCreateModal}
      />
    </div>
  )
}

export default Dashboard
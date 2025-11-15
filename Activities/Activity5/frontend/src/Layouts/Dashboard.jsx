import { useState, useEffect } from 'react'
import PostList from '../Postings/PostList.jsx'
import CreatePost from '../Postings/CreatePost.jsx'

const Dashboard = ({ currentUser, onLogout }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [posts, setPosts] = useState([])
  const [viewMyPosts, setViewMyPosts] = useState(false)
  const [editingPostData, setEditingPostData] = useState(null) // EDIT modal state

  const getToken = () => localStorage.getItem('token')

  // POLLING: fetch posts every 3 seconds
  useEffect(() => {
    const fetchPosts = () => {
      fetch('http://localhost:3000/posts')
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(err => console.log('Fetch posts error:', err))
    }

    fetchPosts()
    const interval = setInterval(fetchPosts, 3000)

    return () => clearInterval(interval)
  }, [])

  // CREATE POST
  const handleCreatePost = async (newPost) => {
    try {
      const token = getToken()
      const res = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ...newPost, author: currentUser.name })
      })
      if (!res.ok) throw new Error('Failed to create post')
      const createdPost = await res.json()
      setPosts(prev => [createdPost, ...prev])
      setShowCreateModal(false)
    } catch (err) { console.log(err) }
  }

  // UPDATE POST
  const handleUpdatePost = async (postId, updatedData) => {
    try {
      const token = getToken()
      const res = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      })
      if (!res.ok) throw new Error('Failed to update post')
      const updatedPost = await res.json()
      setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p))
    } catch (err) { console.log(err) }
  }

  // COMMENT HANDLERS
  const handleAddComment = async (postId, text) => {
    try {
      const token = getToken()
      const res = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text, author: currentUser.name })
      })
      if (!res.ok) throw new Error('Failed to add comment')
      const updatedPost = await res.json()
      setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p))
    } catch (err) { console.log(err) }
  }

  const handleUpdateComment = async (postId, commentId, text) => {
    try {
      const token = getToken()
      const res = await fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text })
      })
      if (!res.ok) throw new Error('Failed to update comment')
      const updatedComment = await res.json()
      setPosts(prev => prev.map(p => {
        if (p.id === postId) {
          return { ...p, comments: p.comments.map(c => c.id === updatedComment.id ? updatedComment : c) }
        }
        return p
      }))
    } catch (err) { console.log(err) }
  }

  const handleDeletePost = async (postId) => {
    try {
      const token = getToken()
      const res = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to delete post')
      setPosts(prev => prev.filter(p => p.id !== postId))
    } catch (err) { console.log(err) }
  }

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const token = getToken()
      const res = await fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to delete comment')
      setPosts(prev => prev.map(p => {
        if (p.id === postId) {
          return { ...p, comments: p.comments.filter(c => c.id !== commentId) }
        }
        return p
      }))
    } catch (err) { console.log(err) }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    onLogout()
  }

  const displayedPosts = viewMyPosts
    ? posts.filter(p => p.author === currentUser.name || p.authorName === currentUser.name)
    : posts

  return (
    <div className="container">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-welcome">
            <h1>Blog Platform</h1>
            <p>Welcome back, {currentUser.name}!</p>
          </div>
          <div className="dashboard-actions">
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>Create Post</button>
            <button className="btn btn-secondary" onClick={() => setViewMyPosts(prev => !prev)}>
              {viewMyPosts ? 'View All Posts' : 'View My Posts'}
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <PostList 
        posts={displayedPosts}
        currentUser={currentUser}
        onAddComment={handleAddComment}
        onDeletePost={handleDeletePost}
        onUpdatePost={handleUpdatePost}
        onDeleteComment={handleDeleteComment}
        onUpdateComment={handleUpdateComment}
        onEditPost={(post) => setEditingPostData({ id: post.id, title: post.title, content: post.content })}
      />

      {showCreateModal && (
        <CreatePost 
          onCreatePost={handleCreatePost}
          onCancel={() => setShowCreateModal(false)}
          isOpen={true}
        />
      )}

      {editingPostData && (
        <CreatePost
          onCreatePost={(updatedPost) => {
            handleUpdatePost(editingPostData.id, updatedPost)
            setEditingPostData(null)
          }}
          onCancel={() => setEditingPostData(null)}
          isOpen={true}
          initialData={editingPostData}
          mode="edit"
        />
      )}
    </div>
  )
}

export default Dashboard

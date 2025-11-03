import { useState } from 'react'

const Post = ({ post, currentUser, onAddComment, onDeletePost }) => {
  const [newComment, setNewComment] = useState('')
  const [showComments, setShowComments] = useState(true)

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(post.id, newComment.trim())
      setNewComment('')
    }
  }

  const canDelete = post.author === currentUser.name

  return (
    <div className="note-card">
      <div className="note-header">
        <div style={{ flex: 1 }}>
          <h3 className="note-title">{post.title}</h3>
          <div className="note-meta">
            <small>By {post.author} • {post.createdAt}</small>
          </div>
        </div>
        {canDelete && (
          <button 
            className="btn btn-danger"
            onClick={() => onDeletePost(post.id)}
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
        )}
      </div>

      <div className="note-content">
        <pre>{post.content}</pre>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button 
          className="btn btn-secondary"
          onClick={() => setShowComments(!showComments)}
          style={{ marginBottom: '15px' }}
        >
          {showComments ? 'Hide' : 'Show'} Comments ({post.comments.length})
        </button>

        {showComments && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              {post.comments.map(comment => (
                <div key={comment.id} style={{ 
                  padding: '12px', 
                  marginBottom: '8px', 
                  backgroundColor: 'var(--background-light)',
                  borderRadius: '6px',
                  border: '1px solid var(--primary-medium)'
                }}>
                  <div style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>
                    {comment.author}
                  </div>
                  <div style={{ margin: '4px 0' }}>{comment.text}</div>
                  <small style={{ color: 'var(--text-medium)' }}>{comment.createdAt}</small>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmitComment}>
              <div className="form-group">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows="2"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Comment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Post
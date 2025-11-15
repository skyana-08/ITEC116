import Post from './Post.jsx'

const PostList = ({ 
  posts, 
  currentUser, 
  onAddComment, 
  onDeletePost, 
  onUpdatePost, 
  onDeleteComment, 
  onUpdateComment,
  onEditPost
}) => {
  return (
    <div>
      <h2>Recent Posts</h2>
      <div className="notes-grid">
        {posts.length === 0 ? (
          <div className="note-card">
            <p>No posts yet. Be the first to create one!</p>
          </div>
        ) : (
          posts.map(post => (
            <Post
              key={post.id}
              post={post}
              currentUser={currentUser}
              onAddComment={onAddComment}
              onDeletePost={onDeletePost}
              onUpdatePost={onUpdatePost}
              onDeleteComment={onDeleteComment}
              onUpdateComment={onUpdateComment}
              onEditPost={onEditPost}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default PostList

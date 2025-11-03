import React, { useState } from 'react';

const NoteForm = ({ onSubmit, initialData = {}, onCancel, submitText = 'Create Note' }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Tab key in textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      
      // Insert tab character at cursor position
      const newContent = formData.content.substring(0, start) + '\t' + formData.content.substring(end);
      
      setFormData({
        ...formData,
        content: newContent
      });
      
      // Set cursor position after the tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      }, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      onSubmit(formData);
      // Only reset if it's a new note (not editing)
      if (!initialData.id) {
        setFormData({ title: '', content: '' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-card">
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="Note Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          name="content"
          placeholder="Note Content"
          value={formData.content}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Add tab key handler
          required
          style={{
            fontFamily: 'monospace', // Use monospace for better alignment
            whiteSpace: 'pre', // Preserve whitespace in textarea
          }}
        />
      </div>
      <div className="note-actions">
        <button type="submit" className="btn btn-primary">
          {submitText}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
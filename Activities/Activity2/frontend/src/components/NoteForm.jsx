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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      onSubmit(formData);
      setFormData({ title: '', content: '' });
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
          required
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
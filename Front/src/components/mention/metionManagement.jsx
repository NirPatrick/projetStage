import React, { useState, useEffect } from 'react'
import Form from '../Form/Form'

const MentionManagement = () => {
  const [mentions, setMentions] = useState([])
  const [selectedMention, setSelectedMention] = useState(null)

  useEffect(() => {
    fetchMentions()
  }, [])

  const fetchMentions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mentions')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setMentions(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching mentions:', error)
      setMentions([])
    }
  }

  const handleSubmit = async (formData) => {
    try {
      const method = selectedMention ? 'PUT' : 'POST'
      const url = selectedMention
        ? `http://localhost:5000/api/mentions/${selectedMention._id}`
        : 'http://localhost:5000/api/mentions'

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      fetchMentions()
      setSelectedMention(null)
    } catch (error) {
      console.error('Error saving mention:', error)
    }
  }

  const handleEdit = (mention) => {
    setSelectedMention(mention)
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/mentions/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      fetchMentions()
    } catch (error) {
      console.error('Error deleting mention:', error)
    }
  }

  const formFields = [
    { name: 'Nom', type: 'text' },
    { name: 'id_etablissement', type: 'text' }, // Ensure this matches the type in the schema
    { name: 'matiere', type: 'textarea' },
    { name: 'langue_d_enseignement', type: 'text' },
    { name: 'capaciter_d_accueil', type: 'number' },
  ]

  return (
    <div className="mention-management">
      <h2>Mention Management</h2>
      <Form data={formFields} onSubmit={handleSubmit} />

      <h3>Mentions List</h3>
      <ul>
        {Array.isArray(mentions) && mentions.length > 0 ? (
          mentions.map((mention) => (
            <li key={mention._id}>
              {mention.Nom}
              <button onClick={() => handleEdit(mention)}>Edit</button>
              <button onClick={() => handleDelete(mention._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No mentions found</li>
        )}
      </ul>
    </div>
  )
}

export default MentionManagement

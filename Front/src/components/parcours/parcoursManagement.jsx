import React, { useState, useEffect } from 'react'
import Form from '../Form/Form'

const ParcoursManagement = () => {
  const [parcours, setParcours] = useState([])
  const [selectedParcours, setSelectedParcours] = useState(null)

  useEffect(() => {
    fetchParcours()
  }, [])

  const fetchParcours = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/parcours')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setParcours(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching parcours:', error)
      setParcours([])
    }
  }

  const handleSubmit = async (formData) => {
    try {
      const method = selectedParcours ? 'PUT' : 'POST'
      const url = selectedParcours
        ? `http://localhost:5000/api/parcours/${selectedParcours._id}`
        : 'http://localhost:5000/api/parcours'

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

      fetchParcours()
      setSelectedParcours(null)
    } catch (error) {
      console.error('Error saving parcours:', error)
    }
  }

  const handleEdit = (parcours) => {
    setSelectedParcours(parcours)
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/parcours/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      fetchParcours()
    } catch (error) {
      console.error('Error deleting parcours:', error)
    }
  }

  const formFields = [
    { name: 'id_mention', type: 'text' }, // Ensure this matches the type in the schema
    { name: 'dure_etude', type: 'textarea' },
    { name: 'condition_d_access', type: 'textarea' },
    { name: 'debouche', type: 'text' },
    { name: 'vocation', type: 'text' },
  ]

  return (
    <div className="parcours-management">
      <h2>Parcours Management</h2>
      <Form data={formFields} onSubmit={handleSubmit} />

      <h3>Parcours List</h3>
      <ul>
        {Array.isArray(parcours) && parcours.length > 0 ? (
          parcours.map((parcours) => (
            <li key={parcours._id}>
              {parcours.dure_etude} - {parcours.condition_d_access}
              <button onClick={() => handleEdit(parcours)}>Edit</button>
              <button onClick={() => handleDelete(parcours._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No parcours found</li>
        )}
      </ul>
    </div>
  )
}

export default ParcoursManagement

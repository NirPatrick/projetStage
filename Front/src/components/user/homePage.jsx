import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../Form/Form' // Adjust the import path based on your file structure

const HomePage = () => {
  const [universities, setUniversities] = useState([])
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUniversities()
  }, [])

  const fetchUniversities = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/universities')
      if (!response.ok) {
        throw new Error('Failed to fetch universities')
      }
      const data = await response.json()
      setUniversities(data)
    } catch (error) {
      console.error('Error fetching universities:', error)
    }
  }

  const handleButtonClick = () => {
    navigate('/universityManagement')
  }

  const handleManageClick = () => {
    setShowForm(true)
  }

  const handleFormSubmit = (formData) => {
    // Check if the university exists in the collection
    const university = universities.find(univ =>
      univ.nomAdmin === formData.nomAdmin &&
      univ.Nom_Univ === formData.Nom_Univ &&
      univ.password === formData.password
    )

    if (university) {
      sessionStorage.setItem('universityAdmin', JSON.stringify(university))
      alert('University admin information saved!')
      setShowForm(false)
      navigate('/etablissementManagement')
    } else {
      alert('University admin information not found. Please check your credentials.')
    }
  }

  const formFields = [
    { name: 'nomAdmin', type: 'text' },
    { name: 'Nom_Univ', type: 'text' },
    { name: 'password', type: 'password' }
  ]

  return (
    <div className="home-page">
      <h1>Welcome to the University Portal</h1>
      <button onClick={handleButtonClick}>
        Ajouter Votre Université
      </button>

      <button onClick={handleManageClick}>
        Gérer Votre Université
      </button>

      {showForm && (
        <Form data={formFields} onSubmit={handleFormSubmit} />
      )}

      <h2>List of Universities</h2>
      <ul>
        {universities.length > 0 ? (
          universities.map((university) => (
            <li key={university._id}>
              {university.Nom_Univ} - {university.lieu}
            </li>
          ))
        ) : (
          <li>No universities available</li>
        )}
      </ul>
    </div>
  )
}

export default HomePage

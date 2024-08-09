import React, { useState, useEffect } from 'react'
import Form from '../Form/Form'
import { useNavigate } from 'react-router-dom'
const UniversityManagement = () => {
  const [universities, setUniversities] = useState([])
  const [selectedUniversity, setSelectedUniversity] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    fetchUniversities()
  }, [])

  const fetchUniversities = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/universities')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log('API Response:', data)
      setUniversities(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching universities:', error)
      setUniversities([]) // Fallback to an empty array on error
    }
  }

  const handleSubmit = async (formData) => {
    try {
      console.log('Form Data:', formData); // Log form data for debugging
  
      const method = selectedUniversity ? 'PUT' : 'POST';
      const url = selectedUniversity ? `http://localhost:5000/api/universities/${selectedUniversity._id}` : 'http://localhost:5000/api/universities';
  
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      fetchUniversities();
      setSelectedUniversity(null);
      navigate('/universityManagement')
    } catch (error) {
      console.error('Error saving university:', error);
    }
  };
  

  const handleEdit = (university) => {
    setSelectedUniversity(university)
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/universities/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      fetchUniversities()
    } catch (error) {
      console.error('Error deleting university:', error)
    }
  }

  const formFields = [
    { name: 'nomAdmin', type: 'text' },  // Corrected typo from 'nomAmdin' to 'nomAdmin'
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'lieu', type: 'text' },
    { name: 'latitude', type: 'number' },
    { name: 'longitude', type: 'number' },
    { name: 'Nom_Univ', type: 'text' },
    { name: 'logo', type: 'text' },
    { name: 'text', type: 'textarea' }
  ];
  

  return (
    <div className="university-management">
      <h2>University Management</h2>
      <Form data={formFields} onSubmit={handleSubmit} />

      <h3>Universities List</h3>
      <ul>
        {Array.isArray(universities) && universities.length > 0 ? (
          universities.map((university) => (
            <li key={university._id}>
              {university.Nom_Univ}
              <button onClick={() => handleEdit(university)}>Edit</button>
              <button onClick={() => handleDelete(university._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No universities found</li>
        )}
      </ul>
    </div>
  )
}

export default UniversityManagement

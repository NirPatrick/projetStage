
import React, { useState, useEffect } from 'react'
import Form from '../Form/Form'
import '../../App.css'
const formData = [
    { name: 'nom_prenom', type: 'text', label: 'Full Name' },
    { name: 'email', type: 'email', label: 'Email' },
  ]
const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch users on component mount
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users')
      if (response.ok) {
        const result = await response.json()
        setUsers(result)
      } else {
        console.error('Error fetching users:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        const result = await response.json()
        console.log('User created:', result)
        fetchUsers() // Refresh user list after successful creation
      } else {
        console.error('Error creating user:', response.statusText)
      }
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <div className="App">
      <h1>Create User</h1>
      <Form data={formData} onSubmit={handleSubmit} />
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.nom_prenom} - {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User

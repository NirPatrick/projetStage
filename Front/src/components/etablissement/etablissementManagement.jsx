import React, { useState, useEffect } from 'react';
import Form from '../Form/Form';

const EtablissementManagement = () => {
  const [etablissements, setEtablissements] = useState([]);
  const [selectedEtablissement, setSelectedEtablissement] = useState(null);

  // Retrieve universityAdmin data from sessionStorage
  const universityAdmin = JSON.parse(sessionStorage.getItem('universityAdmin'));
  const universityId = universityAdmin?._id || '';

  useEffect(() => {
    fetchEtablissements();
  }, []);

  const fetchEtablissements = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/etablissements');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEtablissements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching etablissements:', error);
      setEtablissements([]);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const method = selectedEtablissement ? 'PUT' : 'POST';
      const url = selectedEtablissement
        ? `http://localhost:5000/api/etablissements/${selectedEtablissement._id}`
        : 'http://localhost:5000/api/etablissements';

      // Include universityId in the formData
      formData.id_University = universityId;

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

      fetchEtablissements();
      setSelectedEtablissement(null);
    } catch (error) {
      console.error('Error saving etablissement:', error);
    }
  };

  const handleEdit = (etablissement) => {
    setSelectedEtablissement(etablissement);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/etablissements/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchEtablissements();
    } catch (error) {
      console.error('Error deleting etablissement:', error);
    }
  };

  const formFields = [
    { name: 'lieu', type: 'text' },
    { name: 'id_University', type: 'text', value: universityId, disabled: true }, // Pre-fill and disable this field
    { name: 'Nom', type: 'text' },
    { name: 'logo', type: 'text' },
  ];

  return (
    <div className="etablissement-management">
      <h2>Etablissement Management</h2>
      <Form data={formFields} onSubmit={handleSubmit} />

      <h3>Etablissements List</h3>
      <ul>
        {Array.isArray(etablissements) && etablissements.length > 0 ? (
          etablissements.map((etablissement) => (
            <li key={etablissement._id}>
              {etablissement.Nom}
              <button onClick={() => handleEdit(etablissement)}>Edit</button>
              <button onClick={() => handleDelete(etablissement._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No etablissements found</li>
        )}
      </ul>
    </div>
  );
};

export default EtablissementManagement;

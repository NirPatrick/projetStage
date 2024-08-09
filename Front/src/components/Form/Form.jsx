import React, { useState } from 'react';
import InputField from './InputFields'; // Ensure the correct path
import '../../App.css';

const Form = ({ data, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    data.forEach((field) => {
      if (!formData[field.name] && !field.disabled) {
        valid = false;
        newErrors[field.name] = `${field.name} is required`;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData); // Pass the form data to the onSubmit function
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {data.map((field) => (
          <InputField
            key={field.name}
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            options={field.options}
            error={errors[field.name]}
            disabled={field.disabled}
          />
        ))}
        <button className="form-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;

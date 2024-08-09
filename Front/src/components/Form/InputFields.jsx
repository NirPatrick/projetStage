import React from 'react';

const InputField = ({ type, name, value, onChange, options, error, disabled }) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{name}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value || ''}
          onChange={onChange}
          disabled={disabled || false}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          list={options ? `${name}-list` : undefined}
          disabled={disabled || false}
        />
      )}
      {options && (
        <datalist id={`${name}-list`}>
          {options.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default InputField;

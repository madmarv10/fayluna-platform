import React from 'react';

const MetricsCard = ({ title, value, icon, description }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        minWidth: '150px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        textAlign: 'center',
        margin: '8px',
      }}
    >
      {icon && (
        <div style={{ fontSize: '24px', marginBottom: '8px', color: '#007bff' }}>
          {icon}
        </div>
      )}
      <h4 style={{ margin: '8px 0', fontWeight: '600' }}>{title}</h4>
      <p style={{ fontSize: '28px', margin: '4px 0', fontWeight: '700', color: '#333' }}>
        {value}
      </p>
      {description && (
        <small style={{ color: '#666', fontSize: '12px' }}>
          {description}
        </small>
      )}
    </div>
  );
};

export default MetricsCard;

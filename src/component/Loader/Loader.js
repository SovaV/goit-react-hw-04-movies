import React from 'react';
import Loader from 'react-loader-spinner';
export default function Spiner() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Loader type="Watch" color="#00BFFF" height={200} width={200} timeout={3000} />
    </div>
  );
}

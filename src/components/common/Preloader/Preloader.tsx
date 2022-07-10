import loadingImg from './Loading_icon.gif';
import React from 'react';

export const Preloader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={loadingImg} alt="loading" style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};
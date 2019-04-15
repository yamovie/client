import React from 'react';
import { LloydChat } from '../components';

const FindMoviePage = () => (
  <div>
    <h1
      style={{
        color: 'var(--offwhite)',
        textAlign: 'center',
        textShadow: '1px 2px 1px var(--red)',
        padding: '10px',
      }}
    >
      Some recommendations will show up here.
    </h1>
    <LloydChat />
  </div>
);

export default FindMoviePage;

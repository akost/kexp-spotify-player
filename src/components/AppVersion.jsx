import React from 'react';

const AppVersion = () => (
    <span>v. {process.env.REACT_APP_VERSION}</span>
);

export default AppVersion;

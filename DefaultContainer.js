import React, { useState } from 'react';

export const CountriesContext = React.createContext({
  countries: null,
  setCountries: () => {},
});

const DefaultContainer = (props) => {
  const [countries, setCountries] = useState([{ id: 'HRV' }, { id: 'USA' }]);

  return (
    <CountriesContext.Provider value={{ countries }}>
      {props.children}
    </CountriesContext.Provider>
  );
};

export default DefaultContainer;

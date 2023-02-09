import React from 'react';

const CardContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  deleteItem: (id) => {},
  clearCard: () => {}
})

export default CardContext;

// default object tanımlamamızın sebebi auto-completion içindir.

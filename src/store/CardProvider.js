import CardContext from "./card-context";
import { useReducer } from "react";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cardReducer = (state, action) => {
  if (action.type === "ADD") {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];

    let newItems;

    if (existingItem) {
      const newItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      newItems = [...state.items];
      newItems[existingItemIndex] = newItem;
    } else {
      newItems = state.items.concat(action.item);
    }

    return { items: newItems, totalAmount: newTotalAmount };
  }

  return defaultState;
};

const CardProvider = ({ children }) => {
  const [cardState, cardDispatch] = useReducer(cardReducer, defaultState);

  const addItemHandler = (item) => {
    cardDispatch({ type: "ADD", item: item });
  };

  const deleteItemHandler = (id) => {
    cardDispatch({ type: "DELETE", id: id });
  };

  // Normalde value attribute' una geçtiğim objeyi kolaylık olsun diye dışarda tanımladım.
  const cardContextForValueProp = {
    items: cardState.items,
    totalAmount: cardState.totalAmount,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
  };

  return (
    <CardContext.Provider value={cardContextForValueProp}>
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;

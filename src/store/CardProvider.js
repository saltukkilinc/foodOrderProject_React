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
    // state listesinde önceden item eklenmişse indexini bulma
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // önceden eklenen itemin kendisini bulma
    const existingItem = state.items[existingItemIndex];
    // state listesini kopyalamak ve güncellemek için yeni değişken
    let newItems;
    // önceden item varsa:  amountunu güncelle, listeyi yeni değişkene atayarak listeyi kopyala, yeni listede önceden olan itemi bul ve onun yerine amountu güncellenmiş itemi ata
    // önceden item yoksa:  yeni gelen itemi kopyalanmış listeye direkt olarak ata
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
  };

  if ( action.type === 'DELETE') {
    const existingItemIndex = state.items.findIndex( item => item.id === action.id);
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    // card' da tek item kaldığında sil, tek itemden fazlaysa miktarı güncelle
    if(existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }

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

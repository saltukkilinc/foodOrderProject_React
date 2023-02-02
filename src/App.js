import { useState } from 'react';
import Card from "./components/Card/Card";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CardProvider from './store/CardProvider';

function App() {

  const [isShownCard, setIsShownCard] = useState(false)

  // function for showing Card Com.
  const showCardHandler = () => {
    setIsShownCard(true);
  }

  // function for hiding Card Com.
  const hideCardHandler = () => {
    setIsShownCard(false)
  }

  return (
    <CardProvider>
      {isShownCard && <Card onHideCard={hideCardHandler} />}
      <Header onShowCard={showCardHandler} />
      <main>
        <Meals />
      </main>
    </CardProvider>
  );
}

export default App;

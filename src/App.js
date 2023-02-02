import { useState } from 'react';
import Card from "./components/Card/Card";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

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
    <>
      {isShownCard && <Card onHideCard={hideCardHandler} />}
      <Header onShowCard={showCardHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;

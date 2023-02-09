import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import axios from "axios";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = (
        await axios(
          `https://react-udemy-http-7d115-default-rtdb.firebaseio.com/meals.json`
        )
      ).data;

      const loadedData = [];

      for (let key in res) {
        loadedData.push({
          id: key,
          name: res[key].name,
          description: res[key].description,
          price: res[key].price,
        });
      }

      setMeals(loadedData);
      setIsLoading(false);
    };

    fetchData().catch(error => {
      setIsLoading(false);
      setIsError(error.message)
    });
  }, []);

  if(isLoading) {
    return <section className={styles.loadingMenu}>
      <p>Data is loading...</p>
    </section>
  };

  if(isError) {
    return (
      <section className={styles.errorMenu}>
        <p>{isError}</p>
      </section>
    )
  }

  const mapped_meals = meals.map((meal) => (
    <MealItem key={meal.id} meal={meal} />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mapped_meals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

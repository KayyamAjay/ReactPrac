import React, { useState, useCallback } from "react";
import IngreditenList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const filter = useCallback((filteredingredients) => {
    setUserIngredients(filteredingredients);
  }, []);
  const addIngredientsHandler = async (ingredient) => {
    setLoading(true);
    const response = await fetch(
      "https://sample-26d34-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    setLoading(false);
    setUserIngredients((prev) => [
      ...prev,
      { id: data.name, ...ingredient }, //adding id and keeping the key value pair by ...ingredient
    ]);
  };
  const removeIngredientHandler = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://sample-26d34-default-rtdb.firebaseio.com/ingredients/${id}.json`,
        {
          method: "DELETE",
        }
      );
      setLoading(false);
      if (response.ok) {
        console.log("deleted the selected item");
      }
      setUserIngredients((prev) =>
        prev.filter((ingredient) => ingredient.id !== id)
      );
    } catch (err) {
      setError("something went wrong!");
      setLoading(false);
    }
    console.log(userIngredients);
  };
  const clearError = () => {
    setError(null);
  };
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onLoading={isLoading} onAdd={addIngredientsHandler} />

      <section>
        <Search onLoading={filter} />
        {/* Need to add list here! */}
        <IngreditenList
          onRemoveItem={removeIngredientHandler}
          ingredients={userIngredients}
        />
      </section>
    </div>
  );
}

export default Ingredients;

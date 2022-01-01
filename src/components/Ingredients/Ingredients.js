import React, { useState, useCallback } from "react";
import IngreditenList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  const filter = useCallback((filteredingredients) => {
    setUserIngredients(filteredingredients);
  }, []);
  const addIngredientsHandler = async (ingredient) => {
    const response = await fetch(
      "https://sample-26d34-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    setUserIngredients((prev) => [
      ...prev,
      { id: data.name, ...ingredient }, //adding id and keeping the key value pair by ...ingredient
    ]);
  };
  const removeIngredientHandler = async (id) => {
    const response = await fetch(
      `https://sample-26d34-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("deleted the selected item");
    }
    setUserIngredients((prev) =>
      prev.filter((ingredient) => ingredient.id !== id)
    );
  };
  console.log(userIngredients);
  return (
    <div className="App">
      <IngredientForm onAdd={addIngredientsHandler} />

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

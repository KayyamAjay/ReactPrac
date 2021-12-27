import React, { useState } from "react";
import IngreditenList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const addIngredientsHandler = (ingredient) => {
    setUserIngredients((prev) => [
      ...prev,
      { id: Math.random().toString(), ...ingredient }, //adding id and keeping the key value pair by ...ingredient
    ]);
  };
  const removeIngredientHandler = (id) => {
    setUserIngredients((prev) =>
      prev.filter((ingredient) => ingredient.id !== id)
    );
  };
  console.log(userIngredients);
  return (
    <div className="App">
      <IngredientForm onAdd={addIngredientsHandler} />

      <section>
        <Search />
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

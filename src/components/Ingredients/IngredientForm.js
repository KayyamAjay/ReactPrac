import React, { useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator";
import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  const [inputState, setInputState] = useState({ title: "", amount: "" });
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAdd(inputState);
    // ...;
  };

  const inputChangeHandler = (event) => {
    const newtitle = event.target.value;
    setInputState((prev) => ({
      title: newtitle,
      amount: prev.amount,
    }));
  };
  const amountChangeHandler = (event) => {
    const newamount = event.target.value;
    setInputState((prev) => ({
      title: prev.title,
      amount: newamount,
    }));
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" onChange={inputChangeHandler} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" onChange={amountChangeHandler} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.onLoading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

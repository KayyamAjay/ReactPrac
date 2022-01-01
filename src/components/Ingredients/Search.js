import React from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const [filteredIngredients, setfilteredIngredients] = React.useState("");
  const { onLoading } = props;
  React.useEffect(() => {
    const fetchHandler = async () => {
      const query =
        filteredIngredients.length === 0
          ? ""
          : `?orderBy="title"&equalTo="${filteredIngredients}"`;
      const response = await fetch(
        "https://sample-26d34-default-rtdb.firebaseio.com/ingredients.json" +
          query
      );
      const data = await response.json();
      const loadingList = [];
      for (const key in data) {
        loadingList.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoading(loadingList);
    };
    fetchHandler();
  }, [filteredIngredients, onLoading]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            onChange={(event) => setfilteredIngredients(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllDishes = () => {
  const [dishes, setDishes] = useState([]);

  // Function to fetch the dish list
  async function GetDishList() {
    try {
      const response = await axios.get("https://localhost:7234/api/Dishes/getAllDishes");
      console.log(response);
      setDishes(response.data); // Set the dish list
    } catch (error) {
      console.log("Error fetching dishes", error);
    }
  }

  // useEffect to call the API on component mount
  useEffect(() => {
    GetDishList();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div>
      <h1>Dish List</h1>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>{dish.name}</li> // Assuming each dish has an id and name
        ))}
      </ul>
    </div>
  );
}

export default GetAllDishes;

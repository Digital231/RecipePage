import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient]);
      setIngredient("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/recipes", {
        name: recipeName,
        imageUrl: recipeImage,
        ingredients: ingredients,
      });

      if (response.data.status === "success") {
        navigate("/");
      } else {
        setErrors([response.data.message]);
      }
    } catch (error) {
      console.error("There was an error creating the recipe!", error);
      setErrors(["An unexpected error occurred. Please try again later."]);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Form className="w-50" onSubmit={handleSubmit}>
        <h2>Create a New Recipe</h2>
        {errors.length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <Form.Group className="mb-3" controlId="formRecipeName">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRecipeImage">
          <Form.Label>Recipe Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Recipe Image URL"
            value={recipeImage}
            onChange={(e) => setRecipeImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIngredient">
          <Form.Label>Add Ingredient</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <Button
            variant="secondary"
            type="button"
            onClick={handleAddIngredient}
            className="mt-2"
          >
            Add Ingredient
          </Button>
        </Form.Group>

        {ingredients.length > 0 && (
          <ul className="list-group mb-3">
            {ingredients.map((item, index) => (
              <li key={index} className="list-group-item">
                {index + 1}. {item}
              </li>
            ))}
          </ul>
        )}

        <Button variant="primary" type="submit">
          Create Recipe
        </Button>
      </Form>
    </div>
  );
}

export default CreateRecipe;

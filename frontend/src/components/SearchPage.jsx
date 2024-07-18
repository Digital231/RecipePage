import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import StarRatings from "react-star-ratings";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery();
  const searchQuery = query.get("query");
  const ratingFilter = query.get("rating");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        let filteredRecipes = response.data;

        if (searchQuery) {
          filteredRecipes = filteredRecipes.filter(
            (recipe) =>
              recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(searchQuery.toLowerCase())
              )
          );
        }

        if (ratingFilter) {
          filteredRecipes = filteredRecipes.filter(
            (recipe) =>
              Math.round(recipe.averageRating) === parseInt(ratingFilter)
          );
        }

        if (filteredRecipes.length === 0) {
          setError("No recipes found");
        } else {
          setError("");
        }

        setRecipes(filteredRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("An unexpected error occurred. Please try again later.");
      }
    };

    fetchRecipes();
  }, [searchQuery, ratingFilter]);

  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold text-center">Search Results</h1>
      {error ? (
        <p className="text-center text-danger">{error}</p>
      ) : (
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe._id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={recipe.imageUrl}
                  alt={recipe.name}
                />
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  {recipe.averageRating > 0 ? (
                    <StarRatings
                      rating={recipe.averageRating}
                      starRatedColor="gold"
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="2px"
                    />
                  ) : (
                    <p>No rating yet</p>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;

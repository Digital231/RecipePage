import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/mainStore";
import axios from "axios";
import Card from "react-bootstrap/Card";
import StarRatings from "react-star-ratings";

function HomePage() {
  const { isLoggedIn } = useStore((state) => state);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Best Recipes</h1>

      {isLoggedIn ? (
        <div className="container mt-5">
          <div className="row">
            {recipes.map((recipe) => (
              <div className="col-md-4 mb-4" key={recipe._id}>
                <Card
                  onClick={() => handleRecipeClick(recipe._id)}
                  className="h-100"
                >
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
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2>Please log in to get the best recipes</h2>
          <img
            src="https://i.pinimg.com/originals/3b/bb/61/3bbb61e1f632c2b73c22a9b56e573035.gif"
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;

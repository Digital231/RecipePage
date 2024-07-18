import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import StarRatings from "react-star-ratings";
import useStore from "../store/mainStore";

function SingleRecipe() {
  const { username } = useStore();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/recipes/${id}/rating`,
        {
          username: username,
          rating: rating,
          comment: comment,
        }
      );

      setRecipe(response.data);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error adding rating and comment:", error);
      setErrors(["An unexpected error occurred. Please try again later."]);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{recipe.name}</h2>
      <img src={recipe.imageUrl} alt={recipe.name} className="img-fluid" />
      <h4>Ingredients</h4>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          padding: "0",
          margin: "0",
        }}
      >
        {recipe.ingredients.map((ingredient, index) => (
          <div
            key={index}
            style={{
              padding: "5px 10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "5px",
              border: "1px solid #dee2e6",
            }}
          >
            {ingredient}
          </div>
        ))}
      </div>

      <h4>Comments and Ratings</h4>
      {recipe.comments.map((comment, index) => (
        <div key={index} className="mb-3">
          <strong>{comment.username}</strong>
          <StarRatings
            rating={comment.rating}
            starRatedColor="gold"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="2px"
          />
          <p>{comment.comment}</p>
        </div>
      ))}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Leave a Rating</Form.Label>
          <StarRatings
            rating={rating}
            changeRating={handleRatingChange}
            starRatedColor="gold"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="2px"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Leave a Comment</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        {errors.length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SingleRecipe;

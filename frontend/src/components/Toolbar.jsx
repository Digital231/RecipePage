import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import useStore from "../store/mainStore";
import "./Toolbar.css";

function Toolbar() {
  const { isLoggedIn, setIsLoggedIn, setUsername, setSecretKey } = useStore(
    (state) => state
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [searchModal, setSearchModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const modal = new Modal(document.getElementById("searchModal"));
    setSearchModal(modal);
  }, []);

  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}&rating=${ratingFilter}`);
    searchModal.hide();
  };

  const showSearchModal = () => {
    searchModal.show();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setSecretKey("");
    navigate("/");
  };

  return (
    <div className="toolbar">
      <nav>
        <ul className="nav-type">
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/create-recipe">Create Recipe</Link>
              </li>
              <li>
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </>
          )}
          <li>
            <a href="#" onClick={showSearchModal}>
              <i className="fa fa-search"></i>
            </a>
          </li>
        </ul>
      </nav>

      {/* Bootstrap Modal for Search */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex="-1"
        aria-labelledby="searchModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="searchModalLabel">
                Search Recipes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="form-select mb-3"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="">All Ratings</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;

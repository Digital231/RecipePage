import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Toolbar from "./components/Toolbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateRecipe from "./pages/CreateRecipe";
import SingleRecipe from "./pages/SingleRecipe";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toolbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipes/:id" element={<SingleRecipe />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

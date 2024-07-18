import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../store/mainStore";

function SingleUser() {
  const [user, setUser] = useState({});
  const { username } = useStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${username}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("There was an error fetching the user!", error);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="row">
        <div className="col text-center">
          <h1>
            Hello:{" "}
            <span style={{ fontWeight: "bold", color: "blue" }}>
              {user.username}
            </span>
            !
          </h1>
          <img className="w-25" src={user.avatar} alt="Profile" />
        </div>
      </div>
    </div>
  );
}

export default SingleUser;

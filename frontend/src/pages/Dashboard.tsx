import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return <button onClick={handleLogout}>Logout</button>;
};
export default Dashboard;
import { Avatar, Container, Text, Button } from "@mantine/core";
import { useAuthStore } from "../store/auth.store"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore(); // Logout function from Zustand store
  const [username, setUsername] = useState("Admin");

  useEffect(() => {
    // Fetch username from localStorage if available
    const storedUser = localStorage.getItem("username") || "Admin";
    setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    logout(); // Call Zustand logout function
    localStorage.removeItem("username"); // Clear username from storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        borderBottom: "2px solid #ddd",
      }}
    >
      <Text style={{ margin: 0 }} size="xl" weight={700} align="left" mt="md">Script Assist</Text>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Text>Hello, {username}</Text>
        <Avatar src="/avatar.png" alt="User Avatar" radius="xl" size="md" />
        <Button size="xs" variant="outline" color="red" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;

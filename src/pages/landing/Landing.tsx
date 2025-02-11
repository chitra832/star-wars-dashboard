import { useNavigate } from "react-router-dom";
import { Button, Container } from "@mantine/core";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "90vh",
        backgroundImage: "url('/background.jpg')", // Replace with your image
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
		overflowY:"hidden"
      }}
    >
      <Container style={{ textAlign: "center" }}>
        <h1 style={{ color: "#fff" }}>Welcome to Our App</h1>
        <Button size="lg" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Container>
    </div>
  );
};

export default Landing;

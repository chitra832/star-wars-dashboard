import { Button, Container, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (credentials.username === "admin" && credentials.password === "password") {
      login();
      navigate("/dashboard"); // Redirect to main page after login
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Login</Title>
      <Paper shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Username"
          placeholder="Enter username"
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter password"
          mt="md"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;

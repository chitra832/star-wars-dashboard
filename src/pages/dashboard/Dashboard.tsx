import { Container, Text } from "@mantine/core";
import MainTable from "../../components/MainTable";

const Dashboard = () => {
  return (
    <Container style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Text size="xxl" weight={700} align="left" mt="md">
        Welcome, Admin
      </Text>
      <MainTable />
    </Container>
  );
};

export default Dashboard;

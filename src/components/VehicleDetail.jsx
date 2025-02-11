import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Text, Loader, Container } from "@mantine/core";

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/vehicles/${id}/`)
      .then((res) => res.json())
      .then((data) => setVehicle(data));
  }, [id]);

  if (!vehicle) return <Loader />;

  return (
    <Container size="sm" pt={50}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="xl" weight={700}>
          {vehicle.name}
        </Text>
        <Text>Model: {vehicle.model}</Text>
        <Text>Manufacturer: {vehicle.manufacturer}</Text>
        <Text>Cost: {vehicle.cost_in_credits} credits</Text>
        <Text>Passengers: {vehicle.passengers}</Text>
      </Card>
    </Container>
  );
};

export default VehicleDetail;

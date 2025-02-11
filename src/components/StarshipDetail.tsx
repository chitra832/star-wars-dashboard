import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Text, Loader, Container } from "@mantine/core";

const StarshipDetail = () => {
  const { id } = useParams();
  const [starship, setStarship] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/starships/${id}/`)
      .then((res) => res.json())
      .then((data) => setStarship(data));
  }, [id]);

  if (!starship) return <Loader />;

  return (
    <Container size="sm" pt={50}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="xl" weight={700}>{starship.name}</Text>
      <Text>Model: {starship.model}</Text>
      <Text>Manufacturer: {starship.manufacturer}</Text>
      <Text>Cost: {starship.cost_in_credits} credits</Text>
      <Text>Passengers: {starship.passengers}</Text>
    </Card>
    </Container>
  );
};

export default StarshipDetail;

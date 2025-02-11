import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  Text,
  Container,
  Loader,
  Grid,
  Badge,
  List,
  ThemeIcon,
  Group,
} from "@mantine/core";
import { IconMovie, IconCar, IconRocket } from "@tabler/icons-react";

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container size="sm" style={{ marginTop: "30px", textAlign: "center" }}>
        <Loader size="lg" />
      </Container>
    );
  }

  return (
    <Container size="md" style={{ marginTop: "30px" }}>
      {/* Basic Details Section */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="xl" weight={700} align="center">
          {person.name}
        </Text>

        <Grid mt="md">
          <Grid.Col span={6}>
            <Badge color="blue" size="lg" fullWidth>
              Height: {person.height} cm
            </Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Badge color="green" size="lg" fullWidth>
              Mass: {person.mass} kg
            </Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Badge color="violet" size="lg" fullWidth>
              Gender: {person.gender}
            </Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Badge color="yellow" size="lg" fullWidth>
              Birth Year: {person.birth_year}
            </Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Badge color="orange" size="lg" fullWidth>
              Hair Color: {person.hair_color}
            </Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Badge color="gray" size="lg" fullWidth>
              Eye Color: {person.eye_color}
            </Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Badge color="teal" size="lg" fullWidth>
              Skin Color: {person.skin_color}
            </Badge>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Films Section */}
      <Card shadow="sm" padding="lg" radius="md" withBorder mt={20}>
        <Group>
          <IconMovie size={24} />
          <Text size="lg" weight={700}>
            Films
          </Text>
        </Group>
        <List spacing="xs" mt={10}>
  {person.films.map((film, index) => {
    const filmId = film.match(/\/(\d+)\/$/)[1]; // Extract film ID from URL
    return (
      <List.Item
        key={index}
        icon={
          <ThemeIcon color="blue" size={20} radius="xl">
            <IconMovie size={16} />
          </ThemeIcon>
        }
      >
        <Link to={`/dashboard/film/${filmId}`}>
          Film {index + 1}
        </Link>
      </List.Item>
    );
  })}
</List>

      </Card>

      <Grid mt={20}>
        {/* Vehicles Section */}
        {person.vehicles.length > 0 && (
  <Grid.Col span={6}>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group>
        <IconCar size={24} />
        <Text size="lg" weight={700}>
          Vehicles
        </Text>
      </Group>
      <List spacing="xs" mt={10}>
        {person.vehicles.map((vehicle, index) => {
          const vehicleId = vehicle.match(/\/(\d+)\/$/)[1]; // Extract ID
          return (
            <List.Item
              key={index}
              icon={
                <ThemeIcon color="orange" size={20} radius="xl">
                  <IconCar size={16} />
                </ThemeIcon>
              }
            >
              <Link to={`/dashboard/vehicle/${vehicleId}`}>
                Vehicle {index + 1}
              </Link>
            </List.Item>
          );
        })}
      </List>
    </Card>
  </Grid.Col>
)}


        {/* Starships Section */}
        {person.starships.length > 0 && (
  <Grid.Col span={6}>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group>
        <IconRocket size={24} />
        <Text size="lg" weight={700}>
          Starships
        </Text>
      </Group>
      <List spacing="xs" mt={10}>
        {person.starships.map((starship, index) => {
          const starshipId = starship.match(/\/(\d+)\/$/)[1]; // Extract ID
          return (
            <List.Item
              key={index}
              icon={
                <ThemeIcon color="red" size={20} radius="xl">
                  <IconRocket size={16} />
                </ThemeIcon>
              }
            >
              <Link to={`/dashboard/starship/${starshipId}`}>
                Starship {index + 1}
              </Link>
            </List.Item>
          );
        })}
      </List>
    </Card>
  </Grid.Col>
)}
      </Grid>
    </Container>
  );
};

export default PersonDetail;

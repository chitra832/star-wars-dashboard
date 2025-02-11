import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Title, Text, Loader, Card, Group, Badge } from "@mantine/core";

const FilmDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/films/${id}/`);
        const data = await response.json();
        setFilm(data);
      } catch (error) {
        console.error("Error fetching film details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilm();
  }, [id]);

  if (loading) {
    return (
      <Container size="sm" pt={50}>
        <Loader size="lg" />
      </Container>
    );
  }

  if (!film) {
    return (
      <Container size="sm" pt={50}>
        <Text color="red">Film not found.</Text>
      </Container>
    );
  }

  return (
    <Container size="sm" pt={50}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2} mb={10}>{film.title}</Title>
        <Group mb={10}>
          <Badge color="blue">Episode {film.episode_id}</Badge>
          <Badge color="grape">Released: {film.release_date}</Badge>
        </Group>
        <Text size="sm" mb={10}>{film.opening_crawl}</Text>
        <Text size="sm" color="dimmed">Director: {film.director}</Text>
        <Text size="sm" color="dimmed">Producer: {film.producer}</Text>
      </Card>
    </Container>
  );
};

export default FilmDetail;
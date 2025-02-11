import { useEffect, useState } from "react";
import { Table, Container, Text, TextInput, Group, ActionIcon } from "@mantine/core";
import { IconSearch, IconSortAscending, IconSortDescending, IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const MainTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", order: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        setData(data.results);
        setFilteredData(data.results);
      })
      .catch((error) => setError(error.message));
  }, []);

  // Search filter function
  useEffect(() => {
    setFilteredData(
      data.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.height.toLowerCase().includes(search.toLowerCase()) ||
        person.mass.toLowerCase().includes(search.toLowerCase()) ||
        person.gender.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  // Sorting function
  const handleSort = (key) => {
    const newOrder = sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc";
    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = isNaN(a[key]) ? a[key] : Number(a[key]);
      const bValue = isNaN(b[key]) ? b[key] : Number(b[key]);
      return newOrder === "asc" ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    setFilteredData(sortedData);
    setSortConfig({ key, order: newOrder });
  };

  if (error) {
    return (
      <Container>
        <Text color="red">Error: {error}</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" style={{ width: "100%" }}>
      <Group position="apart" mb="md">
        <Text size="xl" weight={700}>People List</Text>
        <TextInput
          placeholder="Search characters..."
          icon={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          w={250}
        />
      </Group>

      <Table striped highlightOnHover withBorder withColumnBorders style={{ width: "100%" }}>
        <thead>
          <tr>
            {["name", "height", "mass", "gender"].map((key, index) => (
              <th key={index} style={{ minWidth: "120px", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <ActionIcon onClick={() => handleSort(key)} size="sm">
                    {sortConfig.key === key && sortConfig.order === "asc" ? <IconSortAscending size={16} /> : <IconSortDescending size={16} />}
                  </ActionIcon>
                </div>
              </th>
            ))}
            <th style={{ textAlign: "center" }}>View</th> {/* New column for Eye Icon */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.height}</td>
              <td>{person.mass}</td>
              <td>{person.gender}</td>
              <td style={{ textAlign: "center" }}>
                <ActionIcon onClick={() => navigate(`/dashboard/person/${index + 1}`)}>
                  <IconEye size={20} />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MainTable;

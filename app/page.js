"use client";
import { Box, Stack, Typography, TextField, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the path to your actual Firebase configuration
import PantryForm from "./PantryForm"; // Adjust the path to your actual form component

export default function Home() {
  const [material, setMaterial] = useState([]);
  const [search, setSearch] = useState('');
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const snapshot = await getDocs(query(collection(db, 'material')));
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMaterial(items);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, []);

  const handleItemAdded = (item) => setMaterial([...material, item]);
  const handleItemUpdated = (item) => setMaterial(material.map(m => m.id === item.id ? item : m));
  const handleItemDeleted = (id) => setMaterial(material.filter(m => m.id !== id));

  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={4} bgcolor="#f7f7f7">
      <Box width="800px" bgcolor="blue" p={2} borderRadius="8px" boxShadow={3}>
        <Typography variant="h2" color="white" textAlign="center">
          Pantry Item
        </Typography>
      </Box>
      <Box width="800px" my={2}>
        <PantryForm
          currentItem={currentItem}
          onItemAdded={handleItemAdded}
          onItemUpdated={handleItemUpdated}
          onItemDeleted={handleItemDeleted}
        />
      </Box>
      <TextField
        label="Search Items"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        InputProps={{
          style: {
            borderRadius: "8px",
          },
        }}
      />
      <Stack width="800px" height="300px" spacing={2} overflow="scroll" border="3px solid #ddd" borderRadius="8px" boxShadow={1} p={2} bgcolor="white">
        {material.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map((item) => (
          <Paper 
            key={item.id}
            width="100%"
            height="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            elevation={3}
            onClick={() => setCurrentItem(item)}
            style={{
              cursor: 'pointer',
              padding: '16px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
          >
            <Typography variant="h4" fontWeight="bold" color="#333">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

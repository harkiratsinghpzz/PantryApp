import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the path to your actual Firebase configuration

export default function PantryForm({ currentItem, onItemAdded, onItemUpdated, onItemDeleted }) {
  const [name, setName] = useState(currentItem ? currentItem.name : '');

  useEffect(() => {
    setName(currentItem ? currentItem.name : '');
  }, [currentItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentItem) {
      // Update existing item
      const itemRef = doc(db, 'material', currentItem.id);
      await updateDoc(itemRef, { name });
      onItemUpdated({ ...currentItem, name });
    } else {
      // Add new item
      const docRef = await addDoc(collection(db, 'material'), { name });
      onItemAdded({ id: docRef.id, name });
    }
    setName('');
  };

  const handleDelete = async () => {
    if (currentItem) {
      const itemRef = doc(db, 'material', currentItem.id);
      await deleteDoc(itemRef);
      onItemDeleted(currentItem.id);
      setName('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} width="100%">
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {currentItem ? 'Update' : 'Add'}
        </Button>
        {currentItem && (
          <Button variant="contained" color="secondary" onClick={handleDelete} fullWidth>
            Delete
          </Button>
        )}
      </Stack>
    </Box>
  );
}

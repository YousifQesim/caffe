import React, { useState, useEffect } from 'react';
import axios from 'axios';


type Category = {
  id: number;
  name: string;
  items: { id: number; name: string; price: number }[];
};
const Admin: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState<number>(0);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedItemImage, setSelectedItemImage] = useState<File | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('http://localhost:3000/api/categories')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Error fetching categories: Response data is not an array');
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    };

    const handleAddCategory = () => {
        axios.post('http://localhost:3000/api/categories', { name: newCategoryName })
            .then(() => {
                setNewCategoryName('');
                fetchCategories();
            })
            .catch(error => console.error('Error adding category:', error));
    };

    const handleAddItem = () => {
        if (selectedCategoryId === null) {
            console.error('Please select a category');
            return;
        }

        const formData = new FormData();
        formData.append('name', newItemName);
        formData.append('price', newItemPrice.toString());
        formData.append('image', selectedItemImage as Blob);

        axios.post(`http://localhost:3000/api/items/${selectedCategoryId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                setNewItemName('');
                setNewItemPrice(0);
                setSelectedItemImage(null);
                fetchCategories();
            })
            .catch(error => console.error('Error adding item:', error));
    };

    return (
        <>
            <div>
                <h1>Admin Page</h1>

                <div>
                    <h2>Add Item</h2>
                    <select onChange={e => setSelectedCategoryId(parseInt(e.target.value))}>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={newItemName}
                        onChange={e => setNewItemName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Item Price"
                        value={newItemPrice}
                        onChange={e => setNewItemPrice(parseFloat(e.target.value))}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setSelectedItemImage(e.target.files && e.target.files[0])}
                    />
                    <button onClick={handleAddItem}>Add Item</button>
                </div>

                <div>
                
                    <input
                        type="text"
                        placeholder="New Category Name"
                        value={newCategoryName}
                        onChange={e => setNewCategoryName(e.target.value)}
                    />
                    <button onClick={handleAddCategory}>Add Category</button>
                </div>
            </div>
        </>
    );
};

export default Admin;

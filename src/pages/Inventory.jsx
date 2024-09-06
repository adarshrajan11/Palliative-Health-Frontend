import React, { useState, useEffect } from 'react'
import axios from '../services/api'
import styles from './pagestyles/inventory.module.css'

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([])
  const [newItem, setNewItem] = useState({
    itemName: '',
    quantity: 0,
    description: '',
  })
  const [editingItem, setEditingItem] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get('/api/inventory')
        setInventoryItems(response.data)
      } catch (err) {
        setError('Failed to fetch inventory items')
      }
    }

    fetchInventoryItems()
  }, [])

  const handleAddItem = async () => {
    try {
      const response = await axios.post('/api/inventory', newItem)
      setInventoryItems([...inventoryItems, response.data])
      setNewItem({ itemName: '', quantity: 0, description: '' })
    } catch (err) {
      setError('Failed to add inventory item')
    }
  }

  const handleEditItem = async (id) => {
    try {
      const response = await axios.put(`/api/inventory/${id}`, editingItem)
      setInventoryItems(
        inventoryItems.map((item) => (item.id === id ? response.data : item))
      )
      setEditingItem(null)
    } catch (err) {
      setError('Failed to edit inventory item')
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`)
      setInventoryItems(inventoryItems.filter((item) => item.id !== id))
    } catch (err) {
      setError('Failed to delete inventory item')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inventory}>
        <h2>Inventory Management</h2>
        {error && <p className={styles.error}>{error}</p>}

        {/* Display Inventory Items */}
        <ul>
          {inventoryItems.map((item) => (
            <li key={item.id}>
              {item.itemName} - {item.quantity}
              <div>
                <button onClick={() => setEditingItem(item)}>Edit</button>
                <button onClick={() => handleDeleteItem(item.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Add New Inventory Item */}
        <div className={styles.addItem}>
          <h3>Add New Item</h3>
          <input
            type='text'
            value={newItem.itemName}
            onChange={(e) =>
              setNewItem({ ...newItem, itemName: e.target.value })
            }
            placeholder='Item Name'
          />
          <input
            type='number'
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
            }
            placeholder='Quantity'
          />
          <input
            type='text'
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            placeholder='Description'
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>

        {/* Edit Inventory Item */}
        {editingItem && (
          <div className={styles.editItem}>
            <h3>Edit Item</h3>
            <input
              type='text'
              value={editingItem.itemName}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
            />
            <input
              type='number'
              value={editingItem.quantity}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  quantity: parseInt(e.target.value),
                })
              }
            />
            <button onClick={() => handleEditItem(editingItem.id)}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Inventory

// src/pages/Patients.js

import React, { useState, useEffect } from 'react'
import axios from '../services/api'
import styles from './pagestyles/Patients.module.css'

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    condition: '',
  })
  const [editingPatient, setEditingPatient] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/api/patients')
        setPatients(response.data)
      } catch (err) {
        setError('Failed to fetch patients')
      }
    }

    fetchPatients()
  }, [])

  const handleAddPatient = async () => {
    try {
      const response = await axios.post('/api/patients', newPatient)
      setPatients([...patients, response.data])
      setNewPatient({ name: '', age: '', condition: '' })
    } catch (err) {
      setError('Failed to add patient')
    }
  }

  const handleEditPatient = async (id) => {
    try {
      const response = await axios.put(`/api/patients/${id}`, editingPatient)
      setPatients(
        patients.map((patient) => (patient.id === id ? response.data : patient))
      )
      setEditingPatient(null)
    } catch (err) {
      setError('Failed to edit patient')
    }
  }

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`/api/patients/${id}`)
      setPatients(patients.filter((patient) => patient.id !== id))
    } catch (err) {
      setError('Failed to delete patient')
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Patient Management</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Patient List */}
      <ul className={styles.list}>
        {patients.map((patient) => (
          <li key={patient.id} className={styles.listItem}>
            {patient.name} - {patient.age} years old - {patient.condition}
            <div>
              <button
                className={styles.button30}
                onClick={() => setEditingPatient(patient)}
              >
                Edit
              </button>
              <button
                className={styles.button30}
                onClick={() => handleDeletePatient(patient.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add New Patient */}
      <div className={styles.form}>
        <h3>Add New Patient</h3>
        <input
          type='text'
          value={newPatient.name}
          onChange={(e) =>
            setNewPatient({ ...newPatient, name: e.target.value })
          }
          placeholder='Name'
        />
        <input
          type='number'
          value={newPatient.age}
          onChange={(e) =>
            setNewPatient({ ...newPatient, age: e.target.value })
          }
          placeholder='Age'
        />
        <input
          type='text'
          value={newPatient.condition}
          onChange={(e) =>
            setNewPatient({ ...newPatient, condition: e.target.value })
          }
          placeholder='Condition'
        />
        <button onClick={handleAddPatient}>Add Patient</button>
      </div>

      {/* Edit Patient */}
      {editingPatient && (
        <div className={styles.editForm}>
          <h3>Edit Patient</h3>
          <input
            type='text'
            value={editingPatient.name}
            onChange={(e) =>
              setEditingPatient({ ...editingPatient, name: e.target.value })
            }
          />
          <input
            type='number'
            value={editingPatient.age}
            onChange={(e) =>
              setEditingPatient({ ...editingPatient, age: e.target.value })
            }
          />
          <input
            type='text'
            value={editingPatient.condition}
            onChange={(e) =>
              setEditingPatient({
                ...editingPatient,
                condition: e.target.value,
              })
            }
          />
          <button onClick={() => handleEditPatient(editingPatient.id)}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  )
}

export default Patients

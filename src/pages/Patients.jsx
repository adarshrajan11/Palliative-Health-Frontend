// src/pages/Patients.js

import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import styles from './pagestyles/Patients.module.css';
import Modal from '../components/Modal';


const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    condition: '',
    address: '',
    phone: '',
    homeCareDate: '',
  });
  const [editingPatient, setEditingPatient] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/api/patients');
        setPatients(response.data);
      } catch (err) {
        setError('Failed to fetch patients');
      }
    };

    fetchPatients();
  }, []);

  const handleAddPatient = async () => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/patients', newPatient);
      setPatients([...patients, response.data]);
      setNewPatient({ name: '', age: '', condition: '', address: '', phone: '', homeCareDate: '' });
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to add patient');
    }
  };

  const handleEditPatient = async (id) => {
    try {
      const response = await axios.put(`/api/patients/${id}`, editingPatient);
      setPatients(
        patients.map((patient) => (patient.id === id ? response.data : patient))
      );
      setEditingPatient(null);
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to edit patient');
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`/api/patients/${id}`);
      setPatients(patients.filter((patient) => patient.id !== id));
    } catch (err) {
      setError('Failed to delete patient');
    }
  };

  const openAddModal = () => {
    console.log("clicked")
    setModalType('add');
    setIsModalOpen(true);
  };

  const openEditModal = (patient) => {
    setEditingPatient(patient);
    setModalType('edit');
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Patient Management</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button className={styles.addButton} onClick={openAddModal}>
        Add New Patient
      </button>

      {/* Patient Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Condition</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Home Care Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.condition}</td>
              <td>{patient.address}</td>
              <td>{patient.phone}</td>
              <td>{patient.homeCareDate}</td>
              <td>
                <button
                  className={styles.button30}
                  onClick={() => openEditModal(patient)}
                >
                  Edit
                </button>
                <button
                  className={styles.button30}
                  onClick={() => handleDeletePatient(patient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form className={styles.modalForm}>
            {modalType === 'add' ? (
              <>
                <h3>Add New Patient</h3>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  placeholder="Age"
                />
                <input
                  type="text"
                  value={newPatient.condition}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, condition: e.target.value })
                  }
                  placeholder="Condition"
                />
                <input
                  type="text"
                  value={newPatient.address}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, address: e.target.value })
                  }
                  placeholder="Address"
                />
                <input
                  type="text"
                  value={newPatient.phone}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, phone: e.target.value })
                  }
                  placeholder="Phone"
                />
                <input
                  type="date"
                  value={newPatient.homeCareDate}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, homeCareDate: e.target.value })
                  }
                />
                <button onClick={handleAddPatient}>Add Patient</button>
              </>
            ) : (
              <>
                <h3>Edit Patient</h3>
                <input
                  type="text"
                  value={editingPatient.name}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, name: e.target.value })
                  }
                  placeholder="Name"
                />
                <input
                  type="number"
                  value={editingPatient.age}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, age: e.target.value })
                  }
                  placeholder="Age"
                />
                <input
                  type="text"
                  value={editingPatient.condition}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, condition: e.target.value })
                  }
                  placeholder="Condition"
                />
                <button onClick={() => handleEditPatient(editingPatient.id)}>
                  Save Changes
                </button>
              </>
            )}
          </form>
        </Modal>
      )}

    </div>
  );
};

export default Patients;

import React, { useState } from "react";
import { FaDollarSign, FaMoneyCheckAlt } from "react-icons/fa"; 

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    studentName: "",
    amount: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editedPayment, setEditedPayment] = useState({});

  const handleChange = (e) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value });
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    const newEntry = { id: Date.now(), ...newPayment };
    setPayments([...payments, newEntry]);
    setNewPayment({ studentName: "", amount: "", date: "" });
  };

  const handleDelete = (id) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  const handleEdit = (payment) => {
    setEditingId(payment.id);
    setEditedPayment(payment);
  };

  const handleEditChange = (e) => {
    setEditedPayment({ ...editedPayment, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    setPayments(payments.map((payment) => (payment.id === editingId ? editedPayment : payment)));
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaMoneyCheckAlt className="text-green-500 mr-2" /> Payment Management
      </h2>

      <form onSubmit={handleAddPayment} className="mb-4 p-4 border rounded bg-gray-100">
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={newPayment.studentName}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <div className="relative inline-block">
          <FaDollarSign className="absolute left-2 top-3 text-gray-500" />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={handleChange}
            className="border p-2 pl-6 mr-2"
            required
          />
        </div>
        <input
          type="date"
          name="date"
          value={newPayment.date}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Payment
        </button>
      </form>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="text-center">
              {editingId === payment.id ? (
                <>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      name="studentName"
                      value={editedPayment.studentName}
                      onChange={handleEditChange}
                      className="border p-1"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <div className="relative inline-block">
                      <FaDollarSign className="absolute left-2 top-2 text-gray-500" />
                      <input
                        type="number"
                        name="amount"
                        value={editedPayment.amount}
                        onChange={handleEditChange}
                        className="border p-1 pl-6"
                      />
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="date"
                      name="date"
                      value={editedPayment.date}
                      onChange={handleEditChange}
                      className="border p-1"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border px-4 py-2">{payment.studentName}</td>
                  <td className="border px-4 py-2 flex items-center justify-center">
                    <FaDollarSign className="text-green-500 mr-1" />
                    {payment.amount}
                  </td>
                  <td className="border px-4 py-2">{payment.date}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEdit(payment)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(payment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;

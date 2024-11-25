import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import Base_Url from '../../config';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    fetch(Base_Url + 'orders/')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setOrderStatus(order.status);
  };

  const handleUpdateStatus = () => {
    if (selectedOrder) {
      fetch(Base_Url + `orders/${selectedOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: orderStatus }),
      })
        .then((response) => response.json())
        .then((updatedOrder) => {
          alert('Order status updated successfully');
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === updatedOrder.id ? updatedOrder : order
            )
          );
          setSelectedOrder(updatedOrder);
        })
        .catch((error) => console.error('Error updating order:', error));
    }
  };

  const handleApproveOrder = (orderId, isApproved) => {
    const newApprovalStatus = !isApproved;
    fetch(Base_Url + `orders/${orderId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_approved: newApprovalStatus }),
    })
      .then((response) => response.json())
      .then((updatedOrder) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );
      })
      .catch((error) => console.error('Error updating approval status:', error));
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', color: '#4CAF50' }}>
        Order Management
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: '#fff', borderRadius: '8px' }}>
        <Typography variant="h5" sx={{ padding: '10px', color: '#FF9800' }}>
          All Orders
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Is Approved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{
                  backgroundColor: selectedOrder?.id === order.id ? '#fff' : '#fff',
                  cursor: 'pointer',
                  color: '#000'
                }}
                onClick={() => handleSelectOrder(order)}
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.fname}</TableCell>
                <TableCell>{order.lname}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={order.is_approved ? 'success' : 'warning'}
                    onClick={() => handleApproveOrder(order.id, order.is_approved)}
                  >
                    {order.is_approved ? 'Approved' : 'Approve'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderManagement;

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

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');

  // Fetch all orders
  useEffect(() => {
    fetch('/api/v1/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  // Select an order to view details
  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setOrderStatus(order.status);
  };

  // Update order status
  const handleUpdateStatus = () => {
    if (selectedOrder) {
      fetch(`/api/v1/orders/${selectedOrder.id}`, {
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

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', color: '#4CAF50' }}>
        Order Management
      </Typography>

      {/* Orders Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: '#292929', borderRadius: '8px' }}>
        <Typography variant="h5" sx={{ padding: '10px', color: '#FF9800' }}>
          All Orders
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Order ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>User ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>Product ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>Quantity</TableCell>
              <TableCell sx={{ color: '#fff' }}>Status</TableCell>
              <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{
                  backgroundColor: selectedOrder?.id === order.id ? '#4CAF50' : '#333',
                  cursor: 'pointer',
                }}
                onClick={() => handleSelectOrder(order)}
              >
                <TableCell sx={{ color: '#fff' }}>{order.id}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{order.user_id}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{order.product_id}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{order.quantity}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{order.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleSelectOrder(order)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Selected Order Details */}
      {selectedOrder && (
        <Paper
          sx={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#292929',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h5" sx={{ color: '#4CAF50' }}>
            Order Details
          </Typography>
          <Typography>ID: {selectedOrder.id}</Typography>
          <Typography>User ID: {selectedOrder.user_id}</Typography>
          <Typography>Product ID: {selectedOrder.product_id}</Typography>
          <Typography>Quantity: {selectedOrder.quantity}</Typography>
          <Typography>Status: {selectedOrder.status}</Typography>
          <Typography>Address: {selectedOrder.address}</Typography>

          <Typography variant="h6" sx={{ marginTop: '20px', color: '#FF9800' }}>
            Contact Customer
          </Typography>
          <Typography>Email: {selectedOrder.user_email}</Typography>
          <Typography>Phone: {selectedOrder.user_phone || 'Not Available'}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: '10px' }}
            onClick={() => window.open(`mailto:${selectedOrder.user_email}`, '_blank')}
          >
            Send Email
          </Button>

          <FormControl fullWidth sx={inputStyle}>
            <InputLabel>Update Status</InputLabel>
            <Select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="canceled">Canceled</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateStatus}
            sx={{ marginTop: '10px' }}
          >
            Update Status
          </Button>
        </Paper>
      )}
    </Box>
  );
};

// Input styles
const inputStyle = {
  marginBottom: '15px',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#333',
    color: '#fff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#555',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4CAF50',
  },
  '& .MuiInputLabel-root': {
    color: '#4CAF50',
  },
};

export default OrderManagement;

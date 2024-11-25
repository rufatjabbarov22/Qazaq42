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
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', color: '#000' }}>
        Order Management
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: '#fff', borderRadius: '8px' }}>
        {/* <Typography variant="h5" sx={{ padding: '10px', color: '#000' }}>
          All Orders
        </Typography> */}
        <Table>
          {/* <TableHead sx={{ backgroundColor: '#4CAF50', }}>
            <TableRow >
              <TableCell sx={{ color: '#fff' }}>Order ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>First Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Last Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Phone</TableCell>
              <TableCell sx={{ color: '#fff' }}>Email</TableCell>
              <TableCell sx={{ color: '#fff' }}>Address</TableCell>
              <TableCell sx={{ color: '#fff' }}>Is Approved</TableCell>
            </TableRow>
          </TableHead> */}
          <TableHead sx={{ backgroundColor: '#4CAF50' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>#</TableCell> {/* Add a column for row numbers */}
              <TableCell sx={{ color: '#fff' }}>Order ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>First Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Last Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Phone</TableCell>
              <TableCell sx={{ color: '#fff' }}>Email</TableCell>
              <TableCell sx={{ color: '#fff' }}>Address</TableCell>
              <TableCell sx={{ color: '#fff' }}>Is Approved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => ( // Use index to generate row numbers
              <TableRow
                key={order.id}
                sx={{
                  backgroundColor: selectedOrder?.id === order.id ? '#fff' : '#fff',
                  cursor: 'pointer',
                  color: '#000',
                }}
                onClick={() => handleSelectOrder(order)}
              >
                <TableCell>{index + 1}</TableCell> {/* Display row number */}
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
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the onClick for the row
                      handleApproveOrder(order.id, order.is_approved);
                    }}
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

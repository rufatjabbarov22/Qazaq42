// import React from 'react';
// import { Typography, Box, Table, TableBody, TableCell, TableRow } from '@mui/material';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import './AISection.css';

// // Registering the necessary components for Chart.js
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const plantSuggestions = [
//   { name: 'Tomatoes', icon: '🍅', description: 'High water needs, grows well in warm climates.' },
//   { name: 'Carrots', icon: '🥕', description: 'Prefers loose, well-drained soil, tolerates cooler temperatures.' },
//   { name: 'Lettuce', icon: '🥬', description: 'Thrives in moist, well-drained soil with partial shade.' },
//   { name: 'Cucumbers', icon: '🥒', description: 'Prefers warm temperatures, moist soil, and plenty of sun.' },
//   { name: 'Peppers', icon: '🌶️', description: 'Enjoys sunny spots and nutrient-rich soil.' },
// ];

// const AISection = () => {
//   // Chart data for nutrient levels
//   const chartData = {
//     labels: ['Moisture', 'pH Level', 'Nutrient Levels'],
//     datasets: [
//       {
//         label: 'Soil Analysis',
//         data: [45, 6.5, 90],
//         backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(153, 102, 255, 0.6)'],
//         borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
//         borderWidth: 2,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//       },
//     },
//   };

//   return (
//     <Box className="ai-section">
//       <Box className="ai-result-box">
//         <Typography variant="h4" gutterBottom className="animated-title">
//           AI Recommendations
//         </Typography>

//         {/* Soil Analysis Results */}
//         <Box className="soil-analysis">
//           <Typography variant="body1" sx={{ fontSize: '1.5rem', marginTop: '10px' }}>
//             Soil Moisture: 45%
//           </Typography>
//           <Typography variant="body1" sx={{ fontSize: '1.5rem', marginTop: '10px' }}>
//             pH Level: 6.5
//           </Typography>
//           <Typography variant="body1" sx={{ fontSize: '1.5rem', marginTop: '10px' }}>
//             Nutrient Levels: High
//           </Typography>
//         </Box>

//         {/* Chart for Soil Analysis */}
//         <Box className="chart-container">
//           <Bar data={chartData} options={chartOptions} />
//         </Box>

//         <Typography variant="h6" gutterBottom sx={{ marginTop: '20px' }}>
//           Recommended Plants to Grow:
//         </Typography>

//         {/* Plant Suggestions Table */}
//         <Table>
//           <TableBody>
//             {plantSuggestions.map((plant, index) => (
//               <TableRow key={index} className="animated-table-row">
//                 <TableCell align="center" sx={{ fontSize: '2rem' }}>{plant.icon}</TableCell>
//                 <TableCell align="left" sx={{ fontSize: '1.2rem' }}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{plant.name}</Typography>
//                   <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#555' }}>{plant.description}</Typography>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>
//     </Box>
//   );
// };

// export default AISection;

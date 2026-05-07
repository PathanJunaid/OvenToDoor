// import React from 'react';

import React, { useContext, useState } from "react";
import { AdminStoreContext } from "../../context/AdminStoreContextProvider";
import './Notification.css'
import { DateTime } from "../../Functons/Function";
import { Link } from "react-router-dom";
const Notification = () => {
  const { notification } = useContext(AdminStoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('All');
  const itemsPerPage = 10;

  const filteredNotifications = notification.filter(notification => {
    if (filter === 'All') return true;
    if (filter === 'Date') return true; // Assuming Date filter is applied separately
    return notification.Status === filter;
  });

  // Sort notifications by date if the 'Date' filter is selected
  if (filter === 'Date') {
    filteredNotifications.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Calculate total pages based on filtered notifications
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  // Get current items based on pagination and filter
  const currentItems = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
    console.log(filter)
  };
  return (
    <>
      <div>
        <label>Filter by: </label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Date">Date</option>
          <option value="waiting">Waiting</option>
          <option value="Delivered">Delivered</option>
          <option value="Out for Delivery">Out for delivery</option>
        </select>
      </div>
      <div className="Notification-container">
        <table className="Notification-Table">
          <thead>
            <tr className="Notification-Rows fw-bold">
              <td className="Notification-cell">Order_ID</td>
              <td className="Notification-cell">User_Name</td>
              <td className="Notification-cell">Date</td>
              <td className="Notification-cell">Time</td>
              <td className="Notification-cell">Status</td>
              <td className="Notification-cell">View more</td>
            </tr>

          </thead>
          <tbody>

            {
              currentItems.map((ele) => {
                const Date = DateTime(ele.createdAt);
                return (
                  <tr className="Notification-Rows" key={ele._id}>
                    <td className="Notification-cell">{ele.Order_id}</td>
                    <td className="Notification-cell">{ele.User_Name}</td>
                    <td className="Notification-cell">{Date.formattedDate}</td>
                    <td className="Notification-cell">{Date.formattedTime}</td>
                    <td className="Notification-cell">{ele.Status}</td>
                    <td className="Notification-cell">
                      <Link to={`/admin/order/${ele.Order_id}`} className="View_detail">
                        View More
                      </Link>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </div>
      <div className="d-flex align-items-center justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button className="btn"
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  )
}

export default Notification;
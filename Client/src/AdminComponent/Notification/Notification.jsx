// import React from 'react';

import { useContext, useState } from "react";
import { AdminStoreContext } from "../../context/AdminStoreContextProvider";
import './Notification.css'
import { DateTime } from "../../Functons/Function";
import { Link } from "react-router-dom";
const Notification = () => {
  const { notification, setnotification } = useContext(AdminStoreContext);
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
        <div className="Notification-header">
          <div>Order_ID</div>
          <div>User_Name</div>
          <div>Date</div>
          <div>Time</div>
          <div>Status</div>
          <div>View more</div>
        </div>
        {
          currentItems.map((ele) => {
            const Date = DateTime(ele.createdAt);
            return (
              <div className="Notification-header" key={ele._id}>
                <div>{ele.Order_id}</div>
                <div>{ele.User_Name}</div>
                <div>{Date.formattedDate}</div>
                <div>{Date.formattedTime}</div>
                <div>{ele.Status}</div>
                <div>
                  <Link to={`/admin/notification/${ele.Order_id}`}>
                    View More
                  </Link>
                </div>
              </div>
            )
          })
        }
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
// BookingsByVenue.js
import React from "react"
import { Table } from "react-bootstrap"


export function BookingsByVenue({ venue, formatDate }) {
    const bookings = venue.bookings || [];

  return (
   <div>
      <h3>Bookings for {venue.name}</h3>
      {bookings.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date From</th>
              <th>Date To</th>
              <th>Guests</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{formatDate(booking.dateFrom)}</td>
                <td>{formatDate(booking.dateTo)}</td>
                <td>{booking.guests}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>There are no bookings for this venue yet.</p>
      )}
    </div>
  );
}
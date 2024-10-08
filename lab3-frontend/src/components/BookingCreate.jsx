import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';

const BookingForm = () => {
    const [partySize, setPartySize] = useState('');
    const [bookingStart, setBookingStart] = useState('');
    const [bookingEnd, setBookingEnd] = useState('');
    const [availableTables, setAvailableTables] = useState([]);
    const [error, setError] = useState(null);
    const [selectedTableId, setSelectedTableId] = useState(null);
    const location = useLocation();
    const { customerId } = location.state || {};
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const tableRequest = {
            partySize: parseInt(partySize, 10),
            bookingStart,
            bookingEnd
        };

        try {
            const tableResponse = await axios.post('https://localhost:7234/api/Table/getAvailableTables', tableRequest);
            setAvailableTables(tableResponse.data);
            setError(null);

        } catch (error) {
            console.error('Error fetching available tables:', error);
            setError('Failed to fetch available tables.');
        }
    }

    async function handleBooking() {
        if (!selectedTableId) {
            alert('Please select a table to book.');
            return;
        }

        const bookingData = {
            id: 0,
            partySize: partySize,
            bookingStart: bookingStart,
            bookingEnd: bookingEnd,
            tableId: selectedTableId,
            customerId: 0

        };

        try {
            const response = await axios.post(`https://localhost:7234/api/Booking/addBooking/${customerId}`, bookingData);

            console.log('Booking response:', response.data);

            if (window.confirm('Booking successful! Would you like to return to the home page?')) {
                window.location.href = 'https://localhost:7010/';
            }


        } catch (error) {
            console.error('Error creating booking:', error);
            setError('Failed to create booking.' + { bookingData });
        }
    }

    function handleRedirect(e) {
        navigate('/');
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Booking Form for Customer {customerId}</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className='form-label' htmlFor='partySize'>Party Size:</label>
                    <input
                        id='partySize'
                        type="number"
                        className='form-control'
                        value={partySize}
                        onChange={(e) => setPartySize(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor='bookingStart'>Booking Start:</label>
                    <input
                        id='bookingStart'
                        type="datetime-local"
                        className="form-control"
                        value={bookingStart}
                        onChange={(e) => setBookingStart(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor='bookingEnd'>Booking End:</label>
                    <input
                        id='bookingEnd'
                        type="datetime-local"
                        className="form-control"
                        value={bookingEnd}
                        onChange={(e) => setBookingEnd(e.target.value)}
                        required
                    />
                </div>

                <button type='submit' className="btn btn-primary">Find Available Tables</button>

            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {availableTables.length === 0 && (
                <div className="alert alert-warning mt-3">
                    No tables match your requirements.
                </div>
            )}

            {availableTables.length > 0 && (
                <div className="mt-4">
                    <h3>Available Tables. Currently selected: {selectedTableId}</h3>
                    <ul className="list-group">
                        {availableTables.map((table) => (
                            <li key={table.id} className="list-group-item d-flex justify-content-between align-items-center">
                                Table {table.id} - Capacity: {table.capacity}
                                <button
                                    className={`btn btn-sm ${selectedTableId === table.id ? 'btn-danger' : 'btn-success'}`}
                                    onClick={() => setSelectedTableId(table.id)}
                                >
                                    Select
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-warning mt-3" onClick={handleBooking}>Book Selected Table</button>

                </div>

            )}
            <button onClick={handleRedirect} className='mt-3 btn btn-secondary'>Return</button>
        </div>
    );
};

export default BookingForm;

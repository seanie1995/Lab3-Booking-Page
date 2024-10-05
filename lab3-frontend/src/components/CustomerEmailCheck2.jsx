import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerEmailCheck = () => {
    const [customerData, setCustomerData] = useState({
        id: 0,
        lastName: '',
        firstName: '',
        email: ''
    });
    const [error, setError] = useState();
    const navigate = useNavigate();

    async function handleCustomerInput(e) {
        e.preventDefault();
        try {
            const response = await axios.get(`https://localhost:7234/api/Customer/getCustomerByEmail/${customerData.email}`);

            if (response.data) {
                const customerId = response.data;
                navigate('/booking', { state: { customerId } });
            }
        } catch {
            console.error('Error fetching customer or not found:', error)
            setError('Failed to check customer registration')
            await axios.post('https://localhost:7234/api/Customer/addCustomer', customerData);
            //alert('Your credentials are now registered');
            const response = await axios.get(`https://localhost:7234/api/Customer/getCustomerByEmail/${customerData.email}`);
            const customerId = response.data;
            navigate('/booking', { state: { customerId } });

        }
    }

    function handleRedirect(e) {
        window.location.href = 'https://localhost:7010/';
    }

    return (

        <div className='container'>
            <h2>Please enter your credentials</h2>

            <form onSubmit={handleCustomerInput}>
                <div className='mb-3'>
                    <label htmlFor='lastName' className='form-label'>Last Name:</label>
                    <input
                        type='lastName'
                        className='form-control'
                        id='lastName'
                        value={customerData.lastName}
                        onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='firstName' className='form-label'>First Name:</label>
                    <input
                        type='firstName'
                        className='form-control'
                        id='firstName'
                        value={customerData.firstName}
                        onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>Email:</label>
                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        value={customerData.email}
                        onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                        required
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
                <button onClick={handleRedirect} className='mx-1 btn btn-secondary'>Return</button>
            </form>
        </div>

    );
};

export default CustomerEmailCheck;


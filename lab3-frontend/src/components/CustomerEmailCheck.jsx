import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerEmailCheck = () => {
    const [isRegistered, setIsRegistered] = useState(null);
    const [email, setEmail] = useState("");
    const [customerData, setCustomerData] = useState({
        id: 0,
        lastName: '',
        firstName: '',
        email: ''
    });
    const [error, setError] = useState();
    const navigate = useNavigate();

    async function handleCustomerCheck(e) {
        e.preventDefault();
        try {
            const response = await axios.get(`https://localhost:7234/api/Customer/getCustomerByEmail/${email}`);

            if (response.data) {
                const customerId = response.data;
                setIsRegistered(true);

                navigate('/booking', { state: { customerId } });
            } else {
                setIsRegistered(false);
                alert('Customer not found. Please register your email.');
            }

        } catch (error) {

            console.error('Error fetching customer:', error);
            setError('Failed to check customer registration.');
            setIsRegistered(false);
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        try {
            await axios.post('https://localhost:7234/api/Customer/addCustomer', customerData);
            alert('Your credentials are now registered');
            navigate('/booking');
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Could not register user.');
        }
    }

    return (

        <div className='container'>
            <h2>Customer Registration</h2>
            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleCustomerCheck}>
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>Email:</label>
                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Check Registration</button>
            </form>

            {isRegistered === false && (
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={customerData.firstName}
                            onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={customerData.lastName}
                            onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="registerEmail" className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="registerEmail"
                            value={customerData.email}
                            onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Register</button>
                </form>
            )}
        </div>
    );
};

export default CustomerEmailCheck;

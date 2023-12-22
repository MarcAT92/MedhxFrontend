import React, { useState } from "react";
import { useInfoContext } from '../hooks/useInfoContext';
import { useAuthContext } from "../hooks/useauthContext";
import {jwtDecode} from 'jwt-decode';

const InfoForm = () => {
    const { dispatch } = useInfoContext();
    const { user, dispatch: authDispatch } = useAuthContext();

    const [title, setTitle] = useState('');
    const [bloodpressure, setBloodpressure] = useState('');
    const [heartrate, setHeartrate] = useState('');
    const [bloodsugar, setBloodsugar] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [bloodPressureError, setBloodPressureError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
    // Check if the token is expired
    const isTokenExpired = checkTokenExpiration(user.token);

        if (isTokenExpired) {
        // Token is expired, initiate logout
        authDispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
        return;
        }

        if (!user) {
            setError('You must be logged in');
            return;
        }

        if (bloodPressureError) {
            setError('Blood pressure format is incorrect');
            return;
        }

        const info = { title, bloodpressure, heartrate, bloodsugar };

        const response = await fetch(`https://kind-erin-viper-hose.cyclic.app/api/info`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            setTitle('');
            setBloodpressure('');
            setHeartrate('');
            setBloodsugar('');
            setError(null);
            setEmptyFields([]);
            dispatch({ type: 'CREATE_INFO', payload: json });
        }
    };

    // Function to check token expiration
    const checkTokenExpiration = (token) => {
        if (!token) {
        return true;
        }

        try {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp * 1000 < Date.now(); // Assuming expiration time is in seconds
        } catch (error) {
        console.error('Error decoding token:', error);
        return true;
        }
    };

    const handleInputChange = (e, field, maxDigits) => {
    const inputValue = e.target.value;

    if (inputValue.length <= maxDigits || inputValue === '') {
        switch (field) {
            case 'title':
                setTitle(inputValue);
                break;
            case 'bloodpressure':
                const bloodPressureRegex = /^\d{0,3}(\/\d{0,3})?$/;

                if (bloodPressureRegex.test(inputValue) || inputValue === '') {
                    setBloodpressure(inputValue);
                    setBloodPressureError(null);
                } else {
                    setBloodPressureError('Use the format 120/60');
                }
                break;
            case 'heartrate':
                setHeartrate(inputValue);
                break;
            case 'bloodsugar':
                setBloodsugar(inputValue);
                break;
            default:
                break;
        }
    }
};

    
       return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Reading</h3>

            <label>Mood</label>
            <input
                type="text"
                maxLength="7"
                onChange={(e) => handleInputChange(e, 'title', 7)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Blood Pressure (mmHg)</label>
            <input
                type="text"
                maxLength="7"
                placeholder="e.g., 120/80"
                onChange={(e) => handleInputChange(e, 'bloodpressure', 6)}
                value={bloodpressure}
                className={(emptyFields.includes('bloodpressure') || bloodPressureError) ? 'error' : ''}
            />
            {bloodPressureError && <div className="error">{bloodPressureError}</div>}

            <label>Heart Rate (BPM)</label>
            <input
                type="number"
                maxLength="3"
                placeholder="e.g., 75"
                onChange={(e) => handleInputChange(e, 'heartrate', 3)}
                value={heartrate}
                className={emptyFields.includes('heartrate') ? 'error' : ''}
            />

            <label>Blood Sugar (mg/dL)</label>
            <input
                type="number"
                maxLength="3"
                placeholder="e.g., 89"
                onChange={(e) => handleInputChange(e, 'bloodsugar', 3)}
                value={bloodsugar}
                className={emptyFields.includes('bloodsugar') ? 'error' : ''}
            />

            <button>Add Measurement</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default InfoForm;

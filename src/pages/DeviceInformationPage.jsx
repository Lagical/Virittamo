import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

function DeviceInformationPage() {
    const [deviceDetails, setDeviceDetails] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const deviceId = searchParams.get('deviceId');

        // Fetch device details based on the device ID
        fetch(`http://localhost:3000/formdata/${deviceId}`)
            .then(response => response.json())
            .then(data => setDeviceDetails(data))
            .catch(error => console.error('Error fetching device details:', error));
    }, [location.search]);

    return (
        <div>
            <br /><br />
            <Typography variant="h5" gutterBottom>Device Details</Typography>
            {deviceDetails && (
                <div>
                    <Typography>Device name: {deviceDetails.deviceName}</Typography>
                    <Typography>Device number: {deviceDetails.deviceNumber}</Typography>
                    <Typography>Date of issue: {deviceDetails.dateOfIssue}</Typography>
                    <Typography>Manufacturer: {deviceDetails.manufacturer}</Typography>
                    <Typography>Recipient name: {deviceDetails.recipientName}</Typography>
                    <Typography>Department: {deviceDetails.department}</Typography>
                    <Typography>Returning date: {deviceDetails.returningDate}</Typography>
                </div>
            )}
        </div>
    );
}

export default DeviceInformationPage;
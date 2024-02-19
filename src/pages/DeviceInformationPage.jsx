import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';

// Component to render the list of devices
function DeviceList(props) {
    const { devices } = props;

    return (
        <div>
            <Typography variant="h5" gutterBottom>Device history</Typography>
            {/* Map through the devices array and render device details */}
            {devices.map((device, index) => (
                <div key={index}>
                    <Typography>Device name: {device.deviceName}</Typography>
                    <Typography>Device number: {device.deviceNumber}</Typography>
                    <Typography>Date of issue: {device.dateOfIssue}</Typography>
                    <Typography>Manufacturer: {device.manufacturer}</Typography>
                    <Typography>Recipient name: {device.recipientName}</Typography>
                    <Typography>Department: {device.department}</Typography>
                    <Typography>Returning date: {device.returningDate}</Typography>
                    <br />
                </div>
            ))}
        </div>
    );
}

// Main component for displaying device information and history
function DeviceInformationPage() {
    const [deviceDetails, setDeviceDetails] = useState(null); 
    const [relatedDevices, setRelatedDevices] = useState([]);
    const [searched, setSearched] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    // Function to fetch related devices based on device name and number
    const fetchDevicesWithSameNameAndNumber = (deviceName, deviceNumber) => {
        fetch(`http://localhost:3000/formdata?deviceName=${deviceName}&deviceNumber=${deviceNumber}`)
            .then(response => response.json())
            .then(data => {
                setRelatedDevices(data); // Set related devices
                setSearched(true); // Indicate that search is performed
            })
            .catch(error => console.error('Error fetching related devices:', error));
    };

    // Handle button click event
    const handleButtonClick = () => {
        if (deviceDetails) {
            // Toggle show/hide history based on current state
            if (showHistory) {
                setShowHistory(false); // Hide history if currently shown
            } else {
                fetchDevicesWithSameNameAndNumber(deviceDetails.deviceName, deviceDetails.deviceNumber); // Fetch related devices
                setShowHistory(true); // Show history
            }
        }
    };

    // Effect to fetch device details when component mounts
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const deviceId = searchParams.get('deviceId');

        fetch(`http://localhost:3000/formdata/${deviceId}`)
            .then(response => response.json())
            .then(data => setDeviceDetails(data))
            .catch(error => console.error('Error fetching device details:', error));
    }, []);

    // Effect to filter related devices based on selected device details
    useEffect(() => {
        if (searched && deviceDetails) {
            // Filter related devices based on the selected device's name and number
            const filteredDevices = relatedDevices.filter(device =>
                device.deviceName === deviceDetails.deviceName && device.deviceNumber === deviceDetails.deviceNumber
            );
            setRelatedDevices(filteredDevices); // Update related devices with filtered list
        }
    }, [searched, deviceDetails]);

    return (
        <div>
            <br /><br />
            <Typography variant="h5" gutterBottom>Device Details</Typography>
            {/* Display selected device details */}
            <div>
                <Typography>Device name: {deviceDetails?.deviceName}</Typography>
                <Typography>Device number: {deviceDetails?.deviceNumber}</Typography>
                <Typography>Date of issue: {deviceDetails?.dateOfIssue}</Typography>
                <Typography>Manufacturer: {deviceDetails?.manufacturer}</Typography>
                <Typography>Recipient name: {deviceDetails?.recipientName}</Typography>
                <Typography>Department: {deviceDetails?.department}</Typography>
                <Typography>Returning date: {deviceDetails?.returningDate}</Typography>
            </div>
            <br />
            {/* Button to toggle showing/hiding device history */}
            <Button variant="contained" onClick={handleButtonClick}>
                {showHistory ? 'Hide Device history' : 'Show Device history'}
            </Button>
            {/* Display device history if showHistory is true and relatedDevices is not empty */}
            {showHistory && searched && relatedDevices.length > 0 && <DeviceList devices={relatedDevices} />}
        </div>
    );
}

export default DeviceInformationPage;
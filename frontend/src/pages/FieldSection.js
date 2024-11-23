import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FieldSection.css";

const FieldSection = () => {
    const [districts, setDistricts] = useState([]);
    const [fieldName, setFieldName] = useState("");
    const [fieldSize, setFieldSize] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch districts on component load
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/districts/");
                setDistricts(response.data);
            } catch (err) {
                console.error("Error fetching districts:", err);
                setError("Failed to load districts.");
            }
        };

        fetchDistricts();
    }, []);

    // Load fields from localStorage on component load
    useEffect(() => {
        const storedFields = JSON.parse(localStorage.getItem("fields")) || [];
        setFields(storedFields);
    }, []);

    // Save fields to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("fields", JSON.stringify(fields));
    }, [fields]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fieldName || !fieldSize || !selectedDistrict) {
            setError("Please fill all fields.");
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post("http://localhost:8000/api/v1/fields/", {
                name: fieldName,
                size: parseInt(fieldSize, 10),
                district_id: selectedDistrict,
            });

            const newField = response.data;
            setFields((prevFields) => [...prevFields, newField]); // Add the new field to the fields list
            setSuccess(`Field created successfully: ${newField.name}`);
            setFieldName("");
            setFieldSize("");
            setSelectedDistrict("");
        } catch (err) {
            console.error("Error creating field:", err);
            setError("Failed to create field. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="field-section">
            <h1>Create and View Fields</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="field-form">
                <div className="form-group">
                    {/* <label>Field Name:</label> */}
                    <input
                        type="text"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value)}
                        placeholder="Enter field name"
                        required
                    />
                </div>

                <div className="form-group">
                    {/* <label>Field Size:</label> */}
                    <input
                        type="number"
                        value={fieldSize}
                        onChange={(e) => setFieldSize(e.target.value)}
                        placeholder="Enter field size (hectares)"
                        required
                    />
                </div>

                <div className="form-group">
                    {/* <label>District:</label> */}
                    <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        required
                    >
                        <option value="">Select a district</option>
                        {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Field"}
                </button>
            </form>

            {/* Feedback Messages */}
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            {/* Fields List */}
            {/* <div className="fields-list">
                <h2>Your Fields</h2>
                {fields.length > 0 ? (
                    <div className="fields-grid">
                        {fields.map((field) => {
                            // Find the district name by matching the district_id
                            const district = districts.find((d) => d.id === field.district_id);

                            return (
                                <div key={field.id} className="field-card">
                                    <div className="field-details">
                                        <h3>Field Name - {field.name}</h3>
                                        <p>
                                            <strong>Size:</strong> {field.size} hectares
                                        </p>
                                        <p>
                                            <strong>District:</strong> {district ? district.name : "Unknown"} 
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="no-fields-message">No fields created yet. Start by adding a new field!</p>
                )}
            </div> */}


        </div>
    );
};

export default FieldSection;

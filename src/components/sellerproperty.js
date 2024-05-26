import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const ResponsiveTableContainer = styled(TableContainer)(({ theme }) => ({
  "& table": {
    width: "100%",
    overflowX: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      overflowX: "auto",
      "& thead": {
        display: "none",
      },
      "& tbody, & tr, & td": {
        display: "block",
        width: "100%",
      },
      "& tr": {
        marginBottom: "1rem",
      },
      "& td": {
        textAlign: "right",
        paddingLeft: "50%",
        position: "relative",
        "&:before": {
          content: 'attr(data-label)',
          position: "absolute",
          left: "0",
          width: "50%",
          paddingLeft: "1rem",
          fontWeight: "bold",
          textAlign: "left",
        },
      },
    },
  },
}));

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [newProperty, setNewProperty] = useState({
    place: "",
    area: "",
    bedrooms: 0,
    bathrooms: 0,
    hospitalsNearby: false,
    collegesNearby: false,
  });
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [interestedBuyers, setInterestedBuyers] = useState([]);

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(storedProperties);
    const storedInterestedBuyers = JSON.parse(localStorage.getItem("interestedBuyers")) || [];
    setInterestedBuyers(storedInterestedBuyers);
  }, []);

  const updateLocalStorage = (updatedProperties, updatedBuyers) => {
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
    localStorage.setItem("interestedBuyers", JSON.stringify(updatedBuyers));
  };

  const handleAddProperty = () => {
    if (!newProperty.place || !newProperty.area) {
      alert("Please fill in all required fields (Place, Area)");
      return;
    }

    const propertyWithId = {
      ...newProperty,
      id: properties.length + 1,
    };

    const updatedProperties = [...properties, propertyWithId];
    setProperties(updatedProperties);
    updateLocalStorage(updatedProperties, interestedBuyers);

    setNewProperty({
      place: "",
      area: "",
      bedrooms: 0,
      bathrooms: 0,
      hospitalsNearby: false,
      collegesNearby: false,
    });
    alert("Property added successfully");
  };

  const handleEditProperty = (propertyId) => {
    const propertyToEdit = properties.find((property) => property.id === propertyId);
    if (propertyToEdit) {
      setNewProperty({ ...propertyToEdit });
      setEditingPropertyId(propertyId);
    }
  };

  const handleSaveProperty = () => {
    const updatedProperties = properties.map((property) =>
      property.id === editingPropertyId ? { ...newProperty, id: editingPropertyId } : property
    );
    setProperties(updatedProperties);
    updateLocalStorage(updatedProperties, interestedBuyers);

    setNewProperty({
      place: "",
      area: "",
      bedrooms: 0,
      bathrooms: 0,
      hospitalsNearby: false,
      collegesNearby: false,
    });
    setEditingPropertyId(null);
    alert("Property updated successfully");
  };

  const handleDeleteProperty = (propertyId) => {
    const updatedProperties = properties.filter((property) => property.id !== propertyId);
    setProperties(updatedProperties);
    updateLocalStorage(updatedProperties, interestedBuyers);
    setEditingPropertyId(null);
    alert("Property deleted successfully");
  };

  const handleDeleteBuyer = (buyerId) => {
    const updatedBuyers = interestedBuyers.filter((buyer) => buyer.id !== buyerId);
    setInterestedBuyers(updatedBuyers);
    updateLocalStorage(properties, updatedBuyers);
    alert("Buyer deleted successfully");
  };

  const handleLogout = () => {
    navigate("/login");
    alert("Logout successful");
  };

  return (
    <Container>
      <Button variant="contained" color="secondary" onClick={handleLogout} style={{ float: "right", marginTop: "20px" }}>
        Logout
      </Button>
      <Typography variant="h4" gutterBottom>
        Property Management
      </Typography>
      <div>
        <TextField
          label="Place"
          value={newProperty.place}
          onChange={(e) => setNewProperty({ ...newProperty, place: e.target.value })}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Area"
          value={newProperty.area}
          onChange={(e) => setNewProperty({ ...newProperty, area: e.target.value })}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Bedrooms"
          type="number"
          value={newProperty.bedrooms}
          onChange={(e) => setNewProperty({ ...newProperty, bedrooms: e.target.value })}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Bathrooms"
          type="number"
          value={newProperty.bathrooms}
          onChange={(e) => setNewProperty({ ...newProperty, bathrooms: e.target.value })}
          margin="normal"
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newProperty.hospitalsNearby}
              onChange={(e) => setNewProperty({ ...newProperty, hospitalsNearby: e.target.checked })}
            />
          }
          label="Hospitals Nearby"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newProperty.collegesNearby}
              onChange={(e) => setNewProperty({ ...newProperty, collegesNearby: e.target.checked })}
            />
          }
          label="Colleges Nearby"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editingPropertyId ? handleSaveProperty : handleAddProperty}
          style={{ marginTop: "10px" }}
        >
          {editingPropertyId ? "Save Property" : "Add Property"}
        </Button>
      </div>
      <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
        Properties List
      </Typography>
      <ResponsiveTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Place</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Bedrooms</TableCell>
              <TableCell>Bathrooms</TableCell>
              <TableCell>Hospitals Nearby</TableCell>
              <TableCell>Colleges Nearby</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell data-label="ID">{property.id}</TableCell>
                <TableCell data-label="Place">{property.place}</TableCell>
                <TableCell data-label="Area">{property.area}</TableCell>
                <TableCell data-label="Bedrooms">{property.bedrooms}</TableCell>
                <TableCell data-label="Bathrooms">{property.bathrooms}</TableCell>
                <TableCell data-label="Hospitals Nearby">{property.hospitalsNearby ? "Yes" : "No"}</TableCell>
                <TableCell data-label="Colleges Nearby">{property.collegesNearby ? "Yes" : "No"}</TableCell>
                <TableCell data-label="Actions">
                  <Button onClick={() => handleEditProperty(property.id)}>Edit</Button>
                  <Button onClick={() => handleDeleteProperty(property.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ResponsiveTableContainer>
      <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
        Interested Buyers
      </Typography>
      <ResponsiveTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Buyer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Interested Property</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interestedBuyers.map((buyer) => (
              <TableRow key={buyer.id}>
                <TableCell data-label="Buyer Name">{buyer.name}</TableCell>
                <TableCell data-label="Email">{buyer.email}</TableCell>
                <TableCell data-label="Phone">{buyer.phone}</TableCell>
                <TableCell data-label="Interested Property">{buyer.propertyId}</TableCell>
                <TableCell data-label="Actions">
                  <Button onClick={() => handleDeleteBuyer(buyer.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ResponsiveTableContainer>
    </Container>
  );
};

export default PropertyManagement;

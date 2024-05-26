import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const BuyerPage = () => {
  const [properties, setProperties] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [buyerDetails, setBuyerDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate=useNavigate()

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    const user = JSON.parse(localStorage.getItem('loggedInUser')) || [];
    if(!user || user.role !== 'buyer'){
      navigate('/login')
    } 
    setProperties(storedProperties);
  }, []);

  

  const handleOpenDialog = (property) => {
    setSelectedProperty(property);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedProperty(null);
    setBuyerDetails({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerDetails({ ...buyerDetails, [name]: value });
  };

  const handleSubmitInterest = () => {
    if (!buyerDetails.name || !buyerDetails.email || !buyerDetails.phone) {
      alert("Please fill in all required fields");
      return;
    }

    const interestedBuyers = JSON.parse(localStorage.getItem("interestedBuyers")) || [];
    const newInterest = {
      ...buyerDetails,
      propertyId: selectedProperty.id,
      propertyName: selectedProperty.place,
    };

    interestedBuyers.push(newInterest);
    localStorage.setItem("interestedBuyers", JSON.stringify(interestedBuyers));
    handleCloseDialog();
    alert("Your interest has been recorded. The seller will contact you soon.");
    
  };
  const handleLogout = () => {
    navigate("/login");
    alert("Logout successful");
  };

  return (
    <Container>
       <Button variant="contained" color="secondary" onClick={handleLogout} style={{ float: 'right', marginTop: '20px' }}>
        Logout
      </Button>
      <Typography variant="h4" gutterBottom>
        Properties for Sale
      </Typography>
      <TableContainer component={Paper}>
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
                <TableCell>{property.id}</TableCell>
                <TableCell>{property.place}</TableCell>
                <TableCell>{property.area}</TableCell>
                <TableCell>{property.bedrooms}</TableCell>
                <TableCell>{property.bathrooms}</TableCell>
                <TableCell>{property.hospitalsNearby ? "Yes" : "No"}</TableCell>
                <TableCell>{property.collegesNearby ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenDialog(property)}>I'm Interested</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Express Your Interest</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are interested in <strong>{selectedProperty && selectedProperty.place}</strong>.
            Please provide your contact details, and the seller will reach out to you.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={buyerDetails.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={buyerDetails.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="tel"
            fullWidth
            name="phone"
            value={buyerDetails.phone}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitInterest} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BuyerPage;

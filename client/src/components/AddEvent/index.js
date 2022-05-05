import React, {useState} from 'react';
import '../../App.css';
import Event from '../Event/Event';
import * as React from "react";
import {useState} from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";


const AddEvent = () => {

    // const [eventFormData, setEventFormData] = useState({
    //     eventName:"",
    //     eventDate: "",
    //     eventText: "",
    //     category: ""
    // }) 

    // const [addEvent, { error }] = useMutation(ADD_EVENT);

    // const handleFormSubmit = async event => {
    //     event.preventDefault();
      
    //     try {
    //       // add thought to database
    //       await addEvent({
    //         variables: {}
    //       });
      
    //       // clear form value
    //     //   setText('');
    //     //   setCharacterCount(0);
    //     // } catch (e) {
    //     //   console.error(e);
    //     // }
    //   };

    const [value, setValue] = React.useState(new Date(''));

    const handleChange = (newValue) => {
      setValue(newValue);
    };

    const [category, setCategory] = React.useState('');

  const categoryHandleChange = (event) => {
    setCategory(event.target.value);
  };


  return (
    <div className="addEvent">
      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-name" label="Event Name" />
        </Box>
      </div>
      <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack spacing={3}>
      <DateTimePicker
          label="Date/Time"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
      </LocalizationProvider>
      </div>
      <div>
          <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '40ch' },
          }}
          noValidate
          autoComplete="off"
          >
            <div>
            <TextField
          id="filled-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue=""
          variant="filled"
        />
            </div>
          </Box>
      </div>
      <div>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={categoryHandleChange}
        >
          <MenuItem value="Party">Party</MenuItem>
          <MenuItem value="Crafts">Crafts</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </div>
      <div>
      <Stack direction="row" spacing={2}>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack>
      </div>
    </div>
    
  );
};

export default AddEvent;

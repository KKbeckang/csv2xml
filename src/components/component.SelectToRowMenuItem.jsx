import React, { useState } from 'react';
import PropTypes from "prop-types";
import { useGridApiContext } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { InputAdornment, IconButton, TextField,} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";

function SelectToRowMenuItem(props) {
    // Create my own SelectToRowMenuItem so I could add it to the CustomToolbar
    // Use apiRef to select the row in the grid (https://mui.com/x/data-grid/api/)
  const apiRef = useGridApiContext();
  
  const { hideMenu } = props;
  const [rowId, setRowId] = useState("");

  const handleChange = (event) => {
    setRowId(event.target.value);
  };

  const handleClick = () => {
    const rowIndex = parseInt(rowId, 10);
    apiRef.current.selectRow(rowIndex, true, true);
    hideMenu?.();
  };

  return (
    <MenuItem onClick={handleClick}>
      <TextField
        label="Select the Row"
        type="number"
        value={rowId}
        size="small"
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </MenuItem>
  );
}

SelectToRowMenuItem.propTypes = {
  hideMenu: PropTypes.func,
};

export default SelectToRowMenuItem;

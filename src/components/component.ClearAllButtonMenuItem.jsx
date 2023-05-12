import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";

function ClearAllButtonMenuItem(props) {
    // Create my own SelectToRowMenuItem so I could add it to the CustomToolbar
    // and use it to Select to a specific row in the grid Here are usage of API to select the row in the grid (https://mui.com/x/data-grid/api/)
  const apiRef = useGridApiContext();
  const { hideMenu } = props;

  const handleClick = () => {
    // clear all filters
    apiRef.current.setFilterModel({ items: [] });
    // clear all sorts
    apiRef.current.setSortModel([]);
    hideMenu?.();
  };

  return (
    <MenuItem onClick={handleClick}>
      <Box
        component="span"
        sx={{
          cursor: "pointer",
          position: "relative",
          color: "#1976d2", // Change the text color
          fontSize: "", // Change the text size
        }}
      >
        CLEAR FILTER
      </Box>
    </MenuItem>
  );
}

ClearAllButtonMenuItem.propTypes = {
  hideMenu: PropTypes.func,
};

export default ClearAllButtonMenuItem;

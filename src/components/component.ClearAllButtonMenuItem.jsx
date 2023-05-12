import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";

function ClearAllButtonMenuItem(props) {
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
        ClEAR FILTER
      </Box>
    </MenuItem>
  );
}

ClearAllButtonMenuItem.propTypes = {
  hideMenu: PropTypes.func,
};

export default ClearAllButtonMenuItem;

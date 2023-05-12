import React from 'react';
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { useGridApiContext } from "@mui/x-data-grid";

function ClearAllButton(props) {
    const apiRef = useGridApiContext();
    const { hideMenu } = props;
  
    const handleClick = () => {
      // clear all filters
      apiRef.current.setFilterModel({ items: [] });
      // clear all sorts
      apiRef.current.setSortModel([]);
      hideMenu?.();
    };
  
    return <MenuItem onClick={handleClick}>Clear Filters and Sorting</MenuItem>;
  }
  
  ClearAllButton.propTypes = {
    hideMenu: PropTypes.func,
  };


  export default ClearAllButton ;
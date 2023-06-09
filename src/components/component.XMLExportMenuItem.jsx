import React from 'react';
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { 
  useGridApiContext, 
  gridFilterModelSelector, 
  gridSortModelSelector, 
  gridFilteredSortedRowIdsSelector, 
  gridVisibleColumnFieldsSelector 
} from "@mui/x-data-grid";


const convertXMLFromCsv = (data) => {
    // XML Conversion from CSV data using the following format
    // However this is a simple example, you can change it to your own format as needed
    // I included a alert checking to remove all the filters and sorting before exporting to XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += "<TestMetaData>";

    data.forEach((row) => {
      xml += "<Step>";
      xml += `<StepNum>${row.StepNum}</StepNum>`;
      xml += `<Condition>${row.Condition}</Condition>`;
      xml += `<Duration>${row.Duration}</Duration>`;
      xml += "</Step>";
    });

    xml += "</TestMetaData>";
    return xml;
  };

const getXML = (apiRef) => {
    // Get the data from the grid and convert it to XML
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    const rowData = filteredSortedRowIds.map((id) => {
      const row = {};
      visibleColumnsField.forEach((field) => {
        row[field] = apiRef.current.getCellParams(id, field).value;
      });
      return row;
    });

    return convertXMLFromCsv(rowData);
  };


  const exportBlob = (blob, filename) => {
    // Save the blob in a file
    // ths function is used in the XMLExportMenuItem
    // https://mui.com/x/react-data-grid/export/#csvexportoptions-api
    const url = URL.createObjectURL(blob);
    // The "a" inside document.createElement("a") is a string that tells the createElement method 
    // which type of HTML element to create. In this case, it's creating an anchor element, 
    // which is represented by the <a> tag in HTML.
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.click();

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      // because otherwise the link will not work
      URL.revokeObjectURL(url);
    });
  };

  function XMLExportMenuItem(props) {
    // Create my own XMLExportMenuItem so I could add it to the CustomExportButton
    const apiRef = useGridApiContext();
    const { hideMenu } = props;
    // Get the filter and sort model from the grid
    const filterModel = gridFilterModelSelector(apiRef);
    const sortModel = gridSortModelSelector(apiRef);

    const handleClick = () => {
      if (filterModel.items.length > 0 || sortModel.length > 0) {
        alert("Please remove all filters and sorting before exporting to XML.");
        return;
      }

      const xmlString = getXML(apiRef);
      const blob = new Blob([xmlString], { type: "application/xml" });
      exportBlob(blob, "DataGrid_demo.xml");
      hideMenu?.();
    };

    return <MenuItem onClick={handleClick}>Download as XML</MenuItem>;
  }

  XMLExportMenuItem.propTypes = {
    // assign the type of the props
    hideMenu: PropTypes.func,
  };

  
  export default XMLExportMenuItem;
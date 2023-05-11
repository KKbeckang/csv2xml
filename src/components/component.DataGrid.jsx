import {
  DataGrid,
  useGridApiRef,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridPrintExportMenuItem,

} from "@mui/x-data-grid";
import { useGridApiContext } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Papa from "papaparse";
import "./component.DataGrid.css";

const DataGridComponent = () => {
  // following code is for the hooks
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const apiRef = useGridApiRef();
  // useGridApiRef is a hook that returns the apiRef object.

  const convertCSVToXML = (data) => {
    // XML Conversion
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += "<TestMetaData>";

    data.forEach((row) => {
      xml += "<Step>";
      xml += `<StepNum>${row.ID}</StepNum>`;
      xml += `<Condition>${row.Condition}</Condition>`;
      xml += `<Duration>${row.Duration}</Duration>`;
      xml += "</Step>";
    });

    xml += "</TestMetaData>";
    return xml;
  };

  const parseCSV = (text) => {
    // CSV Parsing
    const results = Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    const parsedData = results.data.map((row, index) => {
      row.id = row["ID"];
      return row;
    });

    const headers = results.meta.fields;

    setData(parsedData);
    setColumns(
      headers.map((key) => ({
        field: key,
        headerName: key,
        resizable: true,
        sortable: true,
        editable: key !== "ID",
        // Add the following lines:
        cellClassName: (params) => (key === "ID" ? "id-cell" : ""),
      }))
    );
    const xmlData = convertCSVToXML(parsedData);
    console.log(xmlData);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      parseCSV(text);
    };

    reader.readAsText(file);
  };

  const getXML = (apiRef) => {
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
  
    const rowData = filteredSortedRowIds.map((id) => {
      const row = {};
      visibleColumnsField.forEach((field) => {
        row[field] = apiRef.current.getCellParams(id, field).value;
      });
      return row;
    });
  
    return convertCSVToXML(rowData);
  };

  const exportBlob = (blob, filename) => {
    // Save the blob in a file
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  
    setTimeout(() => {
      URL.revokeObjectURL(url);
    });
  };

  function XMLExportMenuItem(props) {
    const apiRef = useGridApiContext();
    const { hideMenu } = props;
  
    return (
      <MenuItem
        onClick={() => {
          const xmlString = getXML(apiRef);
          const blob = new Blob([xmlString], { type: 'application/xml' });
          exportBlob(blob, 'DataGrid_demo.xml');
          hideMenu?.();
        }}
      >
        Download as XML
      </MenuItem>
    );
  }

  XMLExportMenuItem.propTypes = {
    hideMenu: PropTypes.func,
  };
  

  const csvOptions = { delimiter: ';' };
  const printOptions = { orientation: 'landscape' };
  function CustomExportButton(props) {
    // eslint-disable-next-line react/prop-types
    return (
      <GridToolbarExportContainer {...props}>
        <GridCsvExportMenuItem options={csvOptions} />
        <GridPrintExportMenuItem options={printOptions} />
        
        <XMLExportMenuItem /> 
      </GridToolbarExportContainer>
    );
  }

  function CustomToolbar(props) {
    return (
      <GridToolbarContainer {...props}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <CustomExportButton/>
      </GridToolbarContainer>
    );
  }


  return (
    <div style={{ height: "100%", width: "100%" }}>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {columns.length > 0 && data.length > 0 && (
        <DataGrid
          rows={data}
          rowHeight={28}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            toolbar: { apiRef },
          }}
        />
      )}
    </div>
  );
};

export default DataGridComponent;

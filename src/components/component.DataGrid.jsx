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
  useGridApiContext,
} from "@mui/x-data-grid";
import TextField from '@mui/material/TextField';
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Papa from "papaparse";
import "./component.DataGrid.css";
import LinearProgress from "@mui/material/LinearProgress";
import { InputAdornment, IconButton,Box } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const DataGridComponent = () => {
  // following code is for the hooks
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const apiRef = useGridApiRef();
  const [isLoading, setIsLoading] = useState(false);
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
    if (file) {
      setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      parseCSV(text);
      setIsLoading(false); // Finish loading bar
    };

    reader.readAsText(file);
  }
  };

  function UploadMenuItem() {
    // Create my own UploadMenuItem so I could add it to the CustomToolbar
    const handleChange = (event) => {
      handleFileUpload(event);
    };
  
    return (
      <MenuItem component="label" htmlFor="file-upload">
      <Box
        component="span"
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          color: '#1976d2', // Change the text color
          fontSize: '0.8125rem', // Change the text size
          
        }}
      >
        UPLOAD CSV
        <input
          type="file"
          accept=".csv"
          id="file-upload"
          onChange={handleChange}
          style={{ display: "none" }}
        />
        </Box>
      </MenuItem>
    );
  }

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

    return convertCSVToXML(rowData);
  };

  const exportBlob = (blob, filename) => {
    // Save the blob in a file

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    });
  };

  function XMLExportMenuItem(props) {
    // Create my own XMLExportMenuItem so I could add it to the CustomExportButton
    const apiRef = useGridApiContext();
    const { hideMenu } = props;

    return (
      <MenuItem
        onClick={() => {
          const xmlString = getXML(apiRef);
          const blob = new Blob([xmlString], { type: "application/xml" });
          exportBlob(blob, "DataGrid_demo.xml");
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


  function GoToRowMenuItem(props) {
    const apiRef = useGridApiContext();
    const { hideMenu } = props;
    const [rowId, setRowId] = useState('');
  
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
  
  GoToRowMenuItem.propTypes = {
    hideMenu: PropTypes.func,
  };
  

  // These options are used to configure the behavior of the CSV and print exports from the DataGrid.
  // https://mui.com/x/react-data-grid/export/#csvexportoptions-api
  const csvOptions = { allColumns: true,allRows: true };
  const printOptions = { orientation: "landscape" };

  function CustomExportButton(props) {
    // Create my own CustomeExportButton with CSV, Print and XML
    return (
      <GridToolbarExportContainer {...props}>
        <GridCsvExportMenuItem options={csvOptions} />
        <GridPrintExportMenuItem options={printOptions} />
        <XMLExportMenuItem />
        
      </GridToolbarExportContainer>
    );
  }

  function CustomToolbar(props) {
    // Create my own CustomToolbar with CSV, Filter, Density and CustomExportButton
    return (
      <GridToolbarContainer {...props}>
      <UploadMenuItem />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <CustomExportButton />
        <GoToRowMenuItem />
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={data}
          rowHeight={28}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
            loadingOverlay: LinearProgress
          }}
          componentsProps={{
            toolbar: { apiRef },
          }}
          loading={isLoading}
        />
    </div>
  );
};

export default DataGridComponent;

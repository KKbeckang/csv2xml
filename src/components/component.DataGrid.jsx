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
  gridFilterModelSelector,
  gridSortModelSelector,
} from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Papa from "papaparse";
import "./component.DataGrid.css";
import LinearProgress from "@mui/material/LinearProgress";
import { InputAdornment, IconButton, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import ClearAllButtonMenuItem from "./component.ClearAllButtonMenuItem";
import XMLExportMenuItem from "./component.XMLExportMenuItem";
const DataGridComponent = () => {
  // following code is for the hooks
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const apiRef = useGridApiRef();
  const [isLoading, setIsLoading] = useState(false);
  // useGridApiRef is a hook that returns the apiRef object.


  const parseCSV = (text) => {
    // CSV Parsing using PapaParse library (https://www.papaparse.com/)
    const results = Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    const parsedData = results.data.map((row, index) => {
      row.id = row["StepNum"];
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
        editable: key !== "StepNum",
        // Add the following lines:
        cellClassName: (params) => (key === "StepNum" ? "id-cell" : ""),
      }))
    );
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
      // Handle the file upload event
      handleFileUpload(event);
    };

    return (
      <MenuItem component="label" htmlFor="file-upload">
        <Box
          component="span"
          sx={{
            cursor: "pointer",
            color: "#1976d2", // Change the text color
            fontSize: "0.8125rem", // Change the text size
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




  function SelectToRowMenuItem(props) {
    // Create my own SelectToRowMenuItem so I could add it to the CustomToolbar
    // and use it to Select to a specific row in the grid
    // use API to select the row in the grid (https://mui.com/x/data-grid/api/)
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

  

  // These options are used to configure the behavior of the CSV and print exports from the DataGrid.
  // https://mui.com/x/react-data-grid/export/#csvexportoptions-api
  const csvOptions = { allColumns: true, allRows: true };
  const printOptions = { orientation: "landscape" };

  function CustomExportButton(props) {
    // Create my own CustomeExportButton with CSV, Print and XML
    // https://mui.com/x/react-data-grid/export/#export-menu
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
    // https://mui.com/x/react-data-grid/components/
    return (
      <GridToolbarContainer {...props}>
        <UploadMenuItem />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <CustomExportButton />
        <ClearAllButtonMenuItem />
        <SelectToRowMenuItem />
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={data}
        rowHeight={30}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          loadingOverlay: LinearProgress,
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

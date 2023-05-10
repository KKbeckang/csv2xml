import {
  DataGrid,
  GridCellParams,
  GridToolbar,
  GridToolbarProps,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridPrintExportMenuItem,
} from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { useState } from "react";
import Papa from "papaparse";
import "./component.DataGrid.css";

const DataGridComponent = () => {
   // following code is for the hooks
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

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

  const CustomToolbar = (props) => {
    const { data } = props;

    const exportToXML = () => {
      const xmlData = convertCSVToXML(data);
      const blob = new Blob([xmlData], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.xml";
      link.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div>
      <GridToolbar {...props}>
      <GridToolbarContainer>
      <GridToolbarExport />
        </GridToolbarContainer>
        </GridToolbar>
        <Button variant="contained" color="primary" onClick={exportToXML}>
          Export to XML
        </Button>
      </div>
    );
  };

  const GridToolbarExport = ({ csvOptions, printOptions,exportToXML, ...other }) => (
    <GridToolbarExportContainer {...other}>
      <GridCsvExportMenuItem options={csvOptions} />
      <GridPrintExportMenuItem options={printOptions} />
      <GridPrintExportMenuItem options={exportToXML} />
    </GridToolbarExportContainer>
  );

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
            toolbar: { data },
          }}
        />
      )}
    </div>
  );
};

export default DataGridComponent;

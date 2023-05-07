import { DataGrid,GridCellParams, GridToolbar  } from '@mui/x-data-grid';
import { useState } from 'react';
import Papa from 'papaparse';

const DataGridComponent = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
  
    const parseCSV = (text) => {
        const results = Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
      
        const parsedData = results.data.map((row, index) => {
          row.id = row['ID'];
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
            editable: key !== 'ID',
          }))
        );
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

    


  return (
    
    <div style={{ height: '100%', width: '100%' }}>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {columns.length > 0 && data.length > 0 && (
        <DataGrid
          rows={data}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      )}
    </div>
    );
}

export default DataGridComponent;
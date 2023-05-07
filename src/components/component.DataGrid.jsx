import { DataGrid,GridCellParams, GridToolbar  } from '@mui/x-data-grid';
import { useState } from 'react';


const DataGridComponent = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
  
    const parseCSV = (text) => {
        const lines = text.trim().split('\n');
        const delimiter = /\t/; // Change the delimiter here
        const headers = lines[0].split(delimiter);
      
        const parsedData = lines.slice(1).map((line) => {
          const values = line.split(delimiter).map((value) => value.trim());
          const rowData = headers.reduce((obj, header, index) => {
            obj[header] = values[index] !== '' && values[index] !== 'N/A' ? values[index] : null;
            return obj;
          }, {});
      
          rowData.id = rowData['ID'];
          return rowData;
        });
    
      setData(parsedData);
      setColumns(
        headers.map((key) => ({
          field: key,
          headerName: key,
          resizable: true,
          sortable: true,
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
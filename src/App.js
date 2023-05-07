import * as React from 'react';
import { DataGrid,GridCellParams, GridToolbar  } from '@mui/x-data-grid';

const rows  = [
  { id: 1, Condition: 'Rest', Duration: '60' },
  { id: 2, Condition: 'Discharge', Duration: 'N/A' },
  { id: 3, Condition: 'Rest', Duration: '30' },
  { id: 4, Condition: 'Charge', Duration: '0.1' },
  { id: 5, Condition: 'Rest', Duration: '5' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 150},
  { field: 'Condition', headerName: 'Condition', width: 150,editable: true},
  { field: 'Duration', headerName: 'Duration', width: 150,editable: true },
];

 function App() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} slots={{
    toolbar: GridToolbar,
  }}
/>
    </div>
  );
}


export default App;

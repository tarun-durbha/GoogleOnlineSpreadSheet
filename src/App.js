import React,{useState,useCallback,useMemo,useEffect} from "react";
import './App.css';
import { DataGrid,GridToolbar, GridRowsProp,GridColDef,GridActionsCellItem, GridRowId,GridColumns} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

const initialRows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];


function App() {

  const [rows, setRows] = useState(initialRows);

  const deleteUser = useCallback(
    (id) => () => {
      setLoading(true);
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        setLoading(false);
      },200);
    },
    [],
  );

  const addRow = ()=>{

  }

  const addColumn = ()=>{
    
  }

  const duplicateUser = useCallback(
    (id) => () => {
      setRows((prevRows) => {
        var max = -1;
        prevRows.map((row) => {
          if(row.id>max){
            max = row.id
          }
        });
        const rowToDuplicate = prevRows.find((row) => row.id === id);
        return [...prevRows, { ...rowToDuplicate , id:(max+1)}];
      });
    },
    [],
  );
  
  const columns = useMemo(
    ()=>[
        { field: 'col1', headerName: 'Column 1', width: 150,editable: true},
        { field: 'col2', headerName: 'Column 2', width: 150,editable: true},
        {
          field: 'actions',
          type: 'actions',
          getActions: (params) => [
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
          <GridActionsCellItem
            icon={<FileCopyIcon />}
            label="Duplicate User"
            onClick={duplicateUser(params.id)}
            showInMenu
          />,          ]
        }
    ],[deleteUser,duplicateUser]
  );

  const [pageSize, setPageSize] = useState(5);

  const [checkboxSelection, setCheckboxSelection] = React.useState(true);

  const [loading,setLoading] = useState(false);

  return (
    <div className="App" style={{ display: 'flex', height: 300, width: '80%' }}>
      <div style={{flexGrow: 1}}>
        <Button
          sx={{ mb: 2 }}
          onClick={() => setCheckboxSelection(!checkboxSelection)}
        >
          Toggle checkbox selection
        </Button>
        <Button
          sx={{ mb: 2 }}
          onClick={() => addRow()}
        >
          Add Row
        </Button>
        <Button
          sx={{ mb: 2 }}
          onClick={() => addColumn()}
        >
          Add Column
        </Button>
        <DataGrid 
        sx={{ m: 2 }}
        loading = {loading}
        checkboxSelection={checkboxSelection}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => 
        {
          setLoading(true);
          setTimeout(() =>{
            setPageSize(newPageSize);
            setLoading(false);
          },200)
        }
        }
        pagination
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
        autoHeight 
        rows={rows} 
        columns={columns}
        components={{
          Toolbar: GridToolbar,
          LoadingOverlay: LinearProgress,
        }} 
        initialState={{ pinnedColumns: {right: ['actions'] } }}
          
  />
      </div>
    </div>
  );
}

export default App;

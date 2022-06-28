import React,{useState,useCallback,useMemo,useEffect, cloneElement} from "react";
import './App.css';
import { DataGrid,GridToolbar, GridRowsProp,GridColDef,GridActionsCellItem, GridRowId,GridColumns} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Input from "./Input.js";

const initialRows = [
  { id: 1, col1: 'Hello', col2: 'World' },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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


  const duplicateUser = useCallback(
    (id) => () => {
      setLoading(true);
      setTimeout(()=>{
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
        setLoading(false);
      },200);
    },
    [],
  );
  
  const [columns,setColumns] = useState([
        {field: 'col1', headerName: 'Index', width: 150,editable: true},
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
    ]
  );

  const [pageSize, setPageSize] = useState(5);

  const [checkboxSelection, setCheckboxSelection] = React.useState(true);

  const [loading,setLoading] = useState(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const addRow = ()=>{
    setLoading(true);
      setTimeout(()=>{
        setRows((prevRows) => {
          var max = -1;
          prevRows.map((row) => {
            if(row.id>max){
              max = row.id
            }
          });
          return [...prevRows, { id:(max+1)}];
        });
        setLoading(false);
      },200);
  }

  const handleSubmit2 = (event)=>{
    event.preventDefault();
    setLoading(true);
    setTimeout(()=>{
      setColumns((prevColumns) => {
        var toMade = 0
        prevColumns.map((column,index) => {
          if(column.type !== "actions"){
            toMade++;
          }
        });
        toMade++;
        prevColumns.splice(prevColumns.length-1,0,{
          width:150,
          editable:true,
          headerName: event.target.NewColumn.value,
          field: "col" + toMade
        });
        return([...prevColumns])
      });
      setLoading(false);
    },200);
  };  


  return (
    <div className="App" style={{ display: 'flex', width: '80%' }}>
      <div className="main" style={{flexGrow: 1}}>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit2}>
              <Input 
              id = "newColumn"
              placeholder="Enter Column Name"
              name = "NewColumn"
              />
              <Button 
              sx={{ mb: 2 }}
              type="submit">Submit</Button>
            </form>
          </Box>
        </Modal>
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
          onClick={() => handleOpen2()}
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

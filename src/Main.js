import React,{useState,useCallback} from 'react'
import "./Main.css"
import { DataGrid,GridToolbar,GridActionsCellItem} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Input from "./Input.js";

const initialRows = [
    { id: 1, col1: 1, col2:"The India Story" ,col3: "Bimal Jalal", col4:"Edition1" , col5: "1000" },
    { id: 2, col1: 2, col2:"Queen of Fire" ,col3: "Devika Rangachari", col4:"Edition2" , col5: "4000" },
    { id: 3, col1: 3, col2:"Hear Yourself" ,col3: "Indian Author Prem Rawat", col4:"Edition1" , col5: "5400" },
    { id: 4, col1: 4, col2:"The Queen of Indian Pop" ,col3: "Usha Uthup", col4:"Edition4" , col5: "6200" },
    { id: 5, col1: 5, col2:"A Tale of Two Cities" ,col3: "Charles Darwin", col4:"Edition6" , col5: "8000" },
    { id: 6, col1: 6, col2:"David Copperfield" ,col3: "Charles Darwin", col4:"Edition2" , col5: "3400" },
    { id: 7, col1: 7, col2:"Adventures of Tom Sawyer" ,col3: "Mark Twain", col4:"Edition3" , col5: "2500" },
    { id: 8, col1: 8, col2:"Alice in Wonderland" ,col3: "Lewis Carrol", col4:"Edition2" , col5: "1900" },
    { id: 9, col1: 9, col2:"Arthshastra" ,col3: "Kautilya", col4:"Edition5" , col5: "1800" },
    { id: 10, col1: 10, col2:"Blind Beauty" ,col3: "Boris Pasternak", col4:"Edition2" , col5: "2500" },
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
  

function Main() {
    
    const [rows, setRows] = useState(initialRows);

    const deleteUser = (id) => {
        setLoading(true);
        setTimeout(() => {
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          setLoading(false);
        },200);
      };
  
  
    const duplicateUser = useCallback(
      (id) => () => {
        setLoading(true);
        setTimeout(()=>{
          setRows((prevRows) => {
            var max = -1;
            prevRows.forEach((row) => {
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
          {field: "col2" , headerName:"Book Name", width: 150,editable: true},
          {field: "col3" , headerName:"Author", width: 150,editable: true},
          {field: "col4" , headerName:"Edition", width: 150,editable: true},
          {field: "col5" , headerName:"Price", width: 150,editable: true},
          {
            field: 'actions',
            type: 'actions',
            getActions: (params) => [
              <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={()=>{deleteUser(params.id)}}
            />,
            <GridActionsCellItem
              icon={<FileCopyIcon />}
              label="Duplicate Row"
              onClick={duplicateUser(params.id)}
              showInMenu
            />,          
          ]
          }
      ]
    );
  
    const [pageSize, setPageSize] = useState(5);
  
    const [checkboxSelection, setCheckboxSelection] = React.useState(true);
  
    const [loading,setLoading] = useState(false);
  
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
  

    const handleSubmit = (event)=>{
      event.preventDefault();
      setLoading(true);
      setTimeout(()=>{
        setRows((prevRows) => {
          var max = -1;
          prevRows.forEach((row) => {
            if(row.id>max){
              max = row.id
            }
          });
          const add = {
              id: (max+1)
          }
          columns.forEach((col)=>{
            if(col.field !== "actions"){
              add[col.field] = event.target[col.field].value;
            }
          });
          return [...prevRows, add];
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
          prevColumns.forEach((column) => {
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
    <div className="main" style={{flexGrow: 1}}>
     <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          {columns.map((col)=>{
            if(col.field !== "actions"){
              return (<Input 
                key  = {col.field}
                id = {col.field}
                placeholder= {col.headerName}
                name = {col.field}
              />)
            }
            else{
              return "";
            }
          })}
          <Button 
          sx={{ mb: 2 }}
          type="submit">Submit</Button>
        </form>
      </Box>
    </Modal>
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
    <div>
    <Button
      sx={{ mb: 2 }}
      onClick={() => setCheckboxSelection(!checkboxSelection)}
    >
      Toggle checkbox selection
    </Button>
    <Button
      sx={{ mb: 2 }}
      onClick={() => handleOpen()}
    >
      Add Row
    </Button>
    <Button
      sx={{ mb: 2 }}
      onClick={() => handleOpen2()}
    >
      Add Column
    </Button>
    </div>
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
  )
}

export default Main
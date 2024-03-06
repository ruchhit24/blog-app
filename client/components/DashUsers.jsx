import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux"; 
import { Box, Modal, Typography } from "@mui/material";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: 600,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DashUsers() {
  
    const [users, setUsers] = React.useState([]);
  const [showMore, setShowMore] = React.useState(true);
  const [userIdToDelete, setUserIdToDelete] = React.useState("");
  const[open,setOpen] = React.useState(false)

  const { currentUser } = useSelector((state) => state.user);

  const { theme } = useSelector((state) => state.theme);
   
  
  React.useEffect(() => {
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/user/getUsers');
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        if (data.users.length < 6) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getUsers?startIndex=${startIndex}`
      );
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 6) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose= ()=>{
    setOpen(false)
  }

  const handleDeleteUser = async()=>{
    setOpen(false)
    try {
        const res = await fetch(`/api/user/deleteUser/${userIdToDelete}`,{
            method : 'DELETE'
        })
        const data = await res.json()
        if(res.ok)
        {
            setUsers((prev)=>{
                prev.filter((user) => user._id !== userIdToDelete)
            })
        }
    } catch (error) {
        console.log(error)
    }
  }

 
  return (
    <div className="w-full min-h-screen overflow-y-scroll">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Date Created</StyledTableCell>
                  <StyledTableCell align="center"> User Image</StyledTableCell>
                  <StyledTableCell align="center">Username</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Admin</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <StyledTableRow key={user._id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className="text-xl"
                    >
                      {new Date(user.createdAt).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                       
                        <img
                          src={user.profilePicture}
                      alt={user.username}
                          className="w-full h-28 object-cover rounded-lg"
                        /> 
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    {user.username}        
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {user.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                       
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    <span
                        onClick={() => {
                          setOpen(true);
                          setUserIdToDelete(user._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex flex-col justify-center items-center"
          >
            <Box className="bg-white p-8 rounded-xl">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="capitalize"
                sx={{ fontWeight: "bold" }}
              >
                Are you sure you want to Delete this User ?
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="flex justify-between"
              >
                <button
                  className="p-2 m-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl cursor-pointer hover:scale-105 duration-700 "
                  onClick={handleDeleteUser}
                >
                  Are you Sure
                </button>
                <button
                  className="p-2 m-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl cursor-pointer hover:scale-105 duration-700 "
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </Typography>
            </Box>
          </Modal>
          {showMore && (
            <div className="p-3 flex justify-center items-center">
              <button
                onClick={handleShowMore}
                className="mt-4 px-4 py-2 border-b-[1px] text-lg font-semibold hover:scale-105 duration-500 bg-cyan-600 rounded-lg"
              >
                Show More
              </button>
            </div>
          )}
        </>
      ) : (
        <div>you have 0 Users</div>
      )}
    </div>
  );
}

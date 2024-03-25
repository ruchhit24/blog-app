
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
 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: 550,
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

const DashComment = () => {
    const [comments, setComments] = React.useState([]);
    const [showMore, setShowMore] = React.useState(true);
    const [commentIdToDelete, setCommentIdToDelete] = React.useState("");
    const [open, setOpen] = React.useState(false);
  
    const { currentUser } = useSelector((state) => state.user);
  
    const { theme } = useSelector((state) => state.theme);
  
    React.useEffect(() => {
      if (currentUser.isAdmin) {
        fetchComments();
      }
    }, [currentUser._id]);
  
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getComments");
        const data = await res.json();
        // console.log(data)
        if (res.ok) {
            setComments(data.comments);
            if (data.comments.length < 9) {
              setShowMore(false);
            }
          }

      } catch (error) {
        console.log(error.message);
      }
    };
  
    const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDeleteComment = async () => {
        setOpen(false);
        try {
          const res = await fetch(
            `/api/comment/deleteComment/${commentIdToDelete}`,
            {
              method: 'DELETE',
            }
          );
          const data = await res.json();
          if (res.ok) {
            setComments((prev) =>
              prev.filter((comment) => comment._id !== commentIdToDelete)
            );
            setOpen(false);
          } else {
            console.log(data.message);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
  
    return (
      <div className="w-full min-h-screen overflow-y-scroll">
        {currentUser.isAdmin && comments.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Date Updated</StyledTableCell>
                    <StyledTableCell align="center">Comment Content</StyledTableCell>
                    <StyledTableCell align="center">No. Of Likes on the Comment</StyledTableCell>
                    <StyledTableCell align="center">PostId</StyledTableCell>
                    <StyledTableCell align="center">UserId</StyledTableCell>
                    <StyledTableCell align="center">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comments.map((comment) => (
                    <StyledTableRow key={comment._id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className="text-xl"
                      >
                        {new Date(comment.updatedAt).toLocaleDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {comment.content}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {comment.numberOfLikes}
                      </StyledTableCell>
  
                      <StyledTableCell align="center">
                      {comment.postId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {comment.postId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <span
                          onClick={() => {
                            setOpen(true);
                            setCommentIdToDelete(comment._id);
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
                  Are you sure you want to Delete this Comment ?
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="flex justify-between"
                >
                  <button
                    className="p-2 m-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl cursor-pointer hover:scale-105 duration-700 "
                    onClick={handleDeleteComment}
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
          <div>you have 0 Comments</div>
        )}
      </div>
    );
  }
  
export default DashComment
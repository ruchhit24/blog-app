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
import { Link } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";

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

export default function DashPost() {
  const [userPosts, setUserPosts] = React.useState([]);
  const [showMore, setShowMore] = React.useState(true);
  const [postIdToDelete, setPostIdToDelete] = React.useState("");
  const[open,setOpen] = React.useState(false)

  const { currentUser } = useSelector((state) => state.user);

  const { theme } = useSelector((state) => state.theme);
  console.log(userPosts);
  React.useEffect(() => {
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/post/getpost?userId=${currentUser._id}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts(data.posts);
        if (data.posts.length < 6) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getPost?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();

      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 6) {
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

  const handleDeletePost = async()=>{
    setOpen(false)
    try {
        const res = await fetch(`/api/post/deletePost/${postIdToDelete}/${currentUser._id}`,{
            method : 'DELETE'
        })
        const data = await res.json()
        if(res.ok)
        {
            setUserPosts((prev)=>{
                prev.filter((post) => post._id !== postIdToDelete)
            })
        }
    } catch (error) {
        console.log(error)
    }

  }
  return (
    <div className="w-full min-h-screen overflow-y-scroll">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Date Updated</StyledTableCell>
                  <StyledTableCell align="center"> Post Image</StyledTableCell>
                  <StyledTableCell align="center"> Post Title</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                  <StyledTableCell align="center">Edit</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userPosts.map((post) => (
                  <StyledTableRow key={post._id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className="text-xl"
                    >
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      <Link
                        className={`font-semibold ${
                          theme === "light" ? "text-white " : "text-black"
                        }`}
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {post.category}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      <span
                        onClick={() => {
                          setOpen(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-post/${post._id}`}
                      >
                        <span>Edit</span>
                      </Link>
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
                Are you sure you want to Delete this Post ?
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="flex justify-between"
              >
                <button
                  className="p-2 m-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl cursor-pointer hover:scale-105 duration-700 "
                  onClick={handleDeletePost}
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
        <div>you have 0 posts</div>
      )}
    </div>
  );
}

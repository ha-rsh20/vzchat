import axios from "axios";
import React, { useEffect, useState } from "react";
import { updateUserId } from "../state/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { TextField, ThemeProvider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../mui_style";
import Pagination from "./Pagination";
import MenuItem from "@mui/material/MenuItem";
import "../App.css";

function History() {
  let [hst, setHst] = useState([]);
  let [hstids, setHstIds] = useState([]);
  let [ids, setIds] = useState([]);
  const [meetBy, setMeetBy] = useState([]);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  let [count, setCount] = useState(0);
  let userSId = useSelector((state) => state.users.id);
  const dispatch = useDispatch();
  let time = new Date();

  const [postPerPage, setPostPerPage] = useState("5");
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  let [currentPosts, setCurrentPosts] = useState([]);

  if (history.length === 0) {
    for (let i = 0; i < hst.length; i++) {
      hstids.push(hst[i].userid);
      ids.push(hstids[i].split(","));
    }
    for (let i = 0; i < ids.length; i++) {
      let len = ids[i].length;
      for (let j = 0; j < len; j++) {
        if (ids[i][j] === userSId) {
          if (j === 0) {
            meetBy.push(1);
          } else {
            meetBy.push(0);
          }
          history.push(hst[i]);
        }
      }
    }
  }
  currentPosts = history
    .filter((hist) => hist.meetname.toLowerCase().includes(search))
    .slice(indexOfFirstPost, indexOfLastPost);

  const postPerPageA = [
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 15,
      label: "15",
    },
  ];

  const handlePostPerPage = (e) => {
    setPostPerPage(e.target.value);
  };

  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleCount = () => {
    count = count + 1;
  };

  useEffect(() => {
    if (localStorage.getItem("id")) {
      userSId = localStorage.getItem("id");
      dispatch(updateUserId(localStorage.getItem("id")));
    }
    axios
      .get("https://vzchat-back-service.onrender.com/app/getAllMeetData")
      .then((res) => {
        setHst(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load history data!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <TextField
          id="filled-basic"
          label="Search"
          variant="filled"
          value={search}
          style={{ marginTop: 20 }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div style={{ padding: 20 }}>
          <div className="container" style={{ marginBottom: 20 }}>
            <div className="row">
              <div className="col-3">Meeting Name</div>
              <div className="col-2"></div>
              <div className="col-3">Meeting Time</div>
            </div>
          </div>
          {history.length !== 0 ? (
            <div>
              {currentPosts.map((item) => (
                <div key={item.id} className="container">
                  {console.log(item)}
                  <div className="row history">
                    <span style={{ marginTop: -17 }}>
                      <hr />
                    </span>
                    <span className="col-3" style={{ paddingTop: 15 }}>
                      {item.meetname}
                    </span>
                    <span className="col-2" style={{ paddingTop: 15 }}>
                      {meetBy[count] === 1
                        ? "This meeting was created by You"
                        : "Someone created this meeting"}
                      {handleCount()}
                    </span>
                    <span className="col-3" style={{ paddingTop: 15 }}>
                      {item.meettime}
                    </span>
                  </div>
                </div>
              ))}
              <div
                style={{
                  margin: 10,
                  marginBottom: 70,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  id="filled-select-currency"
                  select
                  label="Select"
                  defaultValue={postPerPage}
                  variant="filled"
                  onChange={handlePostPerPage}
                >
                  {postPerPageA.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Pagination
                  postPerPage={postPerPage}
                  totalPosts={history.length}
                  paginate={paginate}
                  currentPage={page}
                />
              </div>
            </div>
          ) : (
            <div className="history">
              <span style={{ marginTop: -17 }}>
                <hr />
              </span>
              <span>You have not involved in any meeting till now!</span>
            </div>
          )}
        </div>

        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default History;

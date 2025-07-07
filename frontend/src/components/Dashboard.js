import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";

import "./Dashboard.css";

function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState("all");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const REACT_APP_API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_BASE_URL}/api/articles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to fetch articles", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_BASE_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchArticles();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const loggedInUsername = localStorage.getItem("username");

  // 🔍 Filter articles by user and search query
  const filteredArticles = articles.filter((a) => {
    const matchesUser =
      selectedUser === "all" || a.createdBy._id === selectedUser;

    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.text.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesUser && matchesSearch;
  });
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${REACT_APP_API_BASE_URL}/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>
          Welcome, <span style={{ color: "#00b894" }}>{loggedInUsername}</span>
        </h2>
        <div className="dashboard-user-actions">
          <button
            onClick={() => navigate("/upload-article")}
            className="next-button"
          >
            + Upload New Article
          </button>
          <button
            onClick={handleLogout}
            className="logout-button"
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>

      {/*Filter Controls */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-box"
        />

        <select
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.target.value);
          }}
          className="user-dropdown"
        >
          <option value="all">All Authors</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      {/*Articles */}
      {filteredArticles.length === 0 ? (
        <div className="no-articles">
          <div className="no-icon">📭</div>
          <h3>No articles found</h3>
          <p>Try submitting or adjusting your filters.</p>
        </div>
      ) : (
        <>
          <section>
            {filteredArticles.slice(0, visibleCount).map((a, i) => (
              <div
                className={`card ${["green", "blue", "orange", "red"][i % 4]}`}
                key={a._id}
                // onClick={() => navigate(`/article/${a._id}`)}
              >
                <div className="card-header">
                  <strong>{a.title}</strong>
                </div>
                <div className="card-body">
                  <p>{a.text.slice(0, 100)}...</p>

                  <div className="card-author">
                    <strong>Author:</strong>{" "}
                    {a.createdBy?.username || "Unknown"}
                  </div>

                  <div className="action-buttons">
                    <button
                      className="icon-button"
                      title="View"
                      onClick={() => navigate(`/view-article/${a._id}`)}
                    >
                      <FiEye className="icon-view" />
                    </button>

                    <button
                      className="icon-button"
                      title="Edit"
                      onClick={() => navigate(`/edit-article/${a._id}`)}
                    >
                      <FiEdit className="icon-edit" />
                    </button>

                    <button
                      className="icon-button"
                      title="Delete"
                      onClick={() => handleDelete(a._id)}
                    >
                      <FiTrash className="icon-delete" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {visibleCount < filteredArticles.length && (
            <div className="load-more-wrapper">
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;

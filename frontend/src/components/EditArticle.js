import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SubmitPage.css";

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const REACT_APP_API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await axios.get(
        `${REACT_APP_API_BASE_URL}/api/articles/${id}`
      );
      setTitle(res.data.title);
      setText(res.data.text);
    };
    fetchArticle();
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${REACT_APP_API_BASE_URL}/api/articles/${id}`,
        { title, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/view-article/${id}`);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="submit-container">
      <h2>Edit Article</h2>
      <input
        className="submit-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="submit-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="submit-button" onClick={handleUpdate}>
        Update
      </button>
      <button
        className="submit-button clear-button"
        onClick={() => navigate("/dashboard")}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditArticle;

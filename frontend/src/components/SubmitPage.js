import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./SubmitPage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function SubmitPage() {
  const [text, setText] = useState("");
  const [frequencies, setFrequencies] = useState({});
  const [chartType, setChartType] = useState("bar");
  const REACT_APP_API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    try {
      const res = await axios.post(
        `${REACT_APP_API_BASE_URL}/api/articles`,
        { title, text, username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFrequencies(res.data.frequencies);
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  const handleClear = () => {
    setText("");
    setFrequencies({});
  };

  const chartData = {
    labels: Object.keys(frequencies),
    datasets: [
      {
        label: "Letter Frequency",
        data: Object.values(frequencies),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
          "#9966ff",
          "#f67019",
        ],
        borderColor: "#2b2a33",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="submit-container">
      <button
        className="submit-back-button"
        onClick={() => navigate("/dashboard")}
      >
        ← Back
      </button>

      <div className="submit-section">
        <h2 className="submit-title">Publish Article</h2>
        <input
          type="text"
          className="submit-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title..."
        />
        <textarea
          className="submit-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your article text..."
        />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="submit-button clear-button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      {Object.keys(frequencies).length > 0 && (
        <>
          <div className="submit-section">
            <h2 className="submit-title">Letter Frequencies</h2>
            <ul className="submit-frequency-list">
              {Object.entries(frequencies).map(([char, count]) => (
                <li key={char} className="submit-frequency-item">
                  <strong>{char}</strong>: {count}
                </li>
              ))}
            </ul>
          </div>

          <div className="submit-section chart-container">
            <div className="chart-header">
              <h2 className="submit-title">Frequency Chart</h2>
              <button
                className="submit-button chart-toggle"
                onClick={() =>
                  setChartType((prev) => (prev === "bar" ? "pie" : "bar"))
                }
              >
                Switch to {chartType === "bar" ? "Pie" : "Bar"}
              </button>
            </div>
            <div className="submit-chart-wrapper">
              {chartType === "bar" ? (
                <Bar data={chartData} />
              ) : (
                <Pie data={chartData} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SubmitPage;

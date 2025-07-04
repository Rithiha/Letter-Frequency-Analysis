import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [chartType, setChartType] = useState("bar");

  const REACT_APP_API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${REACT_APP_API_BASE_URL}/api/articles/${id}`
        );
        const { text, title } = res.data;

        const letters = ["r", "i", "m", "e", "s"];
        const frequencies = {};
        letters.forEach((l) => (frequencies[l] = 0));
        for (let c of text.toLowerCase()) {
          if (frequencies.hasOwnProperty(c)) frequencies[c]++;
        }

        setArticle({ title, text, frequencies });
      } catch (err) {
        console.error("Failed to fetch article", err);
      }
    };
    fetchData();
  }, [id]);

  const chartData = {
    labels: Object.keys(article?.frequencies || {}),
    datasets: [
      {
        label: "Letter Frequency",
        data: Object.values(article?.frequencies || {}),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
          "#9966ff",
        ],
        borderColor: "#2b2a33",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ccc",
        },
      },
    },
    scales: chartType === "bar" && {
      x: {
        ticks: { color: "#ccc" },
        grid: { color: "#444" },
      },
      y: {
        ticks: { color: "#ccc" },
        grid: { color: "#444" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="submit-container">
      <button
        onClick={() => navigate("/dashboard")}
        className="submit-back-button"
      >
        ← Back
      </button>

      {article ? (
        <>
          <div className="submit-section">
            <h2 className="submit-title">{article.title}</h2>
            <p
              className="submit-textarea"
              style={{ background: "#1e1e2e", color: "#ccc" }}
            >
              {article.text}
            </p>
          </div>

          <div className="submit-section chart-container">
            <div className="chart-header">
              <h2 className="submit-title">Letter Frequency Chart</h2>
              <button
                className="submit-button chart-toggle"
                onClick={() =>
                  setChartType(chartType === "bar" ? "pie" : "bar")
                }
              >
                Switch to {chartType === "bar" ? "Pie" : "Bar"}
              </button>
            </div>
            <div className="submit-chart-wrapper">
              {chartType === "bar" ? (
                <Bar data={chartData} options={chartOptions} />
              ) : (
                <Pie data={chartData} options={chartOptions} />
              )}
            </div>
          </div>
        </>
      ) : (
        <p style={{ color: "#ccc", padding: "2rem" }}>Loading article...</p>
      )}
    </div>
  );
}

export default ArticleDetail;

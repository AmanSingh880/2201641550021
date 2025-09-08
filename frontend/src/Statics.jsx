"use client";

import { useEffect, useState } from "react";
import "./StaticsPage.css";

export default function StaticsPage() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/history");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setUrls(data);
      } catch (err) {
        console.error("Error loading statics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  if (loading) {
    return <p className="loading-message">Loading statistics...</p>;
  }

  if (urls.length === 0) {
    return <p className="info-message">No shortened URLs found in the history.</p>;
  }

  return (
    <div className="stats-container">
      <h2>URL Statistics</h2>
      <div className="table-wrapper">
        <table className="stats-table">
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Expires At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((row, index) => {
              const now = new Date();
              const expiryDate = new Date(row.expiresAt);
              const isExpired = now > expiryDate;
              
              return (
                <tr key={index}>
                  <td>
                    <a href={row.shortUrl} target="_blank" rel="noopener noreferrer" title={row.originalUrl}>
                      {row.shortUrl}
                    </a>
                  </td>
                  <td>{expiryDate.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${isExpired ? 'status-expired' : 'status-active'}`}>
                      {isExpired ? 'Expired' : 'Active'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

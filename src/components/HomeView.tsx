import React from "react";
import { Breadcrumb } from "./Breadcrumb";
import { SubjectGrid } from "./SubjectGrid";
import { HomeViewProps } from "../types";
import "./Views.css";

export const HomeView: React.FC<HomeViewProps> = ({
  semesters,
  onSemesterClick,
}) => {
  const breadcrumbs = [{ label: "CSIT Hub", onClick: undefined }];

  return (
    <div className="view home-view">
      <Breadcrumb items={breadcrumbs} />
      <div className="view-header">
        <h2>Select Semester</h2>
        <p>Choose a semester to view subjects and questions</p>
      </div>

      <div className="semester-grid">
        {semesters.map((sem, index) => (
          <button
            key={index}
            className="semester-card"
            style={{
              background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
            }}
            onClick={() => onSemesterClick(sem)}
          >
            <div className="semester-number">{sem}</div>
            <div className="semester-label">Semester</div>
          </button>
        ))}
      </div>

      {semesters.length === 0 && (
        <div className="empty-state">
          <p>No semesters available</p>
        </div>
      )}
    </div>
  );
};

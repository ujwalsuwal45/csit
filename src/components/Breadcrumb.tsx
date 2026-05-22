import React from "react";
import { BreadcrumbProps } from "../types";
import "./Breadcrumb.css";

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {item.onClick ? (
              <>
                <button
                  className="breadcrumb-link"
                  onClick={item.onClick}
                >
                  {item.label}
                </button>
                {index < items.length - 1 && (
                  <span className="breadcrumb-separator"> / </span>
                )}
              </>
            ) : (
              <>
                <span className="breadcrumb-current">{item.label}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// MainLayout.js
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="grid-container">
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "200px", flex: 1 }}>
          <Container
            style={{
              marginTop: "100px",
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            <Outlet />
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}

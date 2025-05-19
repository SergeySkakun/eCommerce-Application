import type { ReactElement } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";

export function NotFound(): ReactElement {
  return (
    <div className="page-404">
      <img className="right-car car-1" src="/assets/cars-404/1.jpg"></img>
      <p className="oops-text">Oops...</p>
      <img className="left-car car-2" src="/assets/cars-404/2.jpg"></img>
      <img className="right-car car-3" src="assets/cars-404/3.jpg"></img>
      <p className="error-text">404 Not Found</p>
      <Link to="/main">
        <Button variant="outlined" color="error">
          Back to Main page
        </Button>
      </Link>
      <img className="left-car car-4" src="/assets/cars-404/4.jpg"></img>
      <img className="right-car car-5" src="/assets/cars-404/5.jpg"></img>
      <img className="left-car car-6" src="/assets/cars-404/6.jpg"></img>
      <img className="right-car car-7" src="/assets/cars-404/7.jpg"></img>
      <img className="left-car car-8" src="/assets/cars-404/8.jpg"></img>
    </div>
  );
}

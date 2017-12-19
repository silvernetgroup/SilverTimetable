import { CircularProgress } from "material-ui/Progress";
import * as React from "react";

const CircularProgressSimple = () => (
  <div className="CrcProgress">
    <CircularProgress color="accent" size={60} thickness={7} />
  </div>
);

export default CircularProgressSimple;

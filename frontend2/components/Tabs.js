import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styles from "../styles/Hover.module.css";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label="Inbox"
          style={{
            color: value == 0 ? "white" : "black",
            backgroundColor: value == 0 ? "black" : "white",
            borderRadius: "40px",
            width: "200px",
            border: "solid 3px black",
          }}
        />
        <div style={{ width: "50px" }}></div>
        <Tab
          label="Spam"
          style={{
            color: value != 0 ? "white" : "black",
            backgroundColor: value != 0 ? "black" : "white",
            borderRadius: "40px",
            width: "200px",
            border: "solid 3px black",
          }}
        />
      </Tabs>
    </Box>
  );
}

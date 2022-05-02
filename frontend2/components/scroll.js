import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../styles/Hover.module.css";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { supabase } from "../utils/SupabaseClient";

export default function SendEmail(props) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState("paper");
  const [to, setTo] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [text, setText] = React.useState("");
  const [sent, NotSent] = React.useState(false);

  const sendTheEmail = async () => {
    const { data, error } = await supabase.from("email_c").insert([
      { from: props.email, to: "benedict@gmail.com" },
      { from: props.email, to: "benedict@gmail.com" },
    ]);

    if (error) {
      alert("Email not sent");
    }

    if (data) {
      alert("Email sent successfully");
    }
  };

  const toHandler = () => {
    to.push(email);
    setEmail("");
    console.log(to);
  };
  const handleClose = () => {
    setOpen(false);
    props.modalHandler(false);
  };
  const handleDelete = (index) => {
    const temp = [];

    to.map((item, i) => {
      if (i != index) temp.push(item);
    });

    setTo(temp);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Send Email</DialogTitle>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: "5%",
            paddingRight: "5%",
            maxWidth: "600px",
          }}
        >
          <h4 style={{ width: "10%", textAlign: "left" }}>To : </h4>
          <div style={{ width: "20px" }}></div>
          <TextField
            id="filled-basic"
            label="email"
            variant="standard"
            placeholder="jagannathrkulakarni@gmail.com"
            style={{ width: "70%", color: "black" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              input: {
                color: "black",
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderColor: "black",
                },
              },
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: "black",
                },
              },
              "& .MuiFormLabel-root": { color: "black", fontWeight: 100 },
            }}
          />

          <div style={{ width: "20px" }}></div>
          <Button
            style={{
              borderRadius: "20px",
              width: "100px",
              height: "40px",
              marginTop: "10px",
            }}
            className={styles.hovering2}
            onClick={toHandler}
          >
            Add
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {to &&
            to.map((item, index) => {
              return (
                <div style={{ paddingLeft: index == 0 ? "0px" : "5px" }}>
                  <Chip
                    label={item}
                    key={index}
                    style={{
                      fontSize: "9px",
                      backgroundColor: "white",
                      color: "black",
                      border: "solid 1px black",
                    }}
                    onDelete={() => handleDelete(index)}
                  />
                </div>
              );
            })}
        </div>
        <div style={{ height: "10px" }}></div>
        <Divider />
        <div style={{ minWidth: "600px", maxWidth: "600px" }}></div>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <TextField
              id="outlined-multiline-flexible"
              label="text"
              placeholder="My name is Jagannath. Can we meet tmr ?"
              multiline
              rows={4}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              style={{ minWidth: "500px" }}
              sx={{
                input: {
                  color: "black",
                },
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "black",
                  },
                },
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: "black",
                  },
                },
                "& .MuiFormLabel-root": { color: "black", fontWeight: 100 },
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{
              borderRadius: "20px",
              width: "100px",
              height: "40px",
            }}
            className={styles.hovering}
            onClick={sendTheEmail}
          >
            Send
          </Button>
          <div style={{ width: "20px" }}></div>
          <Button
            onClick={handleClose}
            style={{
              borderRadius: "20px",
              width: "100px",
              height: "35px",
            }}
            className={styles.hovering2}
          >
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

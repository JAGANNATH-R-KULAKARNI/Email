import axios from "axios";
import React from "react";
import TabsUI from "../../frontend2/components/Tabs";
import Button from "@mui/material/Button";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import styles from "../styles/Hover.module.css";
import { supabase } from "../../frontend2/utils/SupabaseClient";
import { useRouter } from "next/router";
import ScrollUI from "../components/scroll";
import useSWR from "swr";

export default function Home() {
  const [msg, setMsg] = React.useState(null);
  const router = useRouter();
  const [modal, setModal] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const { whoruPrwdwqwqdwofile: whodwdwddwruerrorProfile } = useSWR(
    "profileindex",
    checkUser
  );

  React.useEffect(() => {
    checkUser();
  });
  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setEmail(user.email);
      return;
    }
  }

  const messageHandler = async () => {
    await axios
      .post("http://127.0.0.1:8000/playground/jag/", {
        msg: "FreeMsg Hey there darling it's been 3 week's now and no word back! I'd like some fun you up for it still? Tb ok! XxX std chgs to send, £1.50 to rcv",
      })
      .then(async (res) => {
        console.log(res.data);
        setMsg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function logOut() {
    await supabase.auth.signOut();

    router.push("/login");
  }
  return (
    <div>
      {modal && email ? (
        <ScrollUI modalHandler={setModal} email={email} />
      ) : null}
      <br />
      {email ? (
        <div
          style={{
            paddingLeft: "20%",
            paddingRight: "20%",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AttachEmailIcon />}
            style={{
              width: "200px",
              height: "50px",
              borderRadius: "30px",
            }}
            className={styles.hovering}
            onClick={() => {
              setModal(true);
            }}
          >
            Compose
          </Button>
          <Button
            variant="contained"
            startIcon={<AttachEmailIcon />}
            style={{
              width: "200px",
              height: "50px",
              borderRadius: "30px",
              float: "right",
            }}
            className={styles.hovering2}
            onClick={logOut}
          >
            LogOut
          </Button>
        </div>
      ) : null}
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            minWidth: "80%",
            display: "flex",
            justifyContent: "center",
            minHeight: "400px",
          }}
        >
          <TabsUI />
        </div>
      </div>
    </div>
  );
}

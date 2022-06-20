// import Link from "components/Link";
// import { useRouter } from "next/router";


import { Container, Grid, Typography } from "@mui/material";

import Socials from "./Socials";



const Footer = () => {
//   const router = useRouter();
  return (
    <footer className={"Footer"}>
      <Container maxWidth="lg">
        <Grid container justify="right"  m={2}>
          <Socials just={"flex-end"}/>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
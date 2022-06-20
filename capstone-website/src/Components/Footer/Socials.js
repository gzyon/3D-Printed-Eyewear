import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
// if you wanto to add twitter
// import TwitterIcon from '@material-ui/icons/Twitter';


const Socials = ({just}) => {

  return (
    <Grid item container spacing={2} justify="center" justifyContent={just}>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href="https://www.youtube.com" //change when the other pages are ready
      >
        <HomeIcon
          className={"Home"}
          style={{ color: '#EAE79B' }}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
      >
        <FacebookIcon
          className={"Facebook"}
          style={{ color: '#EAE79B' }}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
      >
        <InstagramIcon
          className={"Instagram"}
          style={{ color: '#EAE79B' }}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
      >
        <GitHubIcon
          className={"Github"}
          style={{ color: '#EAE79B' }}
        />
      </Grid>
      {/* add social media*/}
    </Grid>
  );
};

export default Socials;
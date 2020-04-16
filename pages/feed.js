import { useRouter } from "next/router";
// import useSWR from "swr";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import fetch from "isomorphic-unfetch";

import CommentCard from "../components/CommentCard";
import { Fragment } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(10)
  }
}));

Feed.getInitialProps = async function (context) {
  const res = await fetch("http://localhost:3000/api/commentStream");
  const data = await res.json();
  return { data };
};

export default function Feed(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <Container className={classes.content}>
          {props.data.map(comment => (
            <CommentCard key={comment.id} data={comment} />
          ))}
        </Container>
      </div>
    </Fragment>
  );
}

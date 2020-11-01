import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  mainContainer: {
    display: "flex-inline",
    justifyContent: "space-between",
  },

  textContainer: {
    marginTop: "30%",
    textAlign: "center",
    fontFamily: "Ubuntu Mono",
    fontSize: "50px",
    fontWeight: "bold",
    color: "blue",

    [theme.breakpoints.down(700)]: {
        marginTop: "50%",
        fontSize: "40px",
    },

    [theme.breakpoints.down(400)]: {
        marginTop: "70%",
        fontSize: "30px",
    },

    [theme.breakpoints.down(200)]: {
        marginTop: "90%",
        fontSize: "25px",
    },
  },
}));

export default style;

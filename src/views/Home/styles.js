import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/bg.png";

const style = makeStyles((theme) => ({
  mainContainer: {
    background: `url(${bg}) #000`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    minHeight: window.innerHeight,
    minWidth: window.innerWidth,
    display: "flex-inline",
    justifyContent: "space-between",
  },

  titleContainer: {
    fontFamily: "Ubuntu Mono",
    fontSize: "40px",
    fontWeight: "bold",
    color: "#ceadad",
    marginTop: "20px",
    textAlign: "center",

    [theme.breakpoints.down(500)]: {
      fontSize: "35px",
      marginTop: "10%",
      marginBottom: "10%",
    },
  },

  gameBoardContainer: {
    marginTop: "50px",
    display: "grid",
    justifyContent: "center",
  },

  gameBoxContainer: {
    backgroundColor: "#2f3277",
    border: "2px solid blue",
    cursor: "pointer",
  },

  blackCheckerContainer: {
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    backgroundColor: "black",
    marginLeft: "3px",
    marginTop: "3px",
  },

  whiteCheckerContainer: {
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    backgroundColor: "white",
    marginLeft: "3px",
    marginTop: "3px",
  },

  optionContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonContainer: {
    height: "40px",
    width: "45%",
    borderRadius: "20px",
    backgroundColor: "#c19999",
    textAlign: "center",
    cursor: "pointer",
    color: "#302393",
    fontSize: "35px",
    fontWeight: "bold",

    "&:hover": {
      opacity: "0.5",
    },
  },

  playButtonContainer: {
    height: "40px",
    width: "100%",
    borderRadius: "20px",
    backgroundColor: "#c19999",
    textAlign: "center",
    cursor: "pointer",
    color: "#302393",
    fontSize: "25px",
    fontWeight: "bold",
    paddingTop: "10px",

    "&:hover": {
      opacity: "0.5",
    },
  },

  textContainer: {
    marginTop: "20px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px",
    color: "#d19aed",
  },

  moveContainer : {
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconContainer: {
    height: "25%",
    width: "20%",
    marginLeft:  "40%",

    [theme.breakpoints.down(500)]: {
      height: "15%",
      width: "60%",
      marginLeft:  "20%",
    },
  },

  

  descriptionContainer: {
    fontFamily: "Ubuntu Mono",
    fontSize: "17px",
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#050a0c",
    textAlign: "center",
  },
}));

export default style;
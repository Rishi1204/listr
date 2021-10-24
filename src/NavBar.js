import React from 'react';
import CustomBtn from './CustomBtn'
import logo from './Listr.png'
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"
//import Search from './Search'
const styles = makeStyles({
  bar:{
    paddingTop: "0 rem",
    display: "flex",
    backgroundColor: "#fff",
    ['@media (max-width:780px)']: {
      flexDirection: "column"
    }
  },
  logo: {
        width: "20px",
        flex: "auto",
        alignItems: "center",
        justifyContent: "center",
        ['@media (max-width:50px)']: {
           display: "none"
           }
    },
    logoMobile:{
        width: "100%",
        display: "none",
        ['@media (max-width:780px)']: {
            display: "inline-block"
            }
    },
    menuItem: {
        cursor: "pointer",
        flexGrow: 1,
        "&:hover": {
            color:  "#4f25c8"
        },
        ['@media (max-width:780px)']: {
            paddingBottom: "1rem"    }    
    }
})
function NavBar() {
    const classes = styles()
    return (
        <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>
              <img src={logo} className={classes.logo}/>
              <Typography variant="h6" className={classes.menuItem}>
                  Listr
              </Typography>
              </Toolbar>
    )
}
export default NavBar

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { accountInfo } from './account/firebase';
import { getUserInfo } from './api/generalAPI';
import { Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const ChatEntry = (props) => {
    return (<Grid container>
        <Grid item xs={12}>
            <ListItemText align={props.align} primary={props.text}></ListItemText>
        </Grid>
        <Grid item xs={12}>
            <ListItemText align={props.align} secondary={props.time}></ListItemText>
        </Grid>
    </Grid>)
}

const Chat = () => {

    let [wait, setWait] = useState(false)
    let [chatHistory, setChatHistory] = useState([])

  const classes = useStyles();

  const init_chat = callback => {
    setWait(true)
    getUserInfo(accountInfo, "init_chat", data=>{
        setWait(false)
        const {msg, voice} = data
        let today = new Date();
        let new_chat = {
            align: "left",
            time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            voice: voice,
            text: msg
        }
        let chat = [...chatHistory, new_chat]
        console.log(chat)
        setChatHistory(chat)
    })
  }

  let user_text = ""
  const continue_chat = () => {
    setWait(true)
    let today = new Date()
    let new_chat = {
        align: "right",
        time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
        text: user_text
    }
    let chat = [...chatHistory, new_chat]
    setChatHistory(chat)
    
    getUserInfo({...accountInfo, msg: user_text}, "continue_chat", data=>{
        setWait(false)
        const {msg, voice} = data
        let today = new Date();
        let new_chat = {
            align: "left",
            time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            voice: voice,
            text: msg
        }
        chat = [...chat, new_chat]
        console.log(chat)
        setChatHistory(chat)
    })

    getUserInfo()
  }


//   const chat_history = 
//   const send_msg()

  return (
      <div >
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Simon" src="." />
                        </ListItemIcon>
                        <ListItemText primary="Simone"></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <Button onClick={init_chat}>Start Chat</Button>
                </Grid>
                <Grid item xs={12}>
                    {wait &&<CircularProgress style={{alignContent: "center"}}/>}
                </Grid>
                <Divider />
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    {chatHistory.map((item, index)=> {
                        return <ListItem key={index}>
                            <ChatEntry time={item.time} align={item.align} text={item.text}/>
                        </ListItem>
                    })}
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={e=>{user_text=e.target.value}}/>
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add" onClick={continue_chat}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;
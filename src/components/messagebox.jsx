import {Typography} from '@mui/material'


const MessageBox = (props) => {
return (
    <div>
        <Typography>

        Error : 
        {props.children}
        </Typography>

    </div>
)


}
export default MessageBox;
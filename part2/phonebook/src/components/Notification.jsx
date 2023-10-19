const Notification = ({errorMsg, successMsg}) => {
    let message = null
    let notificationStyle = {}

    if (errorMsg) {
        notificationStyle = {
            color: 'red'
        }
        message = errorMsg
    }else { 
        message = successMsg
        notificationStyle = {
            color: 'green'
        }
    }
    
    if (message === null) {
        return null
    }

    return (
        <div className="error" style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification

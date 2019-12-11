import React from "react";
import { Paper } from "@material-ui/core"

const Dashboard = (props) => {
  return (
    <React.Fragment>
      <Paper style={{ with: '10%' }}>
        <div
          className='col-md-6 offset-md-3'
          style={{
            maxWidth: "65%",
            marginTop: "10%",
            "textAlign": "center",
            "backgroundColor": "teal"
          }}
        >
          <strong>{"WELOME BOARD"}</strong>
        </div>
      </Paper>
    </React.Fragment>
  )
}

export default Dashboard;
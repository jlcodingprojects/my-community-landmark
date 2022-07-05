import '../css/Login.css';

import { useState } from 'react';
import { sessionSetName } from '../util/sessionManager';

function Login(props) {
  const [name, setName] = useState("");

  // If user entered a name, set session variable and go to landmarks page
  const doLogin = () => {
    if(name.length > 0){
      sessionSetName(name);
      window.location.href ="/#/landmarks";
    }
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleEnter = (e) => {
    if(e.key === "Enter") {
      doLogin();
    }
  }

  return(
    <div id="login-bg">
      <div id="login-box">
        <h2 id="headerTitle">Login</h2>
        <div className="row">
          <label>First Name</label>
          <input type="text" placeholder="Enter your name" value={name} onChange={handleName} onKeyDown={handleEnter}/>
        </div>
        <div id="button" className="row" active="false">
          <button onClick={doLogin}>Go!</button>
        </div>
      </div>
    </div>
  )
}


export default Login;
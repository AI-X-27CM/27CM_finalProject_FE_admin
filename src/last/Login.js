import React from 'react';


function Login() {
  
  return (
 
   
<div className="login-box" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",  width: "100%", margin: "auto" ,paddingTop: "200px" }}>
  <div className="login-logo" style={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 1000 }}>
  <b style={{ fontSize: "50px" }}>LOGIN</b>
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body" style={{width:"300px", height:"250px"}}>
   
      <form action="../../index.html" method="post">
        <div className="input-group mb-3" style={{padding:"10px 0"}}>
          <input type="email" className="form-control" placeholder="Email" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3" style={{padding:"10px 0"}}>
          <input type="password" className="form-control" placeholder="Password" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row" style={{padding:"10px 0"}}>
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">
                Remember Me
              </label>
            </div>
          </div>
          {/* /.col */}
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block">로그인</button>
          </div>
          {/* /.col */}
        </div>
      </form>
     
     
    </div>
    {/* /.login-card-body */}
  </div>
</div>


  );
}

export default Login;
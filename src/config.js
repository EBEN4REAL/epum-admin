import jwt_decode from "jwt-decode";

let token;

let configObject = {
  // apiBaseUrl: "https://api.epump.com.ng",
  apiBaseUrl: "https://testapi.epump.com.ng", 
  // apiBaseUrl: "https://oh.epump.com.ng",
  authConfig: configObjectFunc,
  authConfigForUpload: configObjectForUploadFunc
}


function configObjectFunc() {
  if (localStorage.getItem("adminUserDetails")) {
    token = JSON.parse(localStorage.getItem("adminUserDetails")).token;
  }else {
    token = null;
  }

  if (token) {
    let exp
    if (localStorage.getItem('jwtExpiry')) {
      exp = localStorage.getItem('jwtExpiry')
    } else {
      const decoded = jwt_decode(token);
      exp = decoded.exp * 1000;
    }
    
    const now = Date.now()
    if (now > exp) {
      localStorage.clear()
      if (window.location.origin !== window.location.href) {
        window.location.href = window.location.origin
      }
    }

    return {
      headers: { 'Content-Type': 'application/json', Authorization: "bearer " + token, 'Accept': 'application/json',  }
    };
  }
  else {
      return null;
  }
}

function configObjectForUploadFunc() {
  if (localStorage.getItem("adminUserDetails")) {
    token = JSON.parse(localStorage.getItem("adminUserDetails")).token;
  }else {
    token = null;
  }

  if (token) {
    let exp
    if (localStorage.getItem('jwtExpiry')) {
      exp = localStorage.getItem('jwtExpiry')
    } else {
      const decoded = jwt_decode(token);
      exp = decoded.exp * 1000;
    }
    
    const now = Date.now()
    if (now > exp) {
      localStorage.clear()
      if (window.location.origin !== window.location.href) {
        window.location.href = window.location.origin
      }
    }

    return {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: "bearer " + token, 'Accept': '*/*'  }
    };
  }
  else {
      return null;
  }
}

export default configObject;

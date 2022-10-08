const http = require("http");
const fs = require("fs");
const { unescape } = require("querystring");

const usersText = fs.readFileSync("./users.txt", "utf8");
fs.writeFileSync("./users.txt", usersText);

const users = JSON.parse(usersText);
console.log(users);

const server = http.createServer(function (res, req) {
  let isLogin = false;
  let dataForm = "";

  res.on("data", function (data) {
    dataForm = data + "";
    dataForm = getQueryParams(dataForm);
    console.log(dataForm);
    isLogin = users.some((user) => user.name == dataForm.uname && user.pass == dataForm.psw);
    console.log(isLogin);
  });

  function getQueryParams(data) {
    const paramArr = data.split("&");
    const params = {};
    paramArr.map((param) => {
      const [key, val] = param.split("=");
      params[key] = decodeURIComponent(unescape(val));
    });
    return params;
  }

  const formLogin = `
  <style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #d7d5d5;
  }

  /* Full-width input fields */
  input[type=text],
  input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  /* Set a style for all buttons */
  button {
    background-color: #04AA6D;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
  }

  button:hover {
    opacity: 0.8;
  }

  /* Extra styles for the cancel button */
  .cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
  }

  /* Center the image and position the close button */
  .imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
    position: relative;
  }

  img.avatar {
    margin-top: 32px;
    width: 40%;
    border-radius: 50%;
  }

  .container {
    padding: 16px;
  }

  span.psw {
    float: right;
    padding-top: 16px;
  }

  /* The Modal (background) */
  .modal {
    margin: 0 auto;
    width: 550px;
    padding-top: 60px;
  }

  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto;
    /* 5% from the top, 15% from the bottom and centered */
    width: 80%;
    /* Could be more or less, depending on screen size */
  }

  /* The Close Button (x) */
  .close {
    position: absolute;
    right: 25px;
    top: 0;
    color: #000;
    font-size: 35px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: red;
    cursor: pointer;
  }

  /* Add Zoom Animation */
  .animate {
    -webkit-animation: animatezoom 0.6s;
    animation: animatezoom 0.6s
  }

  @-webkit-keyframes animatezoom {
    from {
      -webkit-transform: scale(0)
    }

    to {
      -webkit-transform: scale(1)
    }
  }

  @keyframes animatezoom {
    from {
      transform: scale(0)
    }

    to {
      transform: scale(1)
    }
  }

  /* Change styles for span and cancel button on extra small screens */
  @media screen and (max-width: 300px) {
    span.psw {
      display: block;
      float: none;
    }

    .cancelbtn {
      width: 100%;
    }
  }
</style>
</head>

<body>
  <div id="id01" class="modal">

    <form class="modal-content animate" action="http://127.0.0.1:8888/" method="post">
      <div class="imgcontainer">
        <span onclick="document.getElementById('id01').style.display='none'" class="close"
          title="Close Modal">&times;</span>
        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" class="avatar">
      </div>

      <div class="container">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required>

        <button type="submit">Login</button>
      </div>

      <div class="container" style="background-color:#f1f1f1">
        <button type="button" class="cancelbtn">Cancel</button>
        <span class="psw">Forgot <a href="#">password?</a></span>
      </div>
    </form>
  </div>
`;

  res.on("end", function (data) {
    setTimeout(() => {
      req.statusCode = 200;

      req.setHeader("Content-Type", "text/html");
      //                                              duoi html
      if (isLogin) {
        req.end("login thanh cong");
      } else {
        req.end(formLogin);
      }
    }, 0);
  });
});
server.listen("8888", "127.0.0.1");

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="root" value="${pageContext.request.contextPath}"></c:set>

<html>

<head>
<meta charset="UTF-8">
<title>HappyHouse</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
	crossorigin="anonymous"></script>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=5c1c5e499996ae9f12b29dfc9a75f172&libraries=clusterer"></script>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">
<link rel="stylesheet" href="../css/index.css">
<link rel="stylesheet" href="../css/login.css">
<script src="../js/munubar.js"></script>
<link rel="shortcut icon" href="../img/Logo.ico">

</head>

<body>
	<script type="text/javascript">
		$(document).ready(
				function() {
					$("#login-button").click(
							function() {
								if (!$("#userId").val()) {
									alert("아이디 입력!!!");
									return;
								} else if (!$("#userPwd").val()) {
									alert("비밀번호 입력!!!");
									return;
								} else {
									$("#loginform").attr("action",
											"${root}/user/login").submit();
								}
							});

				});
	</script>

	<div class="login-bar">
		<div class="login-btns">
			<button class="btn btn-primary" data-bs-toggle="modal"
				data-bs-target="#SignUpModal">Sign Up</button>
			<button class="btn btn-primary"
				onclick="location.href='${root}/user/login';">Login</button>
		</div>
	</div>
	<div class="container">
		<nav class="navbar navbar-expand-lg navbar-light bg-opacity-10"
			style="padding-top: 0px; padding-bottom: 0px; height: 140px;">
			<div class="container-fluid">
				<a class="navbar-brand"
					href="http://localhost"><img
					src="https://user-images.githubusercontent.com/59672592/158062658-5bc965e2-f8d3-4c4e-b746-de9f40b1d4f5.png"
					width="150px" height="150px" alt=""></a>
				<button class="navbar-toggler" type="button"
					data-bs-toggle="collapse" data-bs-target="#navbarScroll"
					aria-controls="navbarScroll" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarScroll">
					<ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
						style="-bs-scroll-height: 100px;">
						<li class="nav-item"><a class="nav-link active"
							aria-current="page" href="#">오늘의 뉴스</a></li>
						<li class="nav-item"><a class="nav-link active"
							aria-current="page"
							href="http://localhost/noticeboard/list">공지사항</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>

	<div class="form-wrapper">
		<div class="form-container">
			<h1>Welcome</h1>
			<form class="form" id="loginform" method="post" action="">
				<input type="text" id="userId" name="userId" placeholder="ID">
				<input type="password" id="userPwd" name="userPwd"
					placeholder="Password">
				<button type="submit" id="login-button">Login</button>
			</form>
		</div>

		<ul class="bg-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
	<div class="bottom"></div>

</body>
</html>

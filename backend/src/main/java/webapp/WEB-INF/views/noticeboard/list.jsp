<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="root" value="${pageContext.request.contextPath}"></c:set>
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
	<div class="login-bar"></div>
	<div class="menu-bar"></div>
	<c:if test="${!empty msg}">
		<script>
			alert("${msg}");
		</script>
	</c:if>
	<script type="text/javascript">
		$(document).ready(
				function() {

					if ("${key}")
						$("#skey").val("${key}").prop("selected", true);

					$("#mvRegisterBtn").click(function() {
						location.href = "${root}/noticeboard/register";
					});

					$("#searchBtn").click(
							function() {
								var word = $("#sword").val();
								if (word == "") {
									alert("모든 목록 조회!!!");
								}
								$("#searchform").attr("action",
										"${root}/noticeboard/list").submit();
							});

					$(".page-item").click(
							function() {
								$("#pg").val(($(this).attr("data-pg")));
								$("#pageform").attr("action",
										"${root}/noticeboard/list").submit();
							});

				});
	</script>
	<form name="pageform" id="pageform" method="GET" action="">
		<input type="hidden" name="pg" id="pg" value=""> <input
			type="hidden" name="key" id="key" value="${key}"> <input
			type="hidden" name="word" id="word" value="${word}">
	</form>
	<form id="downform">
		<input type="hidden" name="sfolder"> <input type="hidden"
			name="ofile"> <input type="hidden" name="sfile">
	</form>
	<div class="container text-center mt-3">
		<div class="col-lg-8 mx-auto">
			<%-- <%@ include file="/WEB-INF/views/include/confirm.jsp" %> --%>
			<h2 class="p-3 mb-3 shadow bg-light">
				<mark class="sky">공지 사항</mark>
			</h2>
			<div class="m-3 text-right">
				<c:if test="${!empty userinfo}">
					<button type="button" id="mvRegisterBtn" class="btn btn-link">글작성</button>
				</c:if>
			</div>
			<div class="m-3 row justify-content-end">
				<form id="searchform" class="form-inline" method="get">
					<input type="hidden" name="pg" value="1"> <select id="skey"
						name="key" class="form-control">
						<option value="userid">아이디
						<option value="articleno">글번호
						<option value="subject">제목
					</select> <input type="text" class="ml-1 form-control" id="sword"
						name="word" value="${word}">
					<button type="button" id="searchBtn"
						class="ml-1 btn btn-outline-primary">검색</button>
				</form>
			</div>
			<c:if test="${!empty articles}">
				<c:forEach var="article" items="${articles}">
					<table class="table table-active text-left">
						<tbody>
							<tr class="table-primary">
								<td>작성자 : ${article.userName}</td>
								<td class="text-right">작성일 : ${article.regTime}</td>
							</tr>
							<tr>
								<td colspan="2" class="table"><strong>${article.articleNo}.
										${article.subject}</strong></td>
							</tr>
							<tr>
								<td class="p-4" colspan="2">${article.content}</td>
							</tr>

							<c:if test="${userinfo.userId eq article.userId}">
								<tr>
									<td colspan="2" class="text-right"><a
										href="${root}/noticeboard/modify?articleno=${article.articleNo}">수정</a>
										<a
										href="${root}/noticeboard/delete?articleno=${article.articleNo}">삭제</a>
									</td>
								</tr>
							</c:if>
						</tbody>
					</table>
				</c:forEach>
				<div class="m-3 row justify-content-center">${navigation.navigator}</div>
			</c:if>
			<c:if test="${empty articles}">
				<table class="table table-active text-center">
					<tr class="table-info">
						<td>작성한 글이 없습니다.</td>
					</tr>
				</table>
			</c:if>
		</div>
	</div>
	<div class="bottom"></div>
</body>
</html>

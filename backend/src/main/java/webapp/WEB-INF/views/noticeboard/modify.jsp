<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="root" value="${pageContext.request.contextPath}"></c:set>
<head>
    <meta charset="UTF-8">
    <title>HappyHouse</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=5c1c5e499996ae9f12b29dfc9a75f172&libraries=clusterer"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../css/index.css">
    <link rel="stylesheet" href="../css/login.css">
    <script src="../js/munubar.js"></script>
    <link rel="shortcut icon" href="../img/Logo.ico">
    
</head>

<body>
<div class="login-bar"></div>
<div class="menu-bar"></div>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#modifyBtn").click(function () {
                if (!$("#subject").val()) {
                    alert("제목 입력!!!!");
                    return;
                } else if (!$("#content").val()) {
                    alert("내용 입력!!!!");
                    return;
                } else {
                    $("#writeform").attr("action", "${root}/noticeboard/modify").submit();
                }
            });
        });
    </script>

    <div class="container text-center mt-3">
        <div class="col-lg-8 mx-auto">
        	<%-- <%@ include file="/WEB-INF/views/include/confirm.jsp" %> --%>
            <h2 class="p-3 mb-3 shadow bg-light"><mark class="sky">글수정</mark></h2>
            <form id="writeform" class="text-left mb-3" method="post" action="">
            	<input type="hidden" name="articleNo" value="${article.articleNo}">
                <!-- <div class="form-group">
                    <label for="userid">작성자ID:</label>
                    <input type="text" class="form-control" id="userid" name="userid" placeholder="작성자ID...">
                </div> -->
                <div class="form-group">
                    <label for="subject">제목:</label>
                    <input type="text" class="form-control" id="subject" name="subject" value="${article.subject}">
                </div>
                <div class="form-group">
                    <label for="content">내용:</label>
                    <textarea class="form-control" rows="15" id="content" name="content">${article.content}</textarea>
                </div>
                <div class="text-center">
                    <button type="button" id="modifyBtn" class="btn btn-outline-primary">글수정</button>
                    <button type="reset" class="btn btn-outline-danger">초기화</button>
                </div>
            </form>
        </div>
    </div>
    <div class="bottom"></div>
</body>
</html>
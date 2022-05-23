<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ include file="include/header.jsp" %>
<script type="text/javascript">
$(document).ready(function(){
    $(document).ready(function () {
        $("#update-button").click(function () {
            if (!$("#userName").val()) {
                alert("이름 입력!!!");
                return;
            } 
        	else if (!$("#userPwd").val()) {
        	    alert("비밀번호 입력!!!");
        	    return;
        	}
        	else if (!$("#userName").val()) {
        	    alert("이름 입력!!!");
        	    return;
        	}
        	 else if (!$("#email").val()) {
        	    alert("이메일 입력!!!");
        	    return;
        	}
        	 else if (!$("#phone").val()) {
        	    alert("휴대폰 번호 입력!!!");
        	    return;
        	}else {
            	 $("#update").attr("action", "${root}/user/update").submit();
            }
        });
    });
    $(document).ready(function () {
        $("#delete-button").click(function () {
           $("#delete").attr("action", "${root}/user/delete").submit();
        });
    });
});
</script>
<div class="login-bar">
<c:if test="${empty userinfo}">
	<div class="login-btns">
    <button class="btn btn-primary" onclick="location.href='${root}/user/register';">Sign Up</button>
    <button class="btn btn-primary" onclick="location.href='${root}/user/login';">Login</button> 
    </div>
</c:if>	

<c:if test="${!empty userinfo}">

	<div class="login-btns">
    <button class="btn btn-primary" onclick="location.href='${root}/user/logout';">Logout</button>
    <button class="btn btn-primary"data-bs-toggle="modal" data-bs-target="#myPageModal">MyPage</button>
    </div>
    <div class="modal fade" id="myPageModal" tabindex="-1" aria-labelledby="myPageModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="myPageModal">MyPage</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
				<form class="form" id="update" method="post" action="">
                    <div class="form-floating mb-3">
                        <input type="hidden"id="userId" name="userId"value="${userinfo.userId}">
                        <h3>${userinfo.userId}</h3>
                    </div>                      
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="userPwd" name="userPwd"placeholder="영문 숫자 포함 6자리 이상"value="${userinfo.userPwd}" required>
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="userName"name="userName" placeholder="Name" value="${userinfo.userName}"required>
                        <label for="floatingInput">Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="email" name="email"placeholder="Email" value="${userinfo.email}"required>
                        <label for="floatingInput">Email</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="phone" name="phone"placeholder="010-xxxx-xxxx" value="${userinfo.phone}"required>
                        <label for="floatingInput">Phone</label>
                    </div> 
                    </form>          
                </div>
                <div class="modal-footer">
                    <button type="submit" id="update-button"class="btn btn-warning">수정</button>
                   <form class="form" id="delete" method="post" action="">
					<input type="hidden"id="userId" name="userId" value="${userinfo.userId}">
                    </form>
                    <button type="submit" id="delete-button"class="btn btn-danger" onclick="location.href='${root}/user/delete';">탈퇴</button>                   
                    </div>
            </div>
        </div>
    </div>
</c:if>
</div>
    <div class="menu-bar"></div>
    <div class="container-fluid"id="search" style="background-image: url('img/main_img.jpg')">
        <div class="title">Happy House</div><br>
        <div class="dropdown">
            <div class="container-fluid">
                <!-- filters start -->
                <div class="sorting-filters text-center mb-20 d-flex justify-content-center">
                    <form class="form" id="frm" action="/HousePage">
                        <!-- <input type="hidden" id="code"  name="code" value="code"/> -->
                        
                        <div class="form-group md" id="search-select-btn">
                            <select class="form-control" name="sido" id="sido">
                                <option value="all">도/광역시</option>
                            </select>
                        </div>
                        <div class="form-group md" id="search-select-btn">
                            <select class="form-control" name="gugun" id="gugun">
                                <option value="all">시/구/군</option>
                            </select>
                        </div>
                        <div class="form-group md" id="search-select-btn">
                            <select class="form-control" name="dong" id="dong">
                                <option value="all">동</option>
                            </select>
                        </div>
                        <button type="submit" id="listBtn" class="btn btn-light">Search</button>
                    </form>
                </div>
                <!-- filters end -->

            </div>
        </div>
    </div>
    
    <div id="map"></div>

    <div class="wrap">
      <section id="services" class="services section-bg">
          <div class="container" data-aos="fade-up">
            <header class="section-header">
              <br>
              <h3>오늘의 뉴스</h3>
              <br>
              </header>
    
            <div class="row g-5">
  
              <div class="col-md-6 col-lg-4 wow bounceInUp" data-aos="zoom-in" data-aos-delay="100">
                <div class="box">
                  <div class="icon" style="background: #fceef3;"><i class="bi bi-newspaper" style="color: #ff689b;"></i></div>
                  <h4 class="title"><a href="https://www.mk.co.kr/news/politics/view/2021/12/1222138/">"주택세금 줄여 집값 잡고…규제 완화해 일자리 창출을"</a></h4>
                  <p class="description">대선 정국 공약 대결의 핵심 승부처로 집값 안정책과 일자리 문제 해법이 떠오른 가운데 국민은 차기 대통령과 정부의 부동산 정책 우선순위로 신규 주택 공급 확대를, 일자리 해법으로 기업 규제 완화를 꼽았다...</p>
                </div>
              </div>
              <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="200">
                <div class="box">
                  <div class="icon" style="background: #fff0da;"><i class="bi bi-newspaper" style="color: #e98e06;"></i></div>
                  <h4 class="title"><a href="https://www.mk.co.kr/news/realestate/view/2022/03/233088/">"올해 공동주택 공시가 상승률 20% 밑돌 듯"…작년 가격 급등에 인천 경기 30% 육박</a></h4>
                  <p class="description">정부가 이달 하순 공개하는 올해 공동주택 공시가격이 작년 수준을 밑돌 것으로 보인다. 그동안 업계에서는 올해 전국과 서울 평균 공동주택 공시가격 상승률이 20% 이상 오를 것이라는 전망이 많았다...
                </div>
              </div>
    
              <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="300">
                <div class="box">
                  <div class="icon" style="background: #e6fdfc;"><i class="bi bi-newspaper" style="color: #3fcdc7;"></i></div>
                  <h4 class="title"><a href="https://www.mk.co.kr/news/realestate/view/2022/03/232454/">1기 신도시 재건축 기대감에 술렁…"대선 직후 매수 문의 급증"</a></h4>
                  <p class="description">국민의힘 윤석열 후보의 당선으로 1기 신도시와 서울을 중심으로 아파트 재건축 시장이 활기를 띨 것이라는 기대감이 확산하면서 집주인들이 매물을 거둬들인 것으로 풀이된다...

                </div>
              </div>
          </div>
          </div>
        </section>
      </div>

    <div class="bottom"></div>
</body>
</html>

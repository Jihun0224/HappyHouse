<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script type="text/javascript">
	var dongCode = "${dongCode}";
	console.log(dongCode);
	$(document).ready(function() {
		$.get("/map/apt", {
			dong : dongCode
		}, function(data, status) {
			makeTable(data);
		}, "json");
	});

	$(document).on("click", "#seachbyaptBtn", function() {
		$.get("/map/searchByAptName"
				,{aptName: $("#aptName").val()}
				,function(data, status){
					makeTable(data);
				}
				, "json"
		);
	});
</script>
<div class="login-bar"></div>
<div class="menu-bar"></div>

<div class="container-fluid"
	style="background-color: #f5f8fd; margin-bottom: 50px;">
	<div class="container">
		<div style="height: 130px;"></div>
		<div class="row col-sm-12 justify-content-center">
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
		</div>
		<div class="alert alert-success">
			<strong>아파트</strong> 매매정보
		</div>
		<div class="row col-sm-12 justify-content-end">
			<div class="d-flex">
					<input id="aptName" class="form-control me-2" type="search"
						placeholder="아파트명을 입력하세요" aria-label="Search">
					<button id="seachbyaptBtn" class="btn btn-outline-dark">Search</button>
			</div>
		</div>
		<div class="row">
			<div id="map" class="mt-2" style="width: 800px; height: 400px;">
			</div>
		</div>
		<table class="table mt-2">
			<colgroup>
				<col width="100">
				<col width="150">
				<col width="120">
				<col width="120">
			</colgroup>
			<thead>
				<tr>
					<th>아파트이름</th>
					<th class="text-center">주소</th>
					<th>건축연도</th>
					<th>최근거래금액</th>
				</tr>
			</thead>
			<tbody id="searchResult"></tbody>
		</table>
	</div>


</div>
<div class="bottom"></div>

</body>

</html>

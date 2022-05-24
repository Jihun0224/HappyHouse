$(document).ready(function(){

    var menubar=`
    <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-opacity-10"style="
    padding-top: 0px;
    padding-bottom: 0px;
    height: 140px;
">
    <div class="container-fluid">
        <a class="navbar-brand" href="http://localhost"><img src="https://user-images.githubusercontent.com/59672592/158062658-5bc965e2-f8d3-4c4e-b746-de9f40b1d4f5.png" width="150px" height="150px" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">오늘의 뉴스</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="http://localhost/noticeboard/list">공지사항</a>
            </li>
        </ul>
        <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-dark" type="submit">Search</button>
        </form>
        </div>
    </div>
</nav>
</div>
    `

    $('.menu-bar').html(menubar)
    var bottom = `
      <div class="container" id="footer">
        <h3>Find Us</h3><br>
        <h4>
          <i class="bi bi-geo-alt-fill" style="color: #413e66;"></i>
          (SSAFY) 서울시 강남구 테헤란로 멀티스퀘어<br></h4>
        <h4>
          <i class="bi bi-telephone-fill" style="color: #413e66;"></i>
          1544-9001<br>
        </h4>
        <h4>
          <i class="bi bi-envelope" style="color: #413e66;"></i>
          admin@ssafy.com<br>
        </h4>          
      </div>
        <div class="copy">
            Copyright by SSAFY. All rights reserved.
      </div>
    `
    $('.bottom').html(bottom)
})

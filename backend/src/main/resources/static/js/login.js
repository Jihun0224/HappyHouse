$(document).ready(function () {

function pwSearch(params) {
    var psSearchModal=`
    <div class="modal fade" id="userInfoModal" tabindex="-1" aria-labelledby="userInfoModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="userInfoModal">Find Password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="sId" placeholder="Id">
                            <label for="floatingInput">Id</label>
                        </div>      
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="sname" placeholder="name">
                            <label for="floatingInput">Name</label>
                        </div>                    
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="sphone" placeholder="phone">
                            <label for="floatingInput">Phone</label>
                        </div>                      
                        <button type="button" class="btn btn-outline-primary" onclick="infoCheck()">비밀번호 찾기</button>                          
                    </form>
                </div>
            </div>
        </div>
    </div>
    `
    $('.login-bar').append(psSearchModal);
    $('#userInfoModal').modal("show");

}
function infoCheck(params) {
    var input={
        id:$('#sId').val(),
        name:$('#sname').val(),
        phone:$('#sphone').val()
    }
    var user=JSON.parse(localStorage.getItem('user'))
    if(input.id===user.id&&input.name===user.name&&input.phone===user.phone){
        $('#userInfoModal').modal("hide");
        var changePw=`
        <div class="modal fade" id="changePwModal" tabindex="-1" aria-labelledby="changePwModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="changePwModal">Find Password</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="cpw" placeholder="Password">
                            <label for="floatingPassword">Password</label>
                            </div>                        
                            <button type="button" class="btn btn-outline-primary" onclick="chagePW()">비밀번호 변경</button>                          
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `
        $('.login-bar').append(changePw);
        $('#changePwModal').modal("show");
    }
    else{
        alert("일치하는 회원이 없습니다.")
        $('#sId').val("")
        $('#sname').val("")
        $('#sphone').val("")
    }
}
function chagePW() {
    var inputPw =  $('#cpw').val()
    var pattern_num = /[0-9]/;	// 숫자 
    var pattern_eng = /[a-zA-Z]/;	// 문자 
    if(inputPw.length>=6&&(pattern_num.test(inputPw))&&(pattern_eng.test(inputPw))){
        var user = JSON.parse(localStorage.getItem('user'))
        user.pw=inputPw
        localStorage.setItem('user',JSON.stringify(user))
        alert("비밀번호 변경 완료")
        $('#changePwModal').modal("hide");
    }
    else{
        alert("영문 숫자 포함 6자리 이상의 비밀번호를 입력하세요.")
    }
}
});
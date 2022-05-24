$(document).ready(function(){
    var notice = JSON.parse(localStorage.getItem("notice"))

    $.each(notice,function(i,data){
        console.log(i);
        $(`#notice${i}`).find(".title").text(data.title)
        $(`#notice${i}`).find(".description").text(data.description)
    })
    for (let i=Object.keys(notice).length; i < 6; i++) {
        $(`#notice${i}`).hide();
    }
})
function addNotice(title,description) {
    var notice=JSON.parse(localStorage.getItem("notice"))
    if(notice.length==6){
        notice[5].title=title
        notice[5].description=description
    }
    else{
        notice.push({'title':title,'description':description})
    }
    localStorage.setItem('notice',JSON.stringify(notice))
    $('#addNotice').find('#newTitle').text("")
    $('#addNotice').find('#floatingTextarea2').text("")
    $('#addNotice').modal("hide");
    location.reload();
}
function deleteNotice() {
    var notice=JSON.parse(localStorage.getItem("notice"))
    target=$('#openNotice').find('#openTile').text()

    var json_idx = notice.findIndex(function(key) {return key.name === target});
    notice.splice(json_idx, 1);
    localStorage.setItem('notice',JSON.stringify(notice))
    location.reload();
}
function openNotice(target) {
    
    $('#openNotice').find('#openTile').text($('#'+target).find(".title").text())
    $('#openNotice').find('#openDes').text($('#'+target).find(".description").text())
    $('#openNotice').modal("show");

}
function modifyNotice() {

 

}
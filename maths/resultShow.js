$(document).ready(function() {
	$("#showName").html(sessionStorage.getItem("name"));
	$("#showScore").html(sessionStorage.getItem("score"));
	
}) ;

$("#logout").click(function(){
	location.href = location.href = "../index.html";
})


function returnToStart(){
	location.href = "../index.html";
}

setTimeout("returnToStart()" , 10000);
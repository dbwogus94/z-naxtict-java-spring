function login(){
	var id = document.getElementsByName("userId")[0]
	var pw = document.getElementsByName("userPw")[0]
	
	if(id.value === "" || id.value === undefined){
		id.focus();
		alert("경고! 아이디를 입력하세요");
		return false;
	}
	
	if(pw.value === "" || pw.value === undefined){
		alert("경고! 패스워드를 입력하세요");
		pw.focus();
		return false;
	}

	var json= getFormDateToJson();
	Util_ajax_payload("userLoginAction.do","text", json, function(data){
		if(data == "success"){
			alert("로그인 성공 ! 환영합니다.");
			location.href="../board/boardList.do"
		} else {
			alert("로그인 실패! 아이디나 비밀번호가 틀렸습니다.");
		}
	})
}
function enterkey() {
    if (window.event.keyCode == 13) {
         login();
    }
}

//영어, 숫자만 입력
let onkeyEvent_Id = (e) => {
	const pattern = /[^A-Za-z0-9]/g;
	let id = document.querySelector("input[name='userId']");
	let msg = search_msg("msg_id");
	chk01 = false;
	
	if(pattern.test(id.value)){
		id.value = id.value.replace(/[^A-Za-z0-9]/g, ''); 
		msg.innerHTML = "영문 또는 숫자만 입력이 가능합니다.";
		msg.style.color = "red";
	} else if(id.value.length >= 15){
		cutString(id, 15)
		msg.innerHTML = "15글자까지 입력이 가능합니다.";
		msg.style.color = "red";
	} else {
		msg.innerHTML = "";
	}
}
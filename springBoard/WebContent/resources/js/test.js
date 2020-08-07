function pwChk(){
	let pw = document.getElementsByName("userPw")[0]
	let msg = search_msg("msg_pw");

	if(pw.value.length < 6){
		msg.innerHTML="pw는 6 ~ 12자리로 입력하세요."
		msg.style.color = "red"
		chk02 = false;
	} else {
		msg.innerHTML=""
		chk02 = true;
	}
}

function pwChk_eq(){
	let pw = document.getElementsByName("userPw")[0]
	let pw_chk = document.getElementById("userPw_chk")
	let msg = search_msg("msg_pwChk");
	
	if(pw_chk.value.length >= 6){
		if(pw.value === pw_chk.value){
			msg.innerHTML="pw가 일치 합니다."
			msg.style.color = "blue"
			chk03 = true;
		} else {
			msg.innerHTML="pw가 일치 하지 않습니다."
			msg.style.color = "red"
			pw_chk.focus();
			chk03 = false;
		}
	} else {
		msg.innerHTML="pw check를 6 ~ 12자리로 입력하세요."
		msg.style.color = "red"
		chk02 = false;
	}
}

function phoneChk(target){
	let msg_post = search_msg("msg_phone1");
	let msg_back = search_msg("msg_phone2");
	let regexp = /^\d{4}$/;  // 연속된 4자리 숫자
	
	if(target.name === "userPhone2"){
		if(!regexp.test(target.value)){ 
			target.value = target.value.replace(/[^0-9]/gi, ''); // 숫자 이외면 ""으로 변환
			msg_post.innerHTML="앞자리 번호를 4자리 숫자로 입력하세요"
			msg_post.style.color = "red";
			chk03 = false;
		} else {
			msg_post.innerHTML = "";
			chk03 = true;
		}
	} else {
		if(!regexp.test(target.value)){
			if(msg_post.innerHTML === ""){
				target.value = target.value.replace(/[^0-9]/gi, ''); // 숫자 이외면 ""으로 변환
				msg_back.innerHTML="뒷자리 번호를 4자리 숫자로 입력하세요"
			} else {
				msg_back.innerHTML="<br/>뒷자리 번호를 4자리 숫자로 입력하세요"
			}
			msg_back.style.color = "red";
			chk04 = false;
		} else {
			msg_back.innerHTML = "";
			chk04 = true;
		}
	}
}

function postNoChk(target){
	let msg =  search_msg("msg_postNo");
	let regexp = /^\d{3}-\d{3}$/;
	
	if(!regexp.test(target.value)){
		msg.innerHTML = "우편번호는 숫자 형식으로 입력하세요. ex) 123-123"
		msg.style.color = "red";
		chk06 = false;
	} else {
		msg.innerHTML = "";
		chk06 = true;
	}
	if(target.value.length >= 6) {
		let text = target.value 
		target.value = text.substring(0,3) + "-" + text.substring(3, text.length);
		cutString(target, 7)
	} 
}
var chk01 = false;  // id
var chk02 = false;  // pw
var chk03 = false;  // pw_chk
var chk04 = false;  // 앞 번호
var chk05 = false;  // 뒷 번호
var chk06 = true;   // postNo

function cutString(target, cnt){
	if(target.value.length >= cnt){
		target.value = target.value.substring(0, cnt);
	}
	return false
}
function search_msg(tagId){
	let msgArr = document.getElementsByClassName("msg");
	for(msg of msgArr){
		if(msg.id === tagId){
			return msg;
		}
	}
	return false
}

// 영어, 숫자만 입력
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

//한글만 입력
let onkeyEvent_name = function(e) {
	const pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
	let name = document.querySelector("input[name='userName']");
	let msg = search_msg("msg_name");
	
	if(pattern.test(name.value)){
		name.value = name.value.replace(pattern, ''); // 한글이외 글자 공백처리
		msg.innerHTML = "한글만 입력하세요";
		msg.style.color = "red";
	} else if(name.value.length >= 5) {
		cutString(name, 5)
		msg.innerHTML = "5글자까지 입력이 가능합니다.";
		msg.style.color = "red";
	} else {
		msg.innerHTML = "";
	}
};

/* pwchk_일치 */
let onkeyEvent_pwChk = (e) => {
	let msg = search_msg("msg_pwChk");
	let pw = document.querySelector("input[name='userPw']");
	let pw_chk = document.querySelector("input[id='userPw_chk']");
	
	if(pw_chk.value.length >= 6){
		if(pw.value === pw_chk.value){
			msg.innerHTML="pw가 일치 합니다.";
			msg.style.color = "blue"
			chk03 = true;
		} else {
			msg.innerHTML="pw가 일치하지 않습니다.";
			msg.style.color = "red";
			pw_chk.focus();
			chk03 = false;
		}
	} else if(pw_chk.value === "") {
		msg.innerHTML = "";
		chk03 = false;
	} else {
		msg.innerHTML="pw check를 6 ~ 12자리로 입력하세요.";
		msg.style.color = "red";
		chk03 = false;
	}
}

/* 전화번호 숫자만 입력 */
let onkeyEvent_phone = (e) => {
	let msg_post = search_msg("msg_phone1");
	let msg_back = search_msg("msg_phone2");
	let target = e.currentTarget; // 이벤트 발생 주체
	
	//let regexp = /^\d{4}$/;  // 연속된 4자리 숫자
	let regexp = /[^0-9]/gi;
	
	if(target.name === "userPhone2"){
		chk04 = false;
		if(regexp.test(target.value)){ 
			target.value = target.value.replace(/[^0-9]/gi, ''); // 숫자 이외면 ""으로 변환
			msg_post.innerHTML="앞자리 번호를 4자리 숫자로 입력하세요"
			msg_post.style.color = "red";
		} else {
			msg_post.innerHTML = "";
		}
	} else {
		chk05 = false;
		if(regexp.test(target.value)){
			if(msg_post.innerHTML === ""){
				target.value = target.value.replace(/[^0-9]/gi, ''); // 숫자 이외면 ""으로 변환
				msg_back.innerHTML="뒷자리 번호를 4자리 숫자로 입력하세요"
			} else {
				msg_back.innerHTML="<br/>뒷자리 번호를 4자리 숫자로 입력하세요"
			}
			msg_back.style.color = "red";
		} else {
			msg_back.innerHTML = "";
		}
	}
}

// [숫자, -] 이외에 제외
let onkeyEvent_Addr1 = (e) => {
	let target = e.currentTarget;
	let msg = search_msg("msg_postNo");
	let regexp =  /[^0-9-]/gi			// /[^0-9]/gi;  	// /\d{3}-\d{3}/gi;
	let temp = '';
	chk06 = false;
	console.log(target)
	
	if(target.value !== "" && regexp.test(target.value)){ 
		target.value = target.value.replace(regexp, ''); // 숫자 이외면 ""으로 변환
		msg.innerHTML = "우편번호는 숫자로 입력하세요";
		msg.style.color = "red";
		chk06 = true;
		return false;
	} else if(target.value.length > 7){
		cutString(target, 7);
		msg.innerHTML = "우편번호는 6자리 숫자로 입력하세요";
		msg.style.color = "red";
		return false;
	} else if(target.value === "" || target.value === undefined){
		chk06 = true;
		msg.innerHTML = "";
		return false;
	} else {
		target.value = autoHypenPhone(target.value);
		chk06 = true;
		msg.innerHTML = "";
		return false;
	}
}

let onkeyprassEvent_Addr1 = (e) => {
	//let target = document.querySelector("input[name='userAddr1']");
	let char_ASCII = event.keyCode;
	//console.log(e.currentTarget)
	let target = e.currentTarget; 
	let msg = search_msg("msg_postNo");
	let regexp = /[^0-9]/gi;
	chk06 = false;
	
	// 숫자 >> onkeypress에서 인식
	if (char_ASCII >= 48 && char_ASCII <= 57 ) {
		msg.innerHTML = "";
		let text = target.value;
		if(target.value.length == 3){
			target.value = text.substring(0,3) + "-";
		} else if(target.value.search("-") === -1 && target.value.length >= 6) {
			target.value = text.substring(0,3) + "-" + text.substring(3, text.length);
		} 
		chk06 = true;
	} else {
		msg.innerHTML = "우편번호는 숫자로 입력하세요";
		msg.style.color = "red";
	} 
}

let onkeydown_Addr1 = (e) => {
	let char_ASCII = event.keyCode;
	//console.log(char_ASCII)
	let target = e.currentTarget;
	if(char_ASCII === 8 && target.value.search("-")){
		target.value = target.value.replace("-", "");
	}
}

let onkeyEvent_Addr2 = (e) => {
	let msg = search_msg("msg_userAddr2");
	let target = e.currentTarget; // 이벤트 발생 주체
	
	if(target.value.length >= 50) {
		cutString(target, 50);
		msg.innerHTML = "50글자까지 입력이 가능합니다.";
		msg.style.color = "red";
	} else {
		msg.innerHTML = ""
	}
}

let onkeyEvent_company = (e) => {
	let msg = search_msg("msg_userCompany");
	let target = e.currentTarget; // 이벤트 발생 주체
	if(target.value.length >= 20) {
		cutString(target, 20);
		msg.innerHTML = "20글자까지 입력이 가능합니다.";
		msg.style.color = "red";
	} else {
		msg.innerHTML = ""
	}
}


/* 이벤트 적용 */
document.addEventListener("DOMContentLoaded", () => {
	let id = document.querySelector("input[name='userId']");
	id.addEventListener("keyup", onkeyEvent_Id);
});

document.addEventListener("DOMContentLoaded", () => {
	let name = document.querySelector("input[name='userName']");
	name.addEventListener("keyup", onkeyEvent_name);
});

document.addEventListener("DOMContentLoaded", () => {
	let pw = document.querySelector("input[name='userPw']");
	let pw_chk = document.querySelector("input[id='userPw_chk']");
	pw.addEventListener("keyup", pwChk);
	pw_chk.addEventListener("keyup", onkeyEvent_pwChk);
});

document.addEventListener("DOMContentLoaded", () => {
	let phone2 = document.querySelector("input[name='userPhone2']");
	let phone3 = document.querySelector("input[name='userPhone3']");
	phone2.addEventListener("keyup", onkeyEvent_phone);
	phone3.addEventListener("keyup", onkeyEvent_phone);
});

document.addEventListener("DOMContentLoaded", () => {
	let userAddr1 = document.querySelector("input[name='userAddr1']");
	userAddr1.addEventListener("keyup", onkeyEvent_Addr1);
	//userAddr1.addEventListener("keypress", onkeyprassEvent_Addr1);
	//userAddr1.addEventListener("keydown", onkeydown_Addr1);
});

document.addEventListener("DOMContentLoaded", () => {
	let userAddr2 = document.querySelector("input[name='userAddr2']");
	userAddr2.addEventListener("keyup", onkeyEvent_Addr2);
	userAddr2.addEventListener("onchange", onkeyEvent_Addr2);
});

document.addEventListener("DOMContentLoaded", () => {
	let userCompany = document.querySelector("input[name='userCompany']");
	userCompany.addEventListener("keyup", onkeyEvent_company);
	userCompany.addEventListener("onchange", onkeyEvent_company);
});




/* id중복 체크 */
function idChk(){
	let userId = document.getElementById("userId")
	if(userId.value === "" || userId.value === null || userId.value === undefined){
		alert("경고 : id를 먼저 입력하세요!")
		chk01 = false;
		return false;
	} else {
		let param = {userId: userId.value}
		Util_ajax_payload("/user/userIdCheck.do", "text", param, (data) => {
			let msg = search_msg("msg_id");
	    	if(data === "true"){
	    		msg.style.color = "blue";
	    		msg.innerHTML="사용가능 한 ID입니다.";
	    		chk01 = true;
	    		document.querySelector("input[name='userPw']").focus();
	    	} else {
	    		msg.style.color = "red";
	    		msg.innerHTML="중복된 ID입니다.";
	    		chk01 = false;
	    		//userId.value = "";
	    		userId.focus();
	    	}
		});
	}
}

function pwChk(){
	let pw = document.getElementsByName("userPw")[0]
	let msg = search_msg("msg_pw");

	if(pw.value.length < 6){
		msg.innerHTML="pw는 6 ~ 12자리로 입력하세요."
		msg.style.color = "red"
		chk02 = false;
	} else if(pw.value === "") {
		msg.innerHTML=""
		chk02 = false;
	} else {
		msg.innerHTML=""
		chk02 = true;
	}
	//pwChk_eq()
	onkeyEvent_pwChk()
}

function phoneChk(target){
	let msg_post = search_msg("msg_phone1");
	let msg_back = search_msg("msg_phone2");
	let regexp = /^\d{4}$/;  // 연속된 4자리 숫자
	console.log(target.value);
	if(target.name === "userPhone2"){
		if(!regexp.test(target.value)){
			if(msg_back.innerHTML === ""){
				msg_post.innerHTML="앞자리 번호를 4자리 숫자로 입력하세요"
				msg_post.style.color = "red";
			} else {
				msg_post.innerHTML="앞자리 번호를 4자리 숫자로 입력하세요 <br/>"
			}
			chk04 = false;
		} else {
			msg_post.innerHTML = "";
			chk04 = true;
		}
	} else if (target.name === "userPhone3"){
		if(!regexp.test(target.value)){
			if(msg_post.innerHTML === ""){
				msg_back.innerHTML="뒷자리 번호를 4자리 숫자로 입력하세요"
			} else {
				msg_back.innerHTML="<br/>뒷자리 번호를 4자리 숫자로 입력하세요"
			}
			msg_back.style.color = "red";
			chk05 = false;
		} else {
			msg_back.innerHTML = "";
			chk05 = true;
		}
	} 
}

function postNoChk(target){
	let msg =  search_msg("msg_postNo");
	//let regexp = /^\d{3}-\d{3}$/;
	let regexp = /^\d{6}/;
	
	if(target.value === "" || target.value === undefined ){
		msg.innerHTML = "";
		chk06 = true;
	} else if(!regexp.test(target.value)){
		msg.innerHTML = "우편번호는 6자리 숫자로 입력하세요"
		msg.style.color = "red";
		chk06 = false;
	} else {
		msg.innerHTML = "";
		chk06 = true;
	}
	
	if(target.value.length >= 6) {
		let text = target.value 
		target.value = text.substring(0,3) + "-" + text.substring(3, text.length);
		cutString(target, 7);
	} 
}


function confirm(){
	let userId = document.getElementById("userId");
	let pw = document.getElementsByName("userPw")[0];
	let pw_chk = document.getElementById("userPw_chk");
	let name = document.getElementsByName("userName")[0];
	let phone2 = document.getElementsByName("userPhone2")[0];
	let phone3 = document.getElementsByName("userPhone3")[0];
	let userAddr1 = document.getElementsByName("userAddr1")[0];
	let userAddr2 = document.getElementsByName("userAddr2")[0];
	let userCompany = document.getElementsByName("userCompany")[0];
	
	if(userId.value === "" || userId.value === undefined){
		alert("id는 필수 입니다. 입력해주세요");
		userId.focus();
		return false;
	} 
	if(pw.value === "" || pw.value === undefined){
		alert("pw는 필수 입니다. 입력해주세요");
		pw.focus();
		return false;
	} 
	if(pw_chk.value === "" || pw_chk.value === undefined){
		alert("pw check는 필수 입니다. 입력해주세요");
		pw_chk.focus();
		return false;
	} 
	if(name.value === "" || name.value === undefined) {
		alert("이름을 입력해 주세요");
		name.focus();
		return false;
	}
	if(phone2.value === "" || phone2.value === undefined) {
		alert("휴대폰 번호 앞자리를 입력해주세요 .");
		phone2.focus();
		return false;
	}
	if(phone3.value === "" || phone3.value === undefined){
		alert("휴대폰 번호 뒷자리를 입력해주세요 .");
		phone3.focus();
		return false;
	} 
	
	if(userAddr2.value !== "" && userAddr2.value.length >= 50){
		alert("주소는 50글자를 초과할 수 없습니다.");
		return false;
	} 
	
	if(userCompany.value !== "" && userCompany.value.length >= 20){
		alert("회사명은 20글자를 초과할 수 없습니다.");
		return false;
	} 
	
	

	if(chk01 && chk02 && chk03 && chk04 && chk05 && chk06){
		let param = getFormDateToJson();
		// let param = {};
		let selectBox = document.getElementsByTagName("select")[0]
		param[selectBox.name] = selectBox.options[selectBox.selectedIndex].value;
		console.log(param);
		// 전송
		Util_ajax_payload("/user/userJoinAction.do","text",param, (data) => {
			if(data == "true"){
				alert("성공적으로 가입을 완료했습니다. 로그인후에 이용해 주세요 :)")
				location.href="userLogin.do";
				return false;
			} else {
				alert("가입에 실패했습니다. 관리자에게 문의하세요.")
				return false;
			}
		})
		return false;
	}
	if(chk01 === false){
		alert("id 중복확인을 해주세요.");
		userId.focus();
		return false;
	} 
	if(chk02 === false){
		alert("pw를 확인하세요");
		pw.focus();
		return false;
	}
	if(chk03 === false){
		alert("pw check를 확인하세요")
		pw_chk.focus();
		return false;
	}
	if(chk04 === false){
		alert("전화번호 앞자리를 확인하세요.");
		phone2.focus();
		return false;
	}
	if(chk05 === false){
		alert("전화번호 뒷자리를 확인하세요.");
		phone3.focus();
		return false;
	}
	if(chk06 === false){
		alert("postNo를 확인하세요.");
		userAddr1.focus();
		return false;
	}
	return false;
}





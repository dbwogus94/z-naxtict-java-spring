let chk01 = false;  // id
let chk02 = false;  // pw
let chk03 = false;  // 앞 번호
let chk04 = false;  // 뒷 번호

function Util_ajax_payload(url, dataType, param, callback){
	dataType = dataType || "text";
	param = param || {}
	$j.ajax({
	    url : url,
	    dataType: dataType,
	    type: "POST",
	    contentType : 'application/json',
	    data : JSON.stringify(param), //JSON.stringify(param)
	    success: function(data)
	    {
	    	console.log("data : " + data)
	    	callback(data)
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	    	alert("실패");
	    }
	});
}

function idChk(){
	let userId = document.getElementById("userId")
	if(userId.value === "" || userId.value === null || userId.value === undefined){
		alert("경고 : id를 먼저 입력하세요!")
		return false;
	} else {
		let param = {userId: userId.value}
		Util_ajax_payload("/user/userIdCheck.do", "text", param, (data) => {
			let msg = document.getElementsByClassName("msg")[0]
	    	if(data === "true"){
	    		msg.style.color = "blue";
	    		msg.innerHTML="사용가능 한 ID입니다.";
	    		chk01 = true;
	    	} else {
	    		msg.style.color = "red";
	    		msg.innerHTML="중복된 ID입니다.";
	    		chk01 = false;
	    		userId.value = "";
	    		userId.focus();
	    	}
		});
	}
}

function pwChk(){
	let pw = document.getElementsByName("userPw")[0].value
	let msg = document.getElementsByClassName("msg")[1]
	if(pw.length < 6){
		msg.innerHTML="pw는 6 ~ 12자리로 입력하세요."
		msg.style.color = "red"
	} else {
		msg.innerHTML=""
	}
}

function pwChk_eq(){
	let pw = document.getElementsByName("userPw")[0]
	let pw_chk = document.getElementById("userPw_chk")
	let msg = document.getElementsByClassName("msg")[2]
	
	if(pw_chk.value.length >= 6){
		if(pw.value === pw_chk.value){
			msg.innerHTML="pw가 일치 합니다."
			msg.style.color = "blue"
			chk02 = true;
		} else {
			msg.innerHTML="pw가 일치 하지 않습니다."
			msg.style.color = "red"
			pw_chk.focus();
			chk02 = false;
		}
	} else {
		msg.innerHTML="pw check를 6 ~ 12자리로 입력하세요."
		msg.style.color = "red"
	}
}

function phoneChk(target){
	let msg = document.getElementsByClassName("msg")
	let regexp = /^\d{4}/;  //
	
	if(target.name === "userPhone2"){
		if(!regexp.test(target.value)){ //
			msg[3].innerHTML="앞자리 번호를 4자리 숫자로 입력하세요"
			msg[3].style.color = "red";
			chk03 = false;
		} else {
			msg[3].innerHTML = "";
			chk03 = true;
		}
	} else {
		if(!regexp.test(target.value)){ //
			if(msg[3].innerHTML === ""){
				msg[4].innerHTML="뒷자리 번호를 4자리 숫자로 입력하세요"
			} else {
				msg[4].innerHTML="<br/>뒷자리 번호를 4자리 숫자로 입력하세요"
			}
			msg[4].style.color = "red";
			chk04 = false;
		} else {
			msg[4].innerHTML = "";
			chk04 = true;
		}
	}
}


function postNoChk(target){
	let msg = document.getElementsByClassName("msg")[5]
	let regexp = /^\d{3}-\d{3}$/;
	if(!regexp.test(target.value)){
		msg.innerHTML = "우편번호는 숫자 형식으로 입력하세요. ex) 123-123"
		msg.style.color = "red";
	} else {
		msg.innerHTML = "";
	}
}




function confirm(){
	let userId = document.getElementById("userId");
	let pw = document.getElementsByName("userPw")[0];
	let pw_chk = document.getElementById("userPw_chk");
	let name = document.getElementsByName("userName")[0];
	let phone2 = document.getElementsByName("userPhone2")[0];
	let phone3 = document.getElementsByName("userPhone3")[0];
	
	if(userId.value === "" || userId.value === undefined){
		alert("id는 필수 입니다. 입력해주세요");
		userId.focus();
		return false;
	} else if(pw.value === "" || pw.value === undefined){
		alert("pw는 필수 입니다. 입력해주세요");
		pw.focus();
		return false;
	} else if(pw_chk.value === "" || pw_chk.value === undefined){
		alert("pw check는 필수 입니다. 입력해주세요");
		pw_chk.focus();
		return false;
	} else if(name.value === "" || name.value === undefined) {
		alert("이름을 입력해 주세요");
		name.focus();
		return false;
	} else if(phone2.value === "" || phone2.value === undefined) {
		alert("휴대폰 번호 앞자리를 입력해주세요 .");
		phone2.focus();
		return false;
	} else if(phone3.value === "" || phone3.value === undefined){
		alert("휴대폰 번호 뒷자리를 입력해주세요 .");
		phone3.focus();
		return false;
	} else {
		if(chk01 && chk02 && chk03 && chk04){
			let param = getFormDateToJson();
			//let param = {};
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
		} else {
			alert("가입조건을 충족하지 못했습니다. 확인해주세요")
			return false;
		}
	}
	return false;
}


//form태그의 데이터 json에 넣기
function getFormDateToJson(){
	let form = document.getElementsByTagName("form")[0]
	let inputArr = form.getElementsByTagName("input")
	let json = {};
	for(input of inputArr){
		if(input.name !== ""){
			json[input.name] = input.value
		}
	}
	return json;
}




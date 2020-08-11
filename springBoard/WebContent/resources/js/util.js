function Util_ajax_payload(url, dataType, param, callback){
	dataType = dataType || "text";
	param = param || {}
	$j.ajax({
	    url : url,
	    dataType: dataType,
	    type: "POST",
	    contentType : 'application/json',
	    data : JSON.stringify(param), // JSON.stringify(param)
	    success: function(data)
	    {
	    	console.log("data : " + data)
	    	callback(data)
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	    	alert("실패");
	    	return false;
	    }
	});
}

// form태그의 데이터 json에 넣기
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


function check_key() {
	var char_ASCII = event.keyCode;
	                
	 // 숫자
	if (char_ASCII >= 48 && char_ASCII <= 57 ) {
		return 1;
	 // 영어
	} else if ((char_ASCII>=65 && char_ASCII<=90) || (char_ASCII>=97 && char_ASCII<=122)) {
		return 2;
	 // 특수기호
	} else if ((char_ASCII>=33 && char_ASCII<=47) || (char_ASCII>=58 && char_ASCII<=64) 
	   || (char_ASCII>=91 && char_ASCII<=96) || (char_ASCII>=123 && char_ASCII<=126)) {
		return 4;
	 // 한글
	} else if ((char_ASCII >= 12592) || (char_ASCII <= 12687)){
		return 3;
	} else {
		return 0;
	}
}

// 텍스트 박스에 숫자와 영문만 입력할수있도록
function nonHangulSpecialKey() {
	if(check_key() != 1 && check_key() != 2) {
		event.returnValue = false;  
		alert("숫자나 영문자만 입력하세요!");
		return;
	}
}

	 
// 텍스트 박스에 숫자만 입력할수 있도록
function numberKey() {

	if(check_key() != 1 ) {
		event.returnValue = false;  
		alert("숫자만 입력할 수 있습니다.");
		return;
	}
}


// keyup: 전화번호 입력 자동, 우편번호 자동입력
var autoHypenPhone = function(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if( str.length < 4){
        return str;
    }else if(str.length < 7){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else if(str.length < 11){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }else{              
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
    }

    return str;
}


//var phoneNum = document.getElementById('phoneNum');
//
//phoneNum.onkeyup = function(){
//console.log(this.value);
//this.value = autoHypenPhone( this.value ) ;  
//}


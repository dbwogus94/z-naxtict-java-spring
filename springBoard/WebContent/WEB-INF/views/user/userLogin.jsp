<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<script src="/resources/js/userJoin.js"></script>
<script type="text/javascript">

function login(){
	var id = document.getElementsByName("userId")[0].value
	var pw = document.getElementsByName("userPw")[0].value
	
	if(id === "" || id === undefined || pw === "" || pw === undefined){
		alert("경고! 아이디 비밀번로를  모두 입력하세요")
	} else{
		var json= getFormDateToJson();
		Util_ajax_payload("userLoginAction.do","text", json, function(data){
			if(data == "success"){
				alert("로그인 성공 ! 환영합니다.");
				location.href="../board/boardList.do"
			} else {
				alert("로그인 실패!");
			}
		})
	}
}
function enterkey() {
    if (window.event.keyCode == 13) {
         login();
    }
}


</script>

<body>
<div style="text-align: center;">
	<h1>로그인 페이지</h1>
	<form action="">
		<table align="center">
			<tr>
				<th>ID</th>
				<td><input type="text" name="userId"/></td>
			</tr>
			
			<tr>
				<th>PW</th>
				<td><input type="password" name="userPw"/></td>
			</tr>
			
			<tr>
				<td></td>
				<td align="right">
					<input type="button" value="login" onclick="login();" onkeypress="enterkey();"/>
					<input type="button" value="join" onclick="location.href='userJoin.do'"/>
				</td>
				
			</tr>
			
			<tr>
				<td colspan="2" align="left" id="loginChk">
			</td>
		</table>
	</form>
</div>
</body>
</html>
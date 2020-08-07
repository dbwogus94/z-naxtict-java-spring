<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<script src="/resources/js/util.js"></script>
<script src="/resources/js/user/userLogin.js"></script>
<body>
<div style="text-align: center;">
	<h1>로그인 페이지</h1>
	<form action="">
		<table align="center">
			<tr>
				<th>ID</th>
				<td>
					<input type="text" name="userId"/>
					<br/>
					<span class="msg" id="msg_id"></span>
				</td>
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
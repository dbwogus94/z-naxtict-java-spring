<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<style type="text/css">
	.msg{
		font-size: 8pt;
	}
	
	a:hover{
		color: #ff0088;
		text-decoration: underline;
	}
</style>
<script src="/resources/js/util.js"></script>
<script src="/resources/js/user/userJoin.js"></script>
<body>
<form action="" method="post">
	<table align="center" width="400">
		<tr>
			<td align="left"><a href="/board/boardList.do">List</a></td>
		</tr>
		<tr>
			<td>
				<table border="1" width="400">
					<tr>
						<td width="90" align="center">
							id
						</td>
						<td>
							<input type="text" id="userId" name="userId" size="15" /> 
							<input type="button" value="중복확인" onclick="idChk()" />
							<br/>
							<span class="msg" id="msg_id"></span>
						</td>
					</tr>
					<tr>
						<td align="center">
							pw
						</td>
						<td>
							<input type="password" name="userPw" size="18"  maxlength="12" onchange="pwChk();"/>
							<br/>
							<span class="msg" id="msg_pw"></span>
						</td>
					</tr>
					<tr>
						<td align="center">
							pw check
						</td>
						<td>
							<input type="password" id="userPw_chk" size="18" maxlength="12" onchange=""/>
							<br/>
							<span class="msg" id="msg_pwChk"></span>
						</td>
					</tr>
					<tr>
						<td align="center"> 
							name
						</td> 
						<td>
							<input type="text" name="userName" size="20"/>
							<br/>
							<span class="msg" id="msg_name"></span>
						</td>
					</tr>
					<tr>
						<td align="center">
							phone
						</td>
						<td>
							<select name="userPhone1">
								<c:forEach items="${comCodeList}" var="comCodeVo">
									<option value="${comCodeVo.codeId }">${comCodeVo.codeName }</option>
								</c:forEach>
							</select>-<input type="text" name="userPhone2" size="2" maxlength="4" onchange="phoneChk(this);"/>-<input type="text" name="userPhone3" size="2" maxlength="4" onchange="phoneChk(this);"/>
							<br/>
							<span class="msg"  id="msg_phone1"></span>
							<span class="msg" id="msg_phone2"></span>
						</td>
					</tr>
					<tr>
						<td align="center">
							postNo
						</td>
						<td>
							<input type="text" name="userAddr1" maxlength="7" size="20"/>
							<br/>
							<span class="msg" id="msg_postNo"></span>
						</td>
					</tr>
					<tr>
						<td align="center">
							address
						</td>
						<td>
							<input type="text" name="userAddr2" size="20" />
							<br/>
							<span class="msg" id="msg_userAddr2"></span>
						</td>
					</tr>
					<tr>
						<td align="center">
							company
						</td>
						<td>
							<input type="text" name="userCompany" size="20" />
							<br/>
							<span class="msg" id="msg_userCompany"></span>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td align="right">
				<a  style="cursor:default" onclick="return confirm()">join</a>
			</td>
		</tr>
	</table>
</form>
</body>
</html>
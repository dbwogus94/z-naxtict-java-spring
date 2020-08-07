<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp"%>    

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>boardWrite</title>
</head>

<script src="/resources/js/board/boardWrite.js"></script>
<body>
<form class="boardWrite">
	<input name="creator" type="hidden" size="50" value="${login.userId}"/>
	<table align="center">
		<tr>
			<td align="right">
				<input id="button" type="button" value="행추가" onclick="addTable();">
				<input id="button" type="button" value="행삭제" onclick="removeTable();">
				<input id="submit" type="button" value="작성">
			</td>
		</tr>
		<tr>
			<td>
				<table border ="1" class="table" width="550">
					<tr>
						<td align="center">
							Type
						</td>
						<td>
							<select name="boardType">
								<c:forEach items="${comCodeList}" var="comCodeVo">
									<option value="${comCodeVo.codeId }" >${comCodeVo.codeName }</option>
								</c:forEach>
							</select>		
						</td>
					</tr>
					<tr>
						<td width="120" align="center">
							Title
						</td>
						<td width="400">
							<input name="boardTitle" class="boardTitle" type="text" size="50" value="${board.boardTitle}"> 
						</td>
					</tr>
					<tr>
						<td height="300" align="center">
							Comment
						</td>
						<td valign="top">
							<textarea name="boardComment" class="boardComment" rows="20" cols="55">${board.boardComment}</textarea>
						</td>
					</tr>
					<tr>
						<td align="center">
								Writer
						</td>
						<td>
							<c:choose>
								<c:when test="${empty login}">
									Writer
								</c:when>
								<c:otherwise>
									&nbsp;${login.userName}
								</c:otherwise>
							</c:choose>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td align="right">
				<a href="/board/boardList.do">List</a>
			</td>
		</tr>
	</table>
	
</form>	
</body>
</html>
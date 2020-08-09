<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>list</title>
</head>
<script src="/resources/js/board/boardList.js"></script>
<body>
<table  align="center">
	<tr>
		<td colspan="2">
			<span style="margin-right: 68%;">
			<c:choose>
				<c:when test="${empty login}">
					<a href="/user/userLogin.do">login</a>
					<a href="/user/userJoin.do">join</a>
				</c:when>
				<c:otherwise>
					${login.userName }
				</c:otherwise>
			</c:choose>
			</span>
			<span style="text-align: right;">total : ${totalCnt}</span>
		</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>
			<table id="boardTable" border = "1">
				<tr>
					<td width="80" align="center">
						Type
					</td>
					<td width="40" align="center">
						No
					</td>
					<td width="300" align="center">
						Title
					</td>
				</tr>
				<c:forEach items="${boardList}" var="list">					
					<tr>
						<td align="center">
							<c:forEach items="${comCodeList}" var="comCodeVo">
								<c:if test="${list.boardType eq comCodeVo.codeId }">
									${comCodeVo.codeName }
								</c:if>
							</c:forEach>
						</td>
						<td>
							${list.boardNum}
						</td>
						<td>
							<a href = "/board/${list.boardType}/${list.boardNum}/boardView.do?pageNo=${pageNo}">${list.boardTitle}</a>
						</td>
					</tr>	
				</c:forEach>
			</table>
		</td>
	</tr>
	<tr>
		<td align="right">
			<a href ="/board/boardWrite.do">글쓰기</a>
			<c:choose>
				<c:when test="${empty login}">
				</c:when>
				<c:otherwise>
					<a href="/user/userLogout.do">로그아웃</a>
				</c:otherwise>
			</c:choose>
		</td>
	</tr> 
	<tr>
		<td align="left">
			<input type="checkbox" id="all" onclick="checkAll(this.checked)" />전체&nbsp;
			<c:forEach items="${comCodeList}" var="comCodeVo">
				<input type="checkbox" name="boardTypeArr" value="${comCodeVo.codeId }" />${comCodeVo.codeName }&nbsp;
			</c:forEach>
			<input type="button" value="조회" onclick="search();"/>
		</td>
	</tr> 
</table>	


	
</body>
</html>
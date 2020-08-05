<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>list</title>
</head>
<script type="text/javascript">

	document.addEventListener("DOMContentLoaded", function () {
	    //  == $(document).ready(function() {}
		var chk = document.querySelectorAll("input[name='boardTypeArr']");
	    for (var i = 0; i < chk.length; i++) {
	    	chk[i].addEventListener("click", function () {
	        	var chk = document.querySelectorAll("input[name='boardTypeArr']");
	        	var chked = document.querySelectorAll("input[name='boardTypeArr']:checked");
	        	var all_chk = document.getElementById("all");
	        	if (chk.length == chked.length) {
	          		all_chk.checked = true;
	        	} else {
	          		all_chk.checked = false;
	        	}
	      	});
	    }
	});

	function checkAll(ischk) {
		var chk = document.querySelectorAll("input[name='boardTypeArr']");
		for (var i = 0; i < chk.length; i++) {
			chk[i].checked = ischk;
		}
	}

</script>
<body>
<form action="/board/boardList.do" method="get">
<table  align="center">
	<tr>
		<td align="right">
			total : ${totalCnt}
		</td>
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
		</td>
	</tr> 
	<tr>
		<td align="left">
			<input type="checkbox" id="all" onclick="checkAll(this.checked)" />전체&nbsp;
			<c:forEach items="${comCodeList}" var="comCodeVo">
				<input type="checkbox" name="boardTypeArr" value="${comCodeVo.codeId }" />${comCodeVo.codeName }&nbsp;
			</c:forEach>
			<input type="submit" value="조회"/>
		</td>
	</tr> 
</table>	
</form>


	
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp"%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>boardView</title>
</head>
<script type="text/javascript">

function boardDelete(boardType, boardNum){
	let param = {boardType: boardType, boardNum: boardNum}
	$j.ajax({
	    url : "/board/boardDelete.do",
	    dataType: "json",
	    type: "POST",
	    contentType : 'application/json',
	    data : JSON.stringify(param),
	    success: function(data, textStatus, jqXHR)
	    {
			if(data.res > 0){
				alert("삭제완료");
				alert("메세지: 게시물을 성공적으로 삭제했습니다.");
				location.href="/board/boardList.do"
			} else {
				alert("메세지: 게시물 삭제를  실패했습니다. 관리자에게 문의하세요.")
			}
			return false
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	    	alert("실패");
	    }
	});
	return false;
}

</script>
<body>
<table align="center">
	<tr>
		<td>
			<table border ="1">
				<tr>
					<td width="120" align="center">
					Title
					</td>
					<td width="400">
					${board.boardTitle}
					</td>
				</tr>
				<tr>
					<td height="300" align="center">
					Comment
					</td>
					<td>
					${board.boardComment}
					</td>
				</tr>
				<tr>
					<td align="center">
					Writer
					</td>
					<td>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td align="right">
			<a href="/board/boardUpdate.do?boardType=${board.boardType}&boardNum=${board.boardNum}">update</a>
			<a href="" onclick="return boardDelete('${board.boardType}', ${board.boardNum})">delete</a>
			<a href="/board/boardList.do">List</a>
		</td>
	</tr>
</table>	
</body>
</html>
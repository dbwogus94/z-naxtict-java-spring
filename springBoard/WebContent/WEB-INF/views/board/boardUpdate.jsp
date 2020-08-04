<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp"%>   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<script type="text/javascript">

function boardUpdate(boardType, boardNum, boardTitle, boardComment){
	var param = {boardType: boardType, boardNum: boardNum, boardTitle: boardTitle, boardComment: boardComment}
	$j.ajax({
	    url : "/board/boardUpdateAction.do",
	    dataType: "json",
	    type: "POST",
	    contentType : 'application/json',
	    data : JSON.stringify(param), //JSON.stringify(param)
	    success: function(data, textStatus, jqXHR)
	    {
			if(data.res > 0){
				alert("수정완료");
				alert("메세지: 게시물을 성공적으로 수정했습니다.");
				location.href="/board/boardList.do"
			} else {
				alert("메세지: 게시물 수정을  실패했습니다. 관리자에게 문의하세요.");
				location.href="/board/boardList.do"
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
	<input type="hidden" name="boardNum" value="${board.boardNum }"/>
	<table align="center">
	<tr>
		<td>
			<table border ="1">
				<tr>
					<td align="center">
						Type
					</td>
					<td>
						<select name="boardType" class="boardWrite">
							<option value="일반" ${board.boardType eq 'a01'? "selected":""}>일반</option>
							<option value="Q&A" ${board.boardType eq 'a02'? "selected":""}>Q&A</option>
							<option value="익명" ${board.boardType eq 'a03'? "selected":""}>익명</option>
							<option value="자유" ${board.boardType eq 'a04'? "selected":""}>자유</option>
						</select>		
					</td>
				</tr>
				<tr>
					<td width="120" align="center">
						Title
					</td>
					<td width="400">
						<input name="boardTitle" type="text" size="50" class="boardWrite" value="${board.boardTitle}">
						<input type="button" value="수정" onclick="boardUpdate('${board.boardType}', ${board.boardNum}, '${board.boardTitle}', '${board.boardComment}')"> 
					</td>
				</tr>
				<tr>
					<td height="300" align="center">
						Comment
					</td>
					<td>
						<textarea name="boardComment" class="boardWrite" rows="20" cols="55">${board.boardComment}</textarea>
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
			<a href="/board/boardList.do">List</a>
		</td>
	</tr>
</table>	
</body>
</html>
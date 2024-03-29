<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp"%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>boardWrite</title>
</head>
<script type="text/javascript">

	$j(document).ready(function(){
		
		$j("#submit").on("click",function(){
			var $frm = $j('.boardWrite :input'); 	// 클래스명이 .boardWrite인 input태그(textarea 포함) 가져오기 >> 배열 
			var param = $frm.serialize();			// 직열화 쿼리스트링으로 만들어준다.
			
			$j.ajax({
			    url : "/board/boardWriteAction.do",
			    dataType: "json",
			    type: "POST",
			    data : param,			// post방식에 사용할 쿼리스트링
			    success: function(data, textStatus, jqXHR)
			    {
					alert("작성완료");
					
					alert("메세지:"+data.success);
					
					location.href = "/board/boardList.do?pageNo=1";
			    },
			    error: function (jqXHR, textStatus, errorThrown)
			    {
			    	alert("실패");
			    }
			});
		});
	});

</script>
<body>
<form class="boardWrite">
	<table align="center">
		<tr>
			<td align="right">
				<input id="submit" type="button" value="작성">
			</td>
		</tr>
		<tr>
			<td>
				<table border ="1">
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
							<input name="boardTitle" type="text" size="50" value="${board.boardTitle}"> 
						</td>
					</tr>
					<tr>
						<td height="300" align="center">
							Comment
						</td>
						<td valign="top">
							<textarea name="boardComment"  rows="20" cols="55">${board.boardComment}</textarea>
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
</form>	
</body>
</html>
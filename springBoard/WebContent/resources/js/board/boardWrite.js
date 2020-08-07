$j(document).ready(function(){
	$j("#submit").on("click",function(){
		if($j(".boardTitle").val() === "" || $j(".boardTitle").val() === undefined ){
			alert("제목을 작성하세요");
			return false;
		} else if($j(".boardComment").val() === "" || $j(".boardComment").val() === undefined){
			alert("내용을 작성하세요");
			return false;
		}
		
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
				alert("메세지: "+data.success);
				location.href = "/board/boardList.do?pageNo=1";
		    },
		    error: function (jqXHR, textStatus, errorThrown)
		    {
		    	alert("실패");
		    }
		});
	});	
});

function addTable(){
	var lastTable = $j(".table").last();
	var cloneElements = $j(lastTable).clone(false);
	lastTable.append("<br>");
	lastTable.after(cloneElements);
}

function removeTable(){
	var lastTable = $j(".table")
	if(lastTable.length > 1){
		lastTable.last().remove()
	}
}



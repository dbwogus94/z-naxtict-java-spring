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
		var param = $frm.serialize();			// 직렬화 쿼리스트링으로 만들어준다.
		
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

// .append() : 자식요소로 추가
// .after() : 형제요소로 추가
function addTable(){
	var mainTrs = $j(".mainTable > tbody > tr");
	var targetTable = mainTrs.eq(1);
	var cloneElements = $j(targetTable).clone(false);
	
	cloneElements.find("input[name='boardTitle']").val("");
	cloneElements.find("textarea[name='boardComment']").val("");
	
	mainTrs.eq(mainTrs.length-2).after(cloneElements);
	mainTrs.eq(mainTrs.length-2).after('<tr><td align="right"><input type="button" class="btn_delete" value="행삭제" onclick="removeTable();"></td></tr>');	
	//mainTrs.eq(mainTrs.length-2).after('<br/>');
}

function removeTable(){
	var target = event.target;
	var btn_delete_dom = document.getElementsByClassName("btn_delete")
	var btn_delete = $j(".btn_delete");
	var table = $j(".table");
	for(var i = 0; i < btn_delete_dom.length; i++){
		if(target == btn_delete_dom[i]){
			btn_delete.eq(i).remove();
			table.eq(i+1).remove();
			return;
		}
	}
	
//	var target = $j(event.target);	// == event.target;
//	var btn_delete = $j(".btn_delete");
//	var table = $j(".table");
//	
//	console.log(target);
//	console.log(btn_delete);
//	for(var i = 0; i < btn_delete.length; i++){
//		console.log(target == btn_delete.eq(i))
//		if(btn_delete.eq(i) === target){
//			btn_delete.eq(i).remove();
//			table.eq(i+1).remove();
//		}
//	}

}




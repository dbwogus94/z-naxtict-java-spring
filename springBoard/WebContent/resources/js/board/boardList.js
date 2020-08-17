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


function search(){

	var url = "/board/boardSearch.do";
	var $chk = $j('input[name="boardTypeArr"]'); 	// 클래스명이 .boardWrite인 input태그(textarea 포함) 가져오기 >> 배열 
	
	if($j('input[name="boardTypeArr"]:checked').length < 1){
		alert("하나이상 체크 해주세요!")
		return false;
	}
	
	var param = $chk.serialize();			// 직열화 쿼리스트링으로 만들어준다.
	
	$j.ajax({
	    url : url,
	    dataType: "json",
	    type: "get",
	    data : param,			// post방식에 사용할 쿼리스트링
	    success: function(data, textStatus, jqXHR)
	    {
	    	console.log(data)
	    	// 첫째줄 제외한 행 모두 삭제
	    	var mainTrs = $j('#boardTable tr:not(:first)').remove();
	    	if(data.boardList == undefined){
	    		return false;
	    	}
	    	
	    	for(var i = 0; i<data.boardList.length; i++){
	    		var boardVo = data.boardList[i];
	    		var comCodeList = data.comCodeList;
	    		for(var j = 0; j < comCodeList.length; j++){
	    			if(comCodeList[j].codeId === boardVo.boardType){
	    				$j('#boardTable > tbody:last')
			    		.append(`<tr>
			    					<td align="center">
			    						${comCodeList[j].codeName}
			    					</td>
				    				<td align="center">
				    					${boardVo.boardNum}
				    				</td>
				    				<td>
				    					<a href = "/board/${boardVo.boardType}/${boardVo.boardNum}/boardView.do?pageNo=${data.pageVo.pageNo}">${boardVo.boardTitle}</a>
				    				</td>
			    				</tr>`);
	    				$j("#total").text("total : " + data.totalCnt)
	    				break;
	    			}
	    		}
	    	}
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	    	alert("실패");
	    }
	});
}

function search_html(){
	var url = "/board/boardSearch_html.do";
	var $chk = $j('input[name="boardTypeArr"]'); 	// 클래스명이 .boardWrite인 input태그(textarea 포함) 가져오기 >> 배열 
	
	if($j('input[name="boardTypeArr"]:checked').length < 1){
		alert("하나이상 체크 해주세요!")
		return false;
	}
	
	var param = $chk.serialize();			// 직열화 쿼리스트링으로 만들어준다.
	
	$j.ajax({
	    url : url,
	    dataType: "html",
	    type: "get",
	    data : param,			// post방식에 사용할 쿼리스트링
	    success: function(data, textStatus, jqXHR)
	    {
	    	console.log(data)
	    	
	    	document.getElementsByTagName("body")[0].innerHTML = data;
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	    	alert("실패");
	    }
	});
}
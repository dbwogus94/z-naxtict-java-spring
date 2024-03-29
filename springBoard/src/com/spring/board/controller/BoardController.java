package com.spring.board.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.board.service.ComCodeService;
import com.spring.board.service.boardService;
import com.spring.board.vo.BoardVo;
import com.spring.board.vo.ComCodeVo;
import com.spring.board.vo.PageVo;
import com.spring.common.CommonUtil;

@Controller
public class BoardController {
	
	@Autowired 
	private boardService boardService;
	
	@Autowired
	private ComCodeService comCodeService;
	
	
	
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	@RequestMapping(value = "/board/boardList.do", method = RequestMethod.GET)
	public String boardList(Locale locale, Model model,PageVo pageVo, @RequestParam(value = "boardTypeArr", required = false) String[] boardTypeArr ) throws Exception{
		logger.info("[boardList.do] 글 조회 ==> 페이지 : " + pageVo + " 필터 내용 : " + Arrays.toString(boardTypeArr));
		List<BoardVo> boardList = new ArrayList<BoardVo>();
		List<ComCodeVo> comCodeList = new ArrayList<ComCodeVo>();
		
		int page = 1;
		int totalCnt = 0;
		if(pageVo.getPageNo() == 0){
			pageVo.setPageNo(page);
		}
		
		comCodeList = comCodeService.getCode_type("menu");
		if(boardTypeArr == null) {
			boardTypeArr = new String[comCodeList.size()];
			for(int i = 0; i<boardTypeArr.length; i++) {
				boardTypeArr[i] = comCodeList.get(i).getCodeId();
			}
		}
		
		boardList = boardService.SelectBoardList(pageVo, boardTypeArr);
		totalCnt = boardService.selectBoardCnt(boardTypeArr);
		
		model.addAttribute("boardList", boardList);
		model.addAttribute("totalCnt", totalCnt);
		model.addAttribute("pageNo", page);
		model.addAttribute("comCodeList", comCodeList);
		
		return "board/boardList";
	}
	
	@RequestMapping(value = "/board/{boardType}/{boardNum}/boardView.do", method = RequestMethod.GET)
	public String boardView(Locale locale, Model model
			,@PathVariable("boardType")String boardType
			,@PathVariable("boardNum")int boardNum) throws Exception{
		BoardVo boardVo = new BoardVo();
		boardVo = boardService.selectBoard(boardType,boardNum);
		
		model.addAttribute("boardType", boardType);
		model.addAttribute("boardNum", boardNum);
		model.addAttribute("board", boardVo);
		
		return "board/boardView";
	}
	
	@RequestMapping(value = "/board/boardWrite.do", method = RequestMethod.GET)
	public String boardWrite(Locale locale, Model model) throws Exception{
		logger.info("[boardWrite.do] 글 작성 페이지");
		List<ComCodeVo> comCodeList = comCodeService.getCode_type("menu");
		model.addAttribute("comCodeList", comCodeList);
		return "board/boardWrite";
	}
	
	@RequestMapping(value = "/board/boardWriteAction.do", method = RequestMethod.POST)
	@ResponseBody
	public String boardWriteAction(Locale locale, BoardVo boardVo) throws Exception{
		
		HashMap<String, String> result = new HashMap<String, String>();
		CommonUtil commonUtil = new CommonUtil();
		
		int resultCnt = boardService.boardInsert(boardVo);
		
		result.put("success", (resultCnt > 0)?"Y":"N");
		String callbackMsg = commonUtil.getJsonCallBackString(" ",result);
		
		System.out.println("callbackMsg::"+callbackMsg);
		
		return callbackMsg;
	}
	
	@RequestMapping(value="/board/boardUpdate.do", method = RequestMethod.GET)
	public String boardUpdate(Model model, HttpServletResponse response, @RequestParam(value="boardType", defaultValue = "1")String boardType, @RequestParam(value="boardNum", defaultValue = "1")int boardNum) throws Exception {
		logger.info("[boardUpdate.do] 글 수정 페이지 : " + boardType + " : " + boardNum);
		BoardVo boardVo = boardService.selectBoard(boardType, boardNum);
		List<ComCodeVo> comCodeList = comCodeService.getCode_type("menu");
		model.addAttribute("board", boardVo);
		model.addAttribute("comCodeList", comCodeList);
		return "board/boardUpdate";
	}
	
	@RequestMapping(value="/board/boardUpdateAction.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Integer> boardUpdate(@RequestBody BoardVo boardVo) throws Exception {
		logger.info("[boardUpdate.do] 글 수정 실행 : " + boardVo);
		Map<String, Integer> output = new HashMap<String, Integer>();
		int res = boardService.boardUpdate(boardVo);
		output.put("res", res);
		return output;	
	}
	
	@RequestMapping(value="/board/boardDelete.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Integer> boardDelete(@RequestBody BoardVo boardVo) throws Exception {
		logger.info("[boardDelete.do] 글 삭제  : " + boardVo);
		Map<String, Integer> output = new HashMap<String, Integer>();
		int res = boardService.boardDelete(boardVo);
		output.put("res", res);
		return output;
	}
	
}

package com.spring.board.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import com.spring.user.dao.UserDao;
import com.spring.user.vo.UserVo;

@Controller
public class BoardController {
	
	@Autowired 
	private boardService boardService;
	@Autowired
	private ComCodeService comCodeService;
	@Autowired
	private UserDao userDao;
	
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	@RequestMapping(value = "/board/boardList.do", method = RequestMethod.GET)
	public String boardList(Locale locale, Model model, PageVo pageVo) throws Exception{
		logger.info("[boardList.do] 글 리스트 ==> 페이지 : " + pageVo);
		List<BoardVo> boardList = new ArrayList<BoardVo>();
		List<ComCodeVo> comCodeList = new ArrayList<ComCodeVo>();
		int page = 1;
		int totalCnt = 0;
		if(pageVo.getPageNo() == 0){
			pageVo.setPageNo(page);
		}
		// 검색조건 리스트 조회
		comCodeList = comCodeService.getCode_type("menu");
		String[] boardTypeArr = new String[comCodeList.size()];	
		
		for(int i = 0; i<boardTypeArr.length; i++) {
			boardTypeArr[i] = comCodeList.get(i).getCodeId();
		}
		// 리스트 조회
		boardList = boardService.SelectBoardList(pageVo, boardTypeArr);
		// 게시물 총개수 조회
		totalCnt = boardService.selectBoardCnt(boardTypeArr);
		model.addAttribute("boardList", boardList);
		model.addAttribute("totalCnt", totalCnt);
		model.addAttribute("pageNo", page);
		model.addAttribute("comCodeList", comCodeList);
		return "board/boardList";
	}
	
	// 리스트 검색결과 비동기통신 jackson을 사용하여 json형태로 리턴
	@RequestMapping(value = "/board/boardSearch.do", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> boardSearch(PageVo pageVo, @RequestParam(value = "boardTypeArr", required = false) String[] boardTypeArr) throws Exception{
		logger.info("[boardSearch.do] 글 조회 ==> 페이지 : " + Arrays.toString(boardTypeArr));
		Map<String, Object> output = new HashMap<String, Object>();
		List<BoardVo> boardList = new ArrayList<BoardVo>();
		List<ComCodeVo> comCodeList = new ArrayList<ComCodeVo>();
		if(pageVo.getPageNo() == 0){
			pageVo.setPageNo(1);
		}
		// 리스트 조회
		boardList = boardService.SelectBoardList(pageVo, boardTypeArr);
		output.put("boardList", boardList);
		// 검색조건 리스트 조회
		comCodeList = comCodeService.getCode_type("menu");
		output.put("comCodeList", comCodeList);
		logger.info("[boardSearch.do] 글조회 output ==> " + output);
		return output;
	}
	
	// 리스트 검색결과 modelAndView를 통하여 html형태로 응답
	@RequestMapping(value = "/board/boardSearch_html.do", method = RequestMethod.GET)
	public String boardSearch_html(Model model, PageVo pageVo, @RequestParam(value = "boardTypeArr", required = false) String[] boardTypeArr) throws Exception{
		logger.info("[boardSearch.do] 글 조회 ==> 페이지 : " + Arrays.toString(boardTypeArr));
		List<BoardVo> boardList = new ArrayList<BoardVo>();
		List<ComCodeVo> comCodeList = new ArrayList<ComCodeVo>();
		if(pageVo.getPageNo() == 0){
			pageVo.setPageNo(1);
		}
		// 리스트 조회
		boardList = boardService.SelectBoardList(pageVo, boardTypeArr);
		// 검색조건 리스트 조회
		comCodeList = comCodeService.getCode_type("menu");
		
		model.addAttribute("boardList", boardList);
		model.addAttribute("comCodeList", comCodeList);
		
		return "board/boardList";
	}
	
	
	@RequestMapping(value = "/board/{boardType}/{boardNum}/boardView.do", method = RequestMethod.GET)
	public String boardView(Locale locale, Model model
			,@PathVariable("boardType")String boardType
			,@PathVariable("boardNum")int boardNum) throws Exception{
		BoardVo boardVo = new BoardVo();
		// 게시물 조회
		boardVo = boardService.selectBoard(boardType,boardNum);
		// 유저 이름 조회
		String userName = userDao.searchName(boardVo.getCreator());
		if(userName != null) {
			model.addAttribute("userName", userName);
		}
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
	public String boardWriteAction(Locale locale, BoardVo boardVo, HttpSession session) throws Exception{
		logger.info("[boardWriteAction.do] 글 작성 ver01 boardVo : " + boardVo);
		HashMap<String, String> result = new HashMap<String, String>();
		CommonUtil commonUtil = new CommonUtil(); 	// 
		UserVo login = (UserVo) session.getAttribute("login");
		if(login != null) {
			boardVo.setCreator(login.getUserId());
		} else {
			boardVo.setCreator("SYSTEM");
		}
		int[] resultCnt = boardService.boardInsert(boardVo);
		result.put("success", (resultCnt.length > 0)?"Y":"N");
		String callbackMsg = commonUtil.getJsonCallBackString(" ",result);
		logger.info("callbackMsg::"+callbackMsg);
		return callbackMsg;
	}
	
	@RequestMapping(value = "/board/boardWrite_ver02.do", method = RequestMethod.GET)
	public String boardWrite_ver02(Locale locale, Model model) throws Exception{
		logger.info("[boardWrite.do] 글 작성 페이지 ver02");
		List<ComCodeVo> comCodeList = comCodeService.getCode_type("menu");
		model.addAttribute("comCodeList", comCodeList);
		return "board/boardWrite_ver02";
	}
	
	@RequestMapping(value = "/board/boardWriteAction_ver02.do")
	@ResponseBody
	public String boardWriteAction_ver02(BoardVo boardVo, HttpSession session) throws Exception {
		logger.info("[boardWriteAction.do] 글 작성 ver02 boardVo : " + boardVo);
		HashMap<String, String> result = new HashMap<String, String>();
		CommonUtil commonUtil = new CommonUtil(); 	// 
		
		UserVo login = (UserVo) session.getAttribute("login");
		if(login != null) {
			for(BoardVo temp : boardVo.getBoardList()) {
				temp.setCreator(login.getUserId());
			}
		} else {
			for(BoardVo temp : boardVo.getBoardList()) {
				temp.setCreator("SYSTEM");
			}
		}
		int[] resultCnt = boardService.boardInsert_ver02(boardVo);
		result.put("success", (resultCnt.length > 0)?"Y":"N");
		String callbackMsg = commonUtil.getJsonCallBackString(" ",result);
		logger.info("callbackMsg::"+callbackMsg);
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

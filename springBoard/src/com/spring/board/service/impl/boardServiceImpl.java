package com.spring.board.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.board.dao.BoardDao;
import com.spring.board.service.boardService;
import com.spring.board.vo.BoardVo;
import com.spring.board.vo.PageVo;

@Service
public class boardServiceImpl implements boardService{
	private Logger logger = LoggerFactory.getLogger(boardServiceImpl.class);
	
	@Autowired
	BoardDao boardDao;
	
	@Override
	public String selectTest() throws Exception {
		// TODO Auto-generated method stub
		return boardDao.selectTest();
	}
	
	@Override
	public List<BoardVo> SelectBoardList(PageVo pageVo, String[] boardTypeArr) throws Exception {
		// TODO Auto-generated method stub
		
		return boardDao.selectBoardList(pageVo, boardTypeArr);
	}
	
	@Override
	public int selectBoardCnt(String[] boardTypeArr) throws Exception {
		// TODO Auto-generated method stub
		return boardDao.selectBoardCnt(boardTypeArr);
	}
	
	@Override
	public BoardVo selectBoard(String boardType, int boardNum) throws Exception {
		// TODO Auto-generated method stub
		BoardVo boardVo = new BoardVo();
		boardVo.setBoardType(boardType);
		boardVo.setBoardNum(boardNum);
		return boardDao.selectBoard(boardVo);
	}
	
	@Override
	public int[] boardInsert(BoardVo boardVo) throws Exception {
		logger.info("[boardInsert] param " + boardVo);
		String[] typeArr = boardVo.getBoardType().split(",");
		String[] titleArr = boardVo.getBoardTitle().split(",");
		String[] commentArr = boardVo.getBoardComment().split(",");
		int[] res = new int[typeArr.length];
		
		for(int i = 0; i < typeArr.length; i++) {
			BoardVo temp = new BoardVo();
			temp.setBoardType(typeArr[i]);
			temp.setBoardTitle(titleArr[i]);
			temp.setBoardComment(commentArr[i]);
			temp.setCreator(boardVo.getCreator());
			res[i] = boardDao.boardInsert(temp);
		}
		
		return res;
	}

	@Override
	public int boardUpdate(BoardVo boardVo) throws Exception {
		// TODO Auto-generated method stub
		return boardDao.boardUpdate(boardVo);
	}

	@Override
	public int boardDelete(BoardVo boardVo) throws Exception {
		// TODO Auto-generated method stub
		return boardDao.boardDelete(boardVo);
	}

	@Override
	public int[] boardInsert_ver02(BoardVo boardVo) throws Exception {
		logger.info("[boardInsert_ver02] param " + boardVo.getBoardList());
		int[] res = new int[boardVo.getBoardList().size()];
		
		for(int i = 0; i < res.length; i++) {
			res[i] = boardDao.boardInsert(boardVo.getBoardList().get(i));
		}
		return res;
	}
	
}

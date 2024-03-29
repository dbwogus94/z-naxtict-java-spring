package com.spring.board.dao.impl;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.board.dao.BoardDao;
import com.spring.board.vo.BoardVo;
import com.spring.board.vo.PageVo;

@Repository
public class BoardDaoImpl implements BoardDao{
	
	private Logger logger = LoggerFactory.getLogger(BoardDaoImpl.class);
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public String selectTest() throws Exception {
		// TODO Auto-generated method stub
		
		String a = sqlSession.selectOne("board.boardList");
		
		return a;
	}
	/**
	 * 
	 * */
	@Override
	public List<BoardVo> selectBoardList(PageVo pageVo, String[] boardTypeArr) throws Exception {
		// TODO Auto-generated method stub
		logger.info("[DAO selectBoardList] boardTypeArr : " + Arrays.toString(boardTypeArr));
		Map<String, Object> parm = new HashMap<String, Object>();
		parm.put("pageVo", pageVo);
		parm.put("boardTypeArr", boardTypeArr);
		return sqlSession.selectList("board.boardList", parm);
	}
	
	@Override
	public int selectBoardCnt(String[] boardTypeArr) throws Exception {
		// TODO Auto-generated method stub
		Map<String, Object> parm = new HashMap<String, Object>();
		parm.put("boardTypeArr", boardTypeArr);
		return sqlSession.selectOne("board.boardTotal", parm);
	}
	
	@Override
	public BoardVo selectBoard(BoardVo boardVo) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("board.boardView", boardVo);
	}
	
	@Override
	public int boardInsert(BoardVo boardVo) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.insert("board.boardInsert", boardVo);
	}
	@Override
	public int boardUpdate(BoardVo boardVo) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.update("board.boardUpdate", boardVo);
	}
	@Override
	public int boardDelete(BoardVo boardVo) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.delete("board.boardDelete", boardVo);
	}
	
	
}

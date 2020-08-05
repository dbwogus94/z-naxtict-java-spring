package com.spring.board.vo;

public class ComCodeVo {
	/* 영어명 : menu */
	private String codeType;
	/* 코드id */
	private String codeId;
	/* 코드id에 대응하는 이름 */
	private String codeName;
	
	
	public String getCodeType() {
		return codeType;
	}
	public void setCodeType(String codeType) {
		this.codeType = codeType;
	}
	public String getCodeId() {
		return codeId;
	}
	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}
	public String getCodeName() {
		return codeName;
	}
	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
	
	@Override
	public String toString() {
		return "comCodeVo [codeType=" + codeType + ", codeId=" + codeId + ", codeName=" + codeName + "]";
	}
	
	
}


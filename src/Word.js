// src > Word.js
// 단어 추가하기 페이지

import React from "react";
import "./App.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBucketFB } from "./redux/modules/bucket";
const Word = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const word = React.useRef(null);
  const explain = React.useRef(null);
  const example = React.useRef(null);

  const addWordList = () => {
    dispatch(
      addBucketFB({
        word: word.current.value,
        explain: explain.current.value,
        example: example.current.value,
      })
    );
  };

  return (
    <>
      <div className="Myoutbox">
        <div className="Header">4음절 부사 단어 추가하기</div>

        <Addbox>
          <form>
            <div className="Wordbox" style={{ margin: "20px" }}>
              <div>단어</div>
              <textarea
                placeholder="단어를 입력하세요"
                className="Inputbox"
                style={{ height: "50px" }}
                type="word"
                ref={word}
              />
              <div>설명</div>
              <textarea
                placeholder="뜻을 입력하세요"
                className="Inputbox"
                type="explain"
                ref={explain}
              />
              <div>예시</div>
              <textarea
                placeholder="예시를 입력하세요"
                className="Inputbox"
                type="example"
                ref={example}
              />
            </div>
          </form>
          <button
            className="buttons"
            onClick={() => {
              dispatch(addWordList);
              history.push("/");
            }}
          >
            추가하기
          </button>
        </Addbox>
        <div style={{ textAlign: "right", margin: "10%" }}>
          <a
            style={{ color: "black" }}
            href="https://stdict.korean.go.kr/search/searchDetailWords.do"
            target="_blank"
          >
            국립국어원 표준국어대사전 참고
          </a>
        </div>

        <div>
          <Backbutton
            onClick={() => {
              history.push("/");
            }}
          >
            🔙
          </Backbutton>
        </div>
      </div>
    </>
  );
};

const Addbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(rgb(123, 125, 125), cadetblue);
`;

const Backbutton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 3%;
  background-color: aliceblue;
  &:hover {
    cursor: default;
    background-color: #b6d3d4;
    box-shadow: 0px 0px 3px 0px #b6d3d4, 3px 3px 3px black;
  }
  width: 70px;
  height: 70px;
  border-radius: 50%;
  font-size: 3em;
  color: #464646;
  background-color: #5f9da0;
  text-align: center;
  line-height: 70px;
  border: 2px #b6d3d4 solid;
`;

export default Word;

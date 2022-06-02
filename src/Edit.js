//수정, 삭제 페이지 Edit.js

import React from "react";
import "./App.css";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
// useDispatch는 데이터를 업데이트할 때, useSelector는 데이터를 가져올 때 사용.
import { useDispatch, useSelector } from "react-redux";
import { deleteBucketFB, updateBucketFB } from "./redux/modules/bucket";

const Edit = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // url 파라미터에서 인덱스 가져오기
  const params = useParams();
  const bucket_idx = params.idx;

  //스토어에서 상태값 가져오기
  const word_list = useSelector((state) => state.bucket.list);

  const word = React.useRef(null);
  const explain = React.useRef(null);
  const example = React.useRef(null);

  const updateWordList = () => {
    dispatch(
      updateBucketFB({
        id: word_list[bucket_idx].id,
        word: word.current.value,
        explain: explain.current.value,
        example: example.current.value,
      })
    );
  };

  return (
    <div>
      <div className="Myoutbox">
        <div className="Header">단어 수정 및 삭제하기</div>

        <Addbox>
          <div className="Wordbox" style={{ marginBottom: "20px" }}>
            <div>단어</div>
            <textarea
              defaultValue={word_list[bucket_idx].word}
              ref={word}
              className="Inputbox"
              style={{ height: "50px" }}
            />
            <div>설명</div>
            <textarea
              defaultValue={word_list[bucket_idx].explain}
              ref={explain}
              className="Inputbox"
            />
            <div>예시</div>
            <textarea
              defaultValue={word_list[bucket_idx].example}
              ref={example}
              className="Inputbox"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              className="buttons"
              style={{ marginRight: "10px" }}
              onClick={() => {
                console.log("수정하기 버튼을 눌렀어!");
                dispatch(updateWordList);
                history.goBack();
              }}
            >
              수정하기
            </button>
            <button
              className="buttons"
              onClick={() => {
                console.log("삭제하기 버튼을 눌렀어!");
                dispatch(deleteBucketFB(word_list[bucket_idx].id));
                history.goBack();
              }}
            >
              삭제하기
            </button>
          </div>
        </Addbox>
        <Backbutton
          onClick={() => {
            history.push("/");
          }}
        >
          🔙
        </Backbutton>
      </div>
    </div>
  );
};

const Addbox = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Backbutton = styled.div`
  position: fixed;
  bottom: 2.5%;
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
export default Edit;

import React from "react";
import "./App.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Main = (props) => {
  const history = useHistory();
  const my_lists = useSelector((state) => state.bucket.list);

  return (
    <>
      <div className="Myoutbox">
        <div className="Header">4음절 부사 단어장</div>
        <div className="Mybox">
          {my_lists.map((list, idx) => {
            return (
              <Wordbox
                key={idx}
                onClick={() => {
                  history.push(`/edit/` + idx);
                }}
              >
                <Title style={{ fontSize: "2em" }}>{list.word}</Title>
                <Title style={{ fontSize: "1.1em" }}>{list.explain}</Title>
                <Title style={{ color: "blue" }}>(예시) {list.example}</Title>
              </Wordbox>
            );
          })}
        </div>
        <Plusbutton
          onClick={() => {
            history.push(`/word/add`);
          }}
        >
          +
        </Plusbutton>
        <Upbutton
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          🔝
        </Upbutton>
      </div>
    </>
  );
};

const Wordbox = styled.div`
  width: 95%;
  max-width: 380px;
  height: auto;
  background-color: aliceblue;
  &:hover {
    box-shadow: 0px 0px 3px 0px white, 5px 5px 5px black;
    background-color: #b6d3d4;
  }
  margin: 30px 30px 0px 30px;
  border-radius: 5%;
  padding: 13px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 0.9em;
  margin: 3%;
  color: #464646;
  font-family: "Times New Roman", Times, serif;
`;

const Plusbutton = styled.div`
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
  font-size: 5em;
  color: #464646;
  background-color: #5f9da0;
  text-align: center;
  line-height: 60px;
  border: 2px #b6d3d4 solid;
`;

const Upbutton = styled.div`
  position: fixed;
  bottom: 100px;
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
  font-size: 4em;
  text-align: center;
  line-height: 70px;
  background-color: #5f9da0;
  border: 2px #b6d3d4 solid;
`;

export default Main;

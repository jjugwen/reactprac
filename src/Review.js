// 리액트 패키지를 불러옵니다.
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


/* 클릭하면 색깔바꾸기- 이거 맞나요?..ㅋㅋ */
const ovalarr = ["Oval1", "Oval2", "Oval3", "Oval4", "Oval5"];
function userSelect0() {
  for (let i = 0; i < 5; i++) {
    if (i < 1) {
      let x = document.getElementById(ovalarr[i])
      x.style.backgroundColor = "rgb(24, 182, 3)";
    } else {
      let x = document.getElementById(ovalarr[i])
      x.style.backgroundColor = "#c5bba8";
    }
  } let grade = 1;
  console.log(grade);
}
function userSelect1() {
  for (let i = 0; i < 5; i++) {
    if (i < 2) {
      let x = document.getElementById(ovalarr[i])
      x.style.backgroundColor = "rgb(24, 182, 3)";
    } else {
      let x = document.getElementById(ovalarr[i])
      x.style.backgroundColor = "#c5bba8";
    }
  } let grade = 2;
  console.log(grade);
}
function userSelect2() {
  for (let i = 0; i < 5; i++) {
    if (i < 3) {
      let x = document.getElementById(ovalarr[i])
      x.style.backgroundColor = "rgb(24, 182, 3)";
    } else {
      let x = document.getElementById(ovalarr[i])
      x.style.backgroundColor = "#c5bba8";
    }
  } let grade = 3;
  console.log(grade);
}
function userSelect3() {
  for (let i = 0; i < 5; i++) {
    if (i < 4) {
      let x = document.getElementById(ovalarr[i])
      x.style.backgroundColor = "rgb(24, 182, 3)";
    } else {
      let x = document.getElementById(ovalarr[i])
      x.style.backgroundColor = "#c5bba8";
    }
  } let grade = 4;
  console.log(grade);
}
function userSelect4() {
  for (let i = 0; i < 5; i++) {
    let x = document.getElementById(ovalarr[i])
    x.style.backgroundColor = "rgb(24, 182, 3)";
  } let grade = 5;
  console.log(grade);
}

const Review = (props) => {
  const weekdays = useParams();
  // console.log(weekdays);
  
  return (
    <div className="Mainbox">
      <div>
        <h3>
          <span
            style={{
              color: "#fff",
              fontWeight: "900",
              background: "orange",
              padding: "0.2rem",
              borderRadius: "5px",
            }}
          >{weekdays.weekdays}요일</span> 평점 남기기</h3>
        <div className="Ovalbox">
          <div className='OvalStyle' id="Oval1" onClick={userSelect0}></div>
          <div className='OvalStyle' id="Oval2" onClick={userSelect1}></div>
          <div className='OvalStyle' id="Oval3" onClick={userSelect2}></div>
          <div className='OvalStyle' id="Oval4" onClick={userSelect3}></div>
          <div className='OvalStyle' id="Oval5" onClick={userSelect4}></div>
        </div>
        <Link to="/"><button className="SaveButton"><span style={{
          color: "white", fontSize: "18px"
        }}>평점 남기기</span></button></Link>
      </div>
    </div>
  )
};

export default Review;
import './App.css';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

/* 랜덤 숫자 함수 */
function randomN(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// console.log(randomN(1, 5))

/* 길이가 7인 빈 배열 생성 */
const weekarr = [0, 0, 0, 0, 0, 0, 0]
let weekarr2 = weekarr.map(v => v + randomN(1, 5))
console.log(weekarr2)

/* 평균 평점 구하기 */
const sum = weekarr2.reduce((a, b) => a + b);
let avg = (sum / 7).toFixed(1);
console.log(avg) //7개(월~일) 평균 평점, 소수점 첫째자리 반올림

/*오늘날짜 요일부터 요일 나열하기*/
let d = new Date();
let week = new Array("일", "월", "화", "수", "목", "금", "토", "일", "월", "화", "수", "목", "금", "토")
// console.log(d)
// console.log(week[d.getDay()])
let newweekarr = [];
for (let i = 0; i < 7; i++) {
    newweekarr.push(week[d.getDay() + i])
}
// console.log(newweekarr);

/* 요일 + 평점 딕셔너리 만들기 */
const week_rates = newweekarr.map((w, idx) => {
    return {
        day: w,
        rate: weekarr2[idx]
    };
})
// console.log(week_rates)
// console.log(week_rates[0].rate)


const Home = (props) => {
    const [평균, setAvg] = useState(avg);
    const history = useHistory();
    const [weekdays, setWeekdays] = useState(newweekarr)

    return (

        <div className="Mainbox">
            <div>
                <h3 style={{ textAlign: "center" }}>내 일주일은?</h3>
                {week_rates.map((w, idx) => {
                    return (
                        <div key={`week_day_${idx}`} className='Gradebox'>
                            <p style={{
                                margin: "0px 0.5rem 0px 0px",
                                fontWeight: "bold"
                            }}>{w.day}</p>

                            {Array.from({ length: 5 }, (item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className='CircleStyle'
                                        style={{ backgroundColor: w.rate - 1 < idx ? "#c5bba8" : "rgb(24, 182, 3)" }}
                                    >
                                    </div>
                                )
                            })}


                            {/* 세모 ► */}
                            <div style={{
                                width: "0px",
                                height: "0px",
                                borderTop: "15px solid transparent",
                                borderBottom: "15px solid transparent",
                                borderLeft: "30px solid black",
                                margin: "5px"
                            }}
                                onClick={() => {
                                    history.push(`/review/${weekdays[idx]}`);
                                }}
                            >
                            </div>
                        </div>
                    )
                })
                }

                <div className='Result'>평균 평점 {평균}
                    {/* reset 버튼 추가. */}
                    <button className='ResetButton'
                        onClick={() => {
                            setAvg(parseInt(0).toFixed(1));
                            console.log("reset")
                        }}
                    ><p style={{
                        color: "white", fontSize: "18px"
                    }}>Reset</p>

                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home;

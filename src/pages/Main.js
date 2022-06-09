//메인 페이지(게시글 목록 페이지)

//issue 1: props의 key값 지정하라고 콘솔창에 warning 뜸. => 가장 상단 태그에 키값 주면 된다고 했지만.. 뭔가 잘 안됨! 함수형 컴포넌트 따로 분리해서 리팩토링하는 방법으로 수정해보면 좋을 듯.

import React, { useEffect } from "react";
import "./App.css";
import Header from "../components/Header";
import { Grid, Image, Text } from "../elements";
import { Helmet } from "react-helmet";
import { loadPostFB } from "../redux/modules/data";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Main = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.data.list);
  // console.log(post_list);

  useEffect(() => {
    dispatch(loadPostFB());
  }, []);

  return (
    <>
      {/* 상단 */}
      <Helmet>
        <title>리액트 심화 주차 과제</title>
        <meta property="og:title" content="과제" />
        <meta
          property="og:description"
          content="리액트 심화 주차 과제입니다."
        />
      </Helmet>
      <Header />

      {/* 게시글 목록 */}
      {post_list.map((props, idx) => {
        if (props.layout === "right") {
          return (
            <Grid>
              <div
                className="detailBox"
                onClick={() => {
                  navigate(`/detail/` + idx);
                }}
              >
                {/* 상단(프로필(), 이름(현재는 아이디ㅜ), 작성시간) */}
                <Grid isflex>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Image shape="circle" src={props.image_url} />
                      <Text bold>{props.user_id}</Text>
                    </div>

                    <Text>{props.insert_dt}</Text>
                  </div>
                </Grid>
                {/* layout-right */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Grid padding="16px">
                    <Text>{props.contents}</Text>
                  </Grid>
                  <Grid>
                    <Image shape="rectangle" src={props.image_url} />
                  </Grid>
                </div>
              </div>
            </Grid>
          );
        } else if (props.layout === "left") {
          return (
            <Grid>
              <div
                className="detailBox"
                onClick={() => {
                  navigate(`/detail/` + idx);
                }}
              >
                {/* 상단(프로필(), 이름(현재는 아이디ㅜ), 작성시간) */}
                <Grid isflex>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Image shape="circle" src={props.image_url} />
                      <Text bold>{props.user_id}</Text>
                    </div>

                    <Text>{props.insert_dt}</Text>
                  </div>
                </Grid>
                {/* layout-left */}
                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  onClick={() => {
                    navigate(`/detail/` + idx);
                  }}
                >
                  <Grid>
                    <Image shape="rectangle" src={props.image_url} />
                  </Grid>

                  <Grid padding="16px">
                    <Text>{props.contents}</Text>
                  </Grid>
                </div>
              </div>
            </Grid>
          );
        } else {
          return (
            <Grid>
              <div
                className="detailBox"
                onClick={() => {
                  navigate(`/detail/` + idx);
                }}
              >
                {/* 상단(프로필(), 이름(현재는 아이디ㅜ), 작성시간) */}
                <Grid isflex>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Image shape="circle" src={props.image_url} />
                      <Text bold>{props.user_id}</Text>
                    </div>

                    <Text>{props.insert_dt}</Text>
                  </div>
                </Grid>
                {/* 업로드한 이미지 및 글 layout-bottom */}
                <div>
                  <Grid padding="16px">
                    <Text>{props.contents}</Text>
                  </Grid>
                  <Grid>
                    <Image shape="rectangle" src={props.image_url} />
                  </Grid>
                </div>
              </div>
            </Grid>
          );
        }
      })}
    </>
  );
};

export default Main;

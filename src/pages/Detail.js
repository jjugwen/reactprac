//게시글 상세 페이지
import React from "react";
import Header from "../components/Header";
import { Grid, Image, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePostFB, deleteImageFB } from "../redux/modules/data";
const Detail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const _idx = params.idx;

  const post_list = useSelector((state) => state.data.list);
  // console.log(post_list);
  let post = [];
  post.push(post_list[_idx]);

  return (
    <>
      <Header />
      {post.map((props, idx) => {
        if (post_list[_idx].layout === "right") {
          return (
            <Grid>
              <div className="detailBox">
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
                      <Image shape="circle" src={post_list[_idx].image_url} />
                      <Text bold>{post_list[_idx].user_id}</Text>
                    </div>

                    <Text>{post_list[_idx].insert_dt}</Text>
                    <div style={{ margin: "2%" }}>
                      <button
                        className="Buttons"
                        style={{ height: "20px" }}
                        onClick={() => {
                          navigate(`/edit/` + _idx);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="Buttons"
                        style={{ height: "20px" }}
                        onClick={() => {
                          dispatch(deletePostFB(post_list[_idx].id));
                          dispatch(deleteImageFB(post_list[_idx].image_name));
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </Grid>
                {/* layout-right */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Grid padding="16px">
                    <Text>{post_list[_idx].contents}</Text>
                  </Grid>
                  <Grid>
                    <Image shape="rectangle" src={post_list[_idx].image_url} />
                  </Grid>
                </div>
              </div>
            </Grid>
          );
        } else if (post_list[_idx].layout === "left") {
          return (
            <Grid>
              <div className="detailBox">
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
                      <Image shape="circle" src={post_list[_idx].image_url} />
                      <Text bold>{post_list[_idx].user_id}</Text>
                    </div>

                    <Text>{post_list[_idx].insert_dt}</Text>
                    <div style={{ margin: "2%" }}>
                      <button
                        className="Buttons"
                        style={{ height: "20px" }}
                        onClick={() => {
                          navigate(`/edit/` + _idx);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="Buttons"
                        style={{ height: "20px" }}
                        onClick={() => {
                          dispatch(deletePostFB(post_list[_idx].id));
                          dispatch(deleteImageFB(post_list[_idx].image_name));
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </Grid>
                {/* layout-left */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Grid>
                    <Image shape="rectangle" src={post_list[_idx].image_url} />
                  </Grid>

                  <Grid padding="16px">
                    <Text>{post_list[_idx].contents}</Text>
                  </Grid>
                </div>
              </div>
            </Grid>
          );
        } else {
          return (
            <Grid>
              <div className="detailBox">
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
                      <Image shape="circle" src={post_list[_idx].image_url} />
                      <Text bold>{post_list[_idx].user_id}</Text>
                    </div>

                    <Text>{post_list[_idx].insert_dt}</Text>
                    <div style={{ margin: "2%" }}>
                      <button
                        className="Buttons"
                        style={{ height: "20px" }}
                        onClick={() => {
                          navigate(`/edit/` + _idx);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="Buttons"
                        style={{ height: "20px" }}
                        onClick={() => {
                          dispatch(deletePostFB(post_list[_idx].id));
                          dispatch(deleteImageFB(post_list[_idx].image_name));
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </Grid>
                {/* 업로드한 이미지 및 글 layout-bottom */}
                <div>
                  <Grid padding="16px">
                    <Text>{post_list[_idx].contents}</Text>
                  </Grid>
                  <Grid>
                    <Image shape="rectangle" src={post_list[_idx].image_url} />
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

Detail.defaultProps = {
  user_info: {
    user_name: "nickname",
    user_profile:
      "https://cdn.pixabay.com/photo/2020/06/06/14/26/flower-5266745_960_720.jpg",
  },
  image_url:
    "https://cdn.pixabay.com/photo/2020/06/06/14/26/flower-5266745_960_720.jpg",
  contents: "해바라기네요!",
  insert_dt: "2021-02-27 10:00:00",
};

export default Detail;

//edit 페이지인데, 글 작성 페이지 가져와서 수정하려다가 시간 관계상 보류함. 현 상태는 글 작성 페이지오ㅏ 같음.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { addPostFB } from "../redux/modules/data";
import Button from "../elements/Button";

import Header from "../components/Header";
import { isLoginFB } from "../redux/modules/user";
import moment from "moment";

const Edit = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const file_link_ref = React.useRef(null);

  const userlist = useSelector((state) => state.user.list);
  // console.log(userlist);

  useEffect(() => {
    dispatch(isLoginFB());
  }, []);

  //작성한 게시글
  const [contents, setContents] = useState();
  const onChange = (e) => {
    setContents(e.target.value);
  };

  //image upload
  const uploadFB = async (e) => {
    // console.log(e.target.files);
    const upload_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    // console.log(upload_file);

    //image URL
    const file_url = await getDownloadURL(upload_file.ref);
    // console.log(file_url);
    file_link_ref.current = { url: file_url };
    // console.log(file_link_ref.current);
  };

  //image layout 선택 버튼값 불러오기
  const [ischecked, setIschecked] = useState();

  //버튼 비활성화 위한
  const [imageUpload, setImageUpload] = useState();

  const handleClickradio = (e) => {
    // console.log(e.target.value);
    setIschecked(e.target.value);
    const layout = { layout: e.target.value };
    // console.log(layout);
  };

  //작성한 post data 저장
  const addPostList = () => {
    dispatch(
      addPostFB({
        user_id: userlist,
        contents: { contents }.contents,
        layout: ischecked,
        user_profile: file_link_ref.current.url,
        image_url: file_link_ref.current.url,
        insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
      })
    );
  };

  return (
    <>
      {/* 헤드 */}
      <Header />
      <React.Fragment>
        <div encType="multipart/form-data">
          <div className="AddBox">
            <div
              style={{
                color: "#189118",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h3>게시물 올리는 방법</h3>
              <span>
                1. '파일 선택'을 눌러 업로드할 이미지를 선택해 주세요.
              </span>
              <span>2. 아래 3개의 레이아웃 중 하나를 선택해 주세요.</span>
              <span>3. 이미지와 함께 올릴 글을 작성해 주세요.</span>
              <span>4. '게시글 작성' 버튼을 누르면 끝!</span>
            </div>
            <h1>이미지 선택</h1>
            <div className="selectImage">
              <input
                value={imageUpload}
                type="file"
                ref={file_link_ref}
                onChange={(e) => {
                  uploadFB(e);
                  setImageUpload(e.target.value);
                }}
                accept="image/*"
              />
            </div>
            <h1>레이아웃 선택</h1>
            <div>
              {/* layout-right */}
              <input
                type="radio"
                name="layout"
                value="right"
                checked={ischecked === "right"}
                onChange={handleClickradio}
              />
              오른쪽에 이미지 왼쪽에 텍스트
              <br />
              <div className="selectPreview">
                {contents}
                <img
                  src={file_link_ref.current?.url}
                  style={{ width: "400px" }}
                  alt="preview"
                />
              </div>
              <br />
              {/* layout-left */}
              <input
                type="radio"
                name="layout"
                value="left"
                checked={ischecked === "left"}
                onChange={handleClickradio}
              />
              왼쪽에 이미지 오른쪽에 텍스트
              <br />
              <div className="selectPreview">
                <img
                  src={file_link_ref.current?.url}
                  style={{ width: "400px" }}
                  alt="preview"
                />
                {contents}
              </div>
              <br />
              {/* layout-bottom */}
              <input
                type="radio"
                name="layout"
                value="bottom"
                checked={ischecked === "bottom"}
                onChange={handleClickradio}
              />
              상단에 텍스트 하단에 이미지
              <br />
              <div className="selectPreview3">
                {contents} <br />
                <br />
                <img
                  src={file_link_ref.current?.url}
                  style={{ width: "400px" }}
                  alt="preview"
                />
              </div>
            </div>
            <h1>게시글 내용</h1>
            <textarea
              value={contents}
              className="writingbox"
              onChange={onChange}
              placeholder="게시글 작성"
            />
            <Button
              text="게시글 작성"
              _disabled={!imageUpload || !contents ? true : false}
              _onclick={() => {
                dispatch(addPostList);

                setTimeout(() => {
                  setTimeout(navigate("/"), 2000);
                  window.location.reload();
                }, 1000);
              }}
            >
              게시글 작성
            </Button>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default Edit;

//Grid 요소

import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  // 상위 컴포넌트로부터 props를 전달 받기
  const { isflex, width, margin, padding, bg, children } = props;

  // 전달받은 props를 별도의 변수에 저장
  const styles = {
    isflex: isflex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
  };
  return (
    <React.Fragment>
      {/* 전달받은 스타일의 정보가 있는 변수를 스프레드 문법으로 태그 안에 풀어넣기 */}
      <GridBox {...styles}>{children}</GridBox>
    </React.Fragment>
  );
};

// Grid의 defaultProps
// 부여할 것으로 예상되는 스타일들에 대해서 미리 값을 부여해 놓는다.
Grid.defaultProps = {
  children: null,
  isflex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
};

//styled component
const GridBox = styled.div`
  width: ${(props) => props.width};

  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

export default Grid;

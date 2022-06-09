//src > elements > Button.js

import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { children, _disabled, _onclick } = props;

  return (
    <Btn disabled={_disabled} onClick={_onclick}>
      {children}
    </Btn>
  );
};

Button.defaultProps = {
  children: null,
  _disabled: false,
};

const Btn = styled.button`
  color: white;
  height: 40px;
  margin-top: 7%;
  background-color: ${(props) => (props.disabled ? "#gray" : "#282c34")};
`;

export default Button;

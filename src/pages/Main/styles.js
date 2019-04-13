import styled from "styled-components";

const Styled = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.color && `background: ${props.color}`}

  form {
    width: 300px;
    display: flex;
    flex-direction: column;

    input {
      height: 48px;
      border: 1px solid #ddd;
      font-size: 16px;
      padding: 0 20px;
      margin-top: 30px;
    }

    button {
      height: 48px;
      background: #7159c1;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      padding: 0 20px;
      margin-top: 10px;
      border: 0;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
  }
`;

export default Styled
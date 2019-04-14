import styled from "styled-components";
import colors from '../../assets/colors'

const Styled = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.color && `background: ${props.color}`}

  .logo{
    height: 110px;
    width: auto;
  }

  form {
    width: 300px;
    display: flex;
    flex-direction: column;

    input {
      height: 48px;
      border: 1px solid ${colors.grayLight};
      border-radius: 10px;
      font-size: 16px;
      padding: 0 20px;
      margin-top: 75px;
      transition: 0.1s;
      width: 100%;
      &:focus {
        border: 2px solid ${colors.blueMedium};
      }
    }

    button {
      height: 48px;
      background: ${colors.grayDark};
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      padding: 0 20px;
      margin-top: 10px;
      border: 0;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.5s;
      &:hover{
        background: ${colors.grayMedium};
      }
      &:disabled {
        opacity: 0.2;
      }
    }
  }

  .loader-svg {
    position: absolute;
    margin-top: 72px;
  }

  .btn-action{
    position: fixed;
    width: 30px;
    border-radius: 50%;
    border: 0;
    top: 10px;
    right: 30px;
    text-align: center;
    background: transparent;
    color: ${colors.grayDark};
    cursor: pointer;
    &:hover{
      color: ${colors.grayMedium};
    }
    &:disabled {
      opacity: 0.2;
    }
  }
`;

export default Styled
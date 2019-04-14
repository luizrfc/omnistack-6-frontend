import styled from 'styled-components';
import colors from '../../assets/colors'

const Styled = styled.div`
  max-width: 900px;
  margin: 50px auto 0;

  .logo{
    height: 50px;
    width: auto;
  }

  header {
    display: flex;
    // justify-content: center;
    align-items: center;

    .hero{
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    button{
      background: ${colors.blueDark};
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      padding: 5px 0px 3px 8px;
      margin-top: 10px;
      border: 0;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.5s;
      &:hover{
        background: #008bd4;
      }
      &:disabled {
        opacity: 0.2;
      }
    }

    h1 {
      font-size: 21px;
      padding-left: 15px;
      margin-left: 15px;
      border-left: 1px solid #ddd;
    }
    button svg {
      margin-right: 10px;
    }
    button:hover {
      opacity: 0.9;
    }
  }
  .upload {
    border-radius: 4px;
    padding: 30px;
    text-align: center;
    border: 1px dashed #ddd;
    color: #999;
    margin-top: 50px;
    cursor: pointer;
  }
  ul {
    margin: 30px 0;
    list-style: none;
  }
  ul li {
    border-radius: 10px;
    width: 100%;
    padding: 15px 0;
    float: left;
    align-items: center;
    transition: 0.3s;
    &.nothing{
      color: ${colors.alertColor};
      text-align: center;
      background: ${colors.hoverBackground};
    }
    .file-info {
      float: left;
      margin-left: 15px;
    }
    .file-date {
      float: right;
    }
    .file-delete{
      float: right;
      margin-left: 15px;
      margin-right: 15px;
      cursor: pointer;
    }
  }
  ul li:hover{
    background: ${colors.hoverBackground};
    transition: 0.3s;
  }
  ul li + li {
    // padding-top: 20px;
    // margin-top: 20px;
    border-top: 1px solid #eee;
  }
  ul li .fileInfo {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  ul li .fileInfo strong {
    font-weight: normal;
    font-size: 14px;
    margin-left: 10px;
    color: #333;
  }
  ul li span {
    color: #999;
    font-size: 13px;
  }
  .align-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-svg{
    margin-top: 50px;
  }

  .btn-action{
    position: fixed;
    width: 30px;
    border-radius: 50%;
    border: 0;
    top: 10px;
    text-align: center;
    background: transparent;
    color: ${colors.grayDark};
    cursor: pointer;
    &.right{
      right: 30px;
    }
    &.left{
      left: 30px;
    }
    &:hover{
      color: ${colors.grayMedium};
    }
    &:disabled {
      opacity: 0.2;
    }
  }
`;

export default Styled
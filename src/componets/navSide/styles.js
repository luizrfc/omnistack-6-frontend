import styled from 'styled-components';
import colors from '../../assets/colors'

const Styled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: -100%;
  background: ${colors.navSideBackground};
  width: ${props => props.width ? props.width : '350px'};
  padding: 15px 15px;
  trasition: 0.5s;
  // border-left: 4px solid ${colors.grayClean};

  &.show{
      animation-name: showSide;
      animation-duration: 0.5s;
      right: 0
  }

  &.hide{
      animation-name: hideSide;
      animation-duration: 1s;
      right: -100%
  }

  @keyframes showSide{
      from { right: -100%; }
      to { right: 0;}
  }

  @keyframes hideSide{
      from { right: 0; }
      to { right: -100%;}
  }

  .title {
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      color: ${colors.grayDark}
  }

  .align-center{
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .loading-svg{
      margin-top: 50px;
  }

  button{
      border: 0;
      background: transparent;
      float: left;
      cursor: pointer;
      .btnClose {
          color: ${colors.grayDark};
      }
  }

  .side-ul {
    margin: 30px 0;
    list-style: none;
    max-height: 100%;
    overflow: auto;

    li {
    width: 100%;
    padding: 15px 0 8px;
    float: left;
    align-items: center;
    transition: 0.3s;
    border-radius: 10px;

    :hover{
      transition: 0.3s;
      background: ${colors.white};
    }

    &.nothing{
      color: ${colors.alertColor};
      text-align: center;
      background: ${colors.hoverBackground};
    }
    .nav-title {
      float: left;
      margin-left: 15px;
      padding-top: 2px;
      color: ${colors.grayDark};
    }
    .nav-files {
      float: left;
      color: ${colors.grayMedium};
      padding: 4px 0 0;
      font-size: 12px;
      margin-left: 10px;
      text-align: center;
      opacity: 0.6;
    }
    .nav-info {
      float: right;
      .nav-numbers{
          float: right;
          margin-right: 15px;
          cursor: pointer;
      }
      .nav-delete{
        float: right;
        margin-right: 15px;
        cursor: pointer;
      }
    }
    .fileInfo {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    .fileInfo strong {
      font-weight: normal;
      font-size: 14px;
      margin-left: 10px;
      color: #333;
    }
    span {
      color: #999;
      font-size: 13px;
    }
    + li {
      // padding-top: 20px;
      // margin-top: 20px;
      border-top: 1px solid #dedede;
    }
  }

`;

const Mask = styled.div`
  background: RGBA(255,255,255,0.8);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &.show{
    animation-name: showFade;
    animation-duration: 0.5s;
    opacity: 1;
    z-index: 999;
  }

  &.hide{
    animation-name: hideFade;
    animation-duration: 0.4s;
    opacity: 0;
    z-index: -1;
  }

  @keyframes showFade{
    from { opacity: 0; z-index: -1; }
    to { opacity: 1; z-index: 999; }
  }

  @keyframes hideFade{
    from { opacity: 1; z-index: 999; }
    to { opacity: 0; z-index: -1; }
  }
`

export { Styled, Mask }
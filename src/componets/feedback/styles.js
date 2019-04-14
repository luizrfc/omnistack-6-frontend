import styled from "styled-components";
import colors from '../../assets/colors'

const Styled = styled.div`
  padding: 15px 15px 10px;
  border-radius: 10px;
  transition: 0.5s;
  position: fixed;
  bottom: 25px;
  left: 25px;

  ${props => props.color === 'success' && `
    background: ${colors.successBackground};
    color: ${colors.successColor};
    border: 1px solid ${colors.successBorder};
  `}
  ${props => props.color === 'update' && `
    background: ${colors.successBackground};
    color: ${colors.successColor};
    border: 1px solid ${colors.successBorder};
  `}
  ${props => props.color === 'danger' && `
    background: ${colors.dangerBackground};
    color: ${colors.dangerColor};
    border: 1px solid ${colors.dangerBorder};
  `}
  ${props => props.color === 'alert' && `
    background: ${colors.alertBackground};
    color: ${colors.alertColor};
    border: 1px solid ${colors.alertBorder};
  `}
  ${props => props.color === 'info' && `
    background: ${colors.infoBackground};
    color: ${colors.infoColor};
    border: 1px solid ${colors.infoBorder};
  `}

  &.active {
    display: block;
    transition: 0.2s;
  }

  &.hide {
    opacity: 0;
    transition: 0.2s;
  }

  .icon-svg {
    float: right;
    margin-left: 25px;
    cursor: pointer;
  }

  button{
    border: none;
    background: transparent;
    ${props => props.color === 'success' && ` color: ${colors.successColor}; `}
    ${props => props.color === 'update' && ` color: ${colors.successColor}; `}
    ${props => props.color === 'danger' && ` color: ${colors.dangerColor}; `}
    ${props => props.color === 'alert' && ` color: ${colors.alertColor}; `}
    ${props => props.color === 'info' && ` color: ${colors.infoColor}; `}
  }
`;

export default Styled
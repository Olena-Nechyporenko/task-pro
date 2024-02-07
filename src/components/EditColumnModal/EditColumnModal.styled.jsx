import styled from "styled-components";
import { IoClose } from "react-icons/io5";

export const EditModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(p) => p.theme.colors.modalBgColor};
  z-index: 5;
`;

export const StyledEditModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 100%;
  max-width: 400px;
  min-height: 355px;
  z-index: 10;
  background-color: ${(p) => p.theme.colors.modalWindowsBgColor};
  border-radius: 10px;
`;

export const EditColumnModalBtn = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  cursor: pointer;
`;

export const EditColumnTitle = styled.h2`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.secondaryTextColor};
  margin-bottom: 24px;
`;

export const EditColumnForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const EditColumnInput = styled.input`
  width: 100%;
  /* max-width: 352px; */
  height: 49px;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.secondaryTextColor};
  background-color: transparent;

  padding: 14px 18px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.accentTextColor};
  outline: none;
  margin-bottom: 14px;
`;

export const CloseEditColumnModal = styled(IoClose)`
  font-size: 2.4rem;
  color: ${(p) => p.theme.colors.secondaryTextColor};
  position: absolute;
  top: 1.4rem;
  right: 0;

  transition: 0.3s linear;

  &:hover {
    transform: rotate(90deg);
    color: ${(p) => p.theme.colors.accentTextColor};
  }
`;
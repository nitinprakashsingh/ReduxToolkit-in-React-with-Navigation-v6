import styled from "styled-components";

const Button = styled.button<{ secondary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 14px;
  border: none;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  color: #ffffff;
  background: ${({ secondary }) => (secondary ? "#475569" : "#7c3aed")};
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ secondary }) => (secondary ? "#334155" : "#5b21b6")};
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

export default Button;

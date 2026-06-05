import styled from "styled-components"
import ShriyanLogo from "../../../Assests/ShriyanLogo.png"

export const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #5d44a2 0%, #7c5ac6 50%, #9f7bf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

export const Card = styled.div`
  width: min(100%, 440px);
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid rgba(93, 68, 162, 0.12);
`

export const Header = styled.div`
  padding: 32px 28px 0;
  text-align: center;
`

export const BrandTitle = styled.h1`
  margin: 0;
  color: #5d44a2;
  font-size: 28px;
  line-height: 1.1;
`

export const BrandSubtitle = styled.p`
  margin: 10px auto 0;
  max-width: 300px;
  color: #6b5aa0;
  font-size: 15px;
  line-height: 1.6;
`

export const Body = styled.div`
  padding: 28px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #53381e;
`

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border: 1px solid #ebd6bd;
  border-radius: 14px;
  background: #fff;
  color: #2d2d2d;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #5d44a2;
    box-shadow: 0 0 0 4px rgba(93, 68, 162, 0.12);
  }
`

export const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  font-size: 15px;
  color: #ffffff;
  background: ${props => (props.disabled ? "#e6ddfb" : "#5d44a2")};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s ease;

  &:hover {
    background: ${props => (props.disabled ? "#e6ddfb" : "#4a3587")};
  }
`

export const TextButton = styled.button`
  border: none;
  background: transparent;
  color: #5d44a2;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;

  &:hover {
    color: #705118;
  }
`

export const Message = styled.div`
  padding: 14px 16px;
  border-radius: 14px;
  background: #f3effb;
  color: #4b326b;
  border: 1px solid #e3d7fb;
  font-size: 14px;
`

export const Error = styled.p`
  color: #ad3018;
  font-size: 14px;
  margin: 0;
`

export const Footer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`

export const SmallText = styled.p`
  margin: 0;
  color: #6b5aa0;
  font-size: 13px;
`

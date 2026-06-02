import styled from "styled-components"

export const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff8f0 0%, #fff0d8 100%);
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
  border: 1px solid rgba(255, 152, 0, 0.18);
`

export const Header = styled.div`
  padding: 32px 28px 0;
  text-align: center;
`

export const BrandTitle = styled.h1`
  margin: 0;
  color: #d35400;
  font-size: 28px;
  line-height: 1.1;
`

export const BrandSubtitle = styled.p`
  margin: 10px auto 0;
  max-width: 300px;
  color: #6c4221;
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
    border-color: #a67b3f;
    box-shadow: 0 0 0 4px rgba(255, 152, 0, 0.12);
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
  background: ${props => (props.disabled ? "#d9e0a2" : "#6d7a1f")};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s ease;

  &:hover {
    background: ${props => (props.disabled ? "#d9e0a2" : "#55651a")};
  }
`

export const TextButton = styled.button`
  border: none;
  background: transparent;
  color: #8e6a1d;
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
  background: #fff4e6;
  color: #7f4b19;
  border: 1px solid #ffd0a3;
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
  color: #5d4632;
  font-size: 13px;
`

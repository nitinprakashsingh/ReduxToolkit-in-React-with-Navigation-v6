import styled from "styled-components"

export const Page = styled.div`
  min-height: 100vh;
  height: 100vh;
  display: grid;
  grid-template-columns: minmax(320px, 0.95fr) minmax(360px, 1.05fr);
  background: #f5f7fb;
  overflow: hidden;

  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`

export const BrandPanel = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  padding: 44px;
  min-height: 100vh;
  background: #5d44a2;
  color: #ffffff;

  @media (min-width: 841px) {
    position: sticky;
    top: 0;
    align-self: flex-start;
    overflow: hidden;
  }

  @media (max-width: 840px) {
    padding: 28px;
  }
`

export const BrandTop = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

export const LogoMark = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 14px;
  object-fit: contain;
  background: #ffffff;
  padding: 8px;
`

export const BrandName = styled.div`
  font-size: 19px;
  font-weight: 800;
`

export const BrandSubText = styled.div`
  margin-top: 4px;
  color: #ddd6fe;
  font-size: 13px;
`

export const BrandContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 460px;
`

export const BrandTitle = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 38px;
  line-height: 1.14;
  font-weight: 800;

  @media (max-width: 840px) {
    font-size: 30px;
  }
`

export const BrandDescription = styled.p`
  margin: 18px 0 0;
  color: #ede9fe;
  font-size: 15px;
  line-height: 1.7;
`

export const Card = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 100vh;
  overflow: hidden;

  @media (max-width: 840px) {
    align-items: flex-start;
    justify-content: flex-start;
  }

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`

export const Header = styled.section`
  width: min(100%, 520px);
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 20px 48px rgba(17, 24, 39, 0.08);
  padding: 32px;
  box-sizing: border-box;
  margin: 16px 0 24px;

  @media (max-width: 480px) {
    padding: 22px;
    margin: 14px 0;
  }
`

export const Title = styled.h2`
  margin: 0;
  color: #111827;
  font-size: 25px;
  font-weight: 800;
`

export const HelperText = styled.p`
  margin: 8px 0 24px;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const InputGroup = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: #374151;
  font-size: 13px;
  font-weight: 700;
`

export const Label = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #374151;
`

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  color: #111827;
  font-size: 14px;
  padding: 11px 12px;
  outline: none;

  &:focus {
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.12);
  }
`

export const Button = styled.button<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 42px;
  border: none;
  border-radius: 7px;
  background: #14b8a6;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  padding: 0 16px;
  margin-top: 8px;

  &:hover {
    background: #0f766e;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }
`

export const TextButton = styled.button`
  border: none;
  background: transparent;
  color: #5b21b6;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  align-self: center;

  &:hover {
    color: #7c3aed;
  }
`

export const Message = styled.div`
  padding: 12px;
  border-radius: 7px;
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #d1fae5;
  font-size: 13px;
`

export const Error = styled.p`
  color: #dc2626;
  font-size: 13px;
  margin: 0;
  padding: 8px 12px;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 7px;
`

export const Footer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`

export const SmallText = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 13px;
  text-align: center;
`

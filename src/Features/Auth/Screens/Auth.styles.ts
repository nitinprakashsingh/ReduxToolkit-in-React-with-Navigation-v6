import styled from "styled-components"

export const Container = styled.div`
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
  justify-content: flex-start;
  gap: 32px;
  padding: 44px;
  background: #5d44a2;
  color: #ffffff;

  @media (min-width: 841px) {
    position: sticky;
    top: 0;
    align-self: flex-start;
    min-height: 100vh;
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

export const LoginPanel = styled.main`
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

export const LoginCard = styled.section`
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(17, 24, 39, 0.08);
  padding: 30px;
  box-sizing: border-box;
  margin: 16px 0 24px;
  max-height: calc(100vh - 96px);
  overflow-y: auto;

  @media (max-width: 840px) {
    max-height: calc(100vh - 88px);
  }

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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FieldGroup = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: #374151;
  font-size: 13px;
  font-weight: 700;
`

export const ErrorText = styled.span`
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
`

export const Button = styled.button`
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

  &:hover {
    background: #0f766e;
  }
`

export const LinkRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`

export const ForgetButton = styled.button`
  border: none;
  background: transparent;
  color: #5b21b6;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #7c3aed;
  }
`

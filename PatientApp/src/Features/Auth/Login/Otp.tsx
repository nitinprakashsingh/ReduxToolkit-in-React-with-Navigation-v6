import React from "react"
import { Form, InputGroup, Label, Input, Button, Message, Error, Footer, TextButton, SmallText } from "./LoginStyle"

type OtpScreenProps = {
  mobile: string
  otp: string
  onOtpChange: (value: string) => void
  onVerify: (event: React.FormEvent) => void
  onBack: () => void
  onResend: () => void
  isSubmitting: boolean
  error: string
  info: string
}

const OtpScreen = ({
  mobile,
  otp,
  onOtpChange,
  onVerify,
  onBack,
  onResend,
  isSubmitting,
  error,
  info,
}: OtpScreenProps) => {
  return (
    <>
      <Form onSubmit={onVerify}>
        <InputGroup>
          <Label>Enter OTP</Label>
          <Input
            type="tel"
            placeholder="Enter 4-digit OTP"
            value={otp}
            onChange={(event) => onOtpChange(event.target.value.replace(/[^0-9]/g, ""))}
            maxLength={4}
          />
        </InputGroup>
        <Message>{`OTP sent to ${mobile}. Use 1234 for demo.`}</Message>
        {info && <Message>{info}</Message>}
        {error && <Error>{error}</Error>}
        <Button type="submit" disabled={otp.length !== 4 || isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </Button>
      </Form>
      <Footer>
        <TextButton type="button" onClick={onBack}>
          Back to mobile login
        </TextButton>
        <TextButton type="button" onClick={onResend}>
          Resend OTP
        </TextButton>
      </Footer>
      <SmallText>Use the OTP code delivered to your phone to complete login.</SmallText>
    </>
  )
}

export default OtpScreen

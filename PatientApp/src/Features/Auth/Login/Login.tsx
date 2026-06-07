import React, { useMemo, useState } from "react"
import ShriyanLogo from "../../../Assests/ShriyanLogo.png"
import { Page, Card, BrandPanel, BrandTop, LogoMark, BrandName, BrandSubText, BrandContent, BrandTitle, BrandDescription, Header, Title, HelperText, Body, Form, InputGroup, Label, Input, Button, Message, Error, Footer, TextButton, SmallText } from "./LoginStyle"
import OtpScreen from "./Otp"

const Login = () => {
  const [screen, setScreen] = useState<"login" | "otp">("login")
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const mobileValid = useMemo(() => /^[0-9]{10}$/.test(mobile), [mobile])
  const otpValid = useMemo(() => /^[0-9]{4}$/.test(otp), [otp])

  const handleSendOtp = (event: React.FormEvent) => {
    event.preventDefault()
    sendOtp()
  }

  const handleResend = () => {
    sendOtp()
  }

  const sendOtp = () => {
    setError("")
    if (!mobileValid) {
      setError("Please enter a valid 10-digit mobile number.")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setInfo(`OTP sent to ${mobile}. Use 1234 for demo login.`)
      setScreen("otp")
      setOtp("")
    }, 700)
  }

  const handleVerifyOtp = (event: React.FormEvent) => {
    event.preventDefault()
    setError("")
    if (!otpValid) {
      setError("Please enter the 4-digit OTP.")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      if (otp === "1234") {
        setInfo("Login successful. Welcome to the patient dashboard.")
        setError("")
      } else {
        setError("OTP does not match. Please check and try again.")
      }
    }, 700)
  }

  const handleBack = () => {
    setError("")
    setInfo("")
    setScreen("login")
  }

  return (
    <Page>
      <BrandPanel>
        <BrandTop>
          <LogoMark src={ShriyanLogo} alt="Shriyan Technology Pvt ltd" />
          <div>
            <BrandName>Shriyan Technology</BrandName>
            <BrandSubText>Healthcare Solutions</BrandSubText>
          </div>
        </BrandTop>

        <BrandContent>
          <BrandTitle>Patient Portal</BrandTitle>
          <BrandDescription>
            Welcome to our patient management system. Access your appointments, medical records, prescriptions, and health information all in one place.
          </BrandDescription>
        </BrandContent>
      </BrandPanel>

      <Card>
        <Header>
          <Title>Patient Login</Title>
          <HelperText>Fast access to your appointments, prescriptions and health details.</HelperText>
        <Body>
          {screen === "login" ? (
            <>
              <Form onSubmit={handleSendOtp}>
                <InputGroup>
                  <Label>Mobile number</Label>
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value.replace(/[^0-9]/g, ""))}
                  />
                </InputGroup>
                {info && <Message>{info}</Message>}
                {error && <Error>{error}</Error>}
                <Button type="submit" disabled={!mobileValid || isSubmitting}>
                  {isSubmitting ? "Sending OTP..." : "Send OTP"}
                </Button>
              </Form>
              <Footer>
                <SmallText>Use your mobile number to receive a one-time login code.</SmallText>
                <TextButton type="button" onClick={() => setMobile("")}>
                  Clear
                </TextButton>
              </Footer>
            </>
          ) : (
            <OtpScreen
              mobile={mobile}
              otp={otp}
              onOtpChange={(value) => setOtp(value)}
              onVerify={handleVerifyOtp}
              onBack={handleBack}
              onResend={handleResend}
              isSubmitting={isSubmitting}
              error={error}
              info={info}
            />
          )}
        </Body>
         </Header>
      </Card>
    </Page>
  )
}

export default Login

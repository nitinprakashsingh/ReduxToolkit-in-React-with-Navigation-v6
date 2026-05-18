import { useState } from "react"
import { useNavigate } from "react-router-dom"
import HoriOmLogo from "../../../../Assets/HoriOmLogo.png"
import InputField from "../../components/InputFileds/EmailInput"
import {
    Container,
    BrandPanel,
    BrandTop,
    LogoMark,
    BrandName,
    BrandSubText,
    BrandContent,
    BrandTitle,
    BrandDescription,
    LoginPanel,
    LoginCard,
    Title,
    HelperText,
    Form,
    FieldGroup,
    Button,
    LinkRow,
    ForgetButton,
} from "./Forgot.style"

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isEmailConfirmed, setEmailConfirmed] = useState(false)
    const navigate = useNavigate()

    const redirectToLoginPage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (isEmailConfirmed) {
            if (newPassword === confirmPassword) {
                alert("Password reset successful! Please login with your new password.")
                navigate("/login")
            } else {
                alert("Passwords do not match. Please try again.")
            }
        } else {
            setEmailConfirmed(true)
        }
    }

    return (
        <Container>
            <BrandPanel>
                <BrandTop>
                    <LogoMark src={HoriOmLogo} alt="Hari Om Seva Sansta logo" />
                    <div>
                        <BrandName>Hari Om Seva Sansta</BrandName>
                        <BrandSubText>Hospital web panel</BrandSubText>
                    </div>
                </BrandTop>

                <BrandContent>
                    <BrandTitle>Reset your password</BrandTitle>
                    <BrandDescription>
                        Enter your registered email and set a new password to regain access to
                        the hospital dashboard.
                    </BrandDescription>
                </BrandContent>
            </BrandPanel>

            <LoginPanel>
                <LoginCard>
                    <Title>Forgot password</Title>
                    <HelperText>
                        {isEmailConfirmed
                            ? "Set your new password below."
                            : "Enter your email address to receive a password reset flow."}
                    </HelperText>

                    <Form onSubmit={redirectToLoginPage}>
                        <FieldGroup>
                            Email address
                            <InputField
                                type="email"
                                placeholder="admin@hospital.com"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </FieldGroup>

                        {isEmailConfirmed && (
                            <>
                                <FieldGroup>
                                    New password
                                    <InputField
                                        type="password"
                                        placeholder="New password"
                                        value={newPassword}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />
                                </FieldGroup>

                                <FieldGroup>
                                    Confirm password
                                    <InputField
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </FieldGroup>
                            </>
                        )}

                        <Button type="submit">
                            {isEmailConfirmed ? "Reset password" : "Send reset link"}
                        </Button>

                        <LinkRow>
                            <ForgetButton type="button" onClick={() => navigate("/login")}> 
                                Back to sign in
                            </ForgetButton>
                        </LinkRow>
                    </Form>
                </LoginCard>
            </LoginPanel>
        </Container>
    )
}

export default ForgotPasswordPage

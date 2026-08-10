import { Eye, EyeOff, LogIn } from "lucide-react"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ShriyanLogo from "../../../../Assets/ShriyanLogo.png"
import { useAppDispatch, useAppSelector } from "../../../../Store/types"
import { loginRequest } from "../../authSlice"
import { verifyEmailApi, setPasswordApi } from "../../authApi"
import {
    BrandContent,
    BrandDescription,
    BrandName,
    BrandPanel,
    BrandSubText,
    BrandTitle,
    BrandTop,
    Button,
    Container,
    FieldGroup,
    Form,
    HelperText,
    LoginCard,
    LoginPanel,
    LogoMark,
    Title,
} from "../Auth.styles"
import {
    ErrorText,
    IconButton,
    InputFiled,
    InputWrapper,
    StatGrid,
    StatItem,
    StatLabel,
    StatValue,
} from "./Login.style"

const LoginPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [screen, setScreen] = useState<"login" | "verify-email" | "set-password">("login")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [stepMessage, setStepMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [emailVerified, setEmailVerified] = useState(false)
    const {isLoading, error: serverError, user } = useAppSelector((state) => state.auth)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        if (hasSubmitted && !isLoading && !serverError && user) {
            navigate("/dashboard")
        }
    }, [hasSubmitted, isLoading, serverError, user, navigate])

    const submitButtonHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!userName.trim() || !password.trim()) {
            setErrorMessage("Please enter email and password to continue.")
            return
        }

        setErrorMessage("")
        dispatch(loginRequest({ email: userName, password: password }))
        setHasSubmitted(true)
    }

    const verifyEmailHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!userName.trim()) {
            setErrorMessage("Please enter your email.")
            return
        }

        setErrorMessage("")
        setStepMessage("")

        try {
            const response = await verifyEmailApi({ email: userName.trim() })
            if (response.success) {
                setStepMessage(response.message)
                setEmailVerified(true)
                setScreen("set-password")
            }
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message ?? error.message ?? "Email not found.")
        }
    }

    const setPasswordHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!password || !confirmPassword) {
            setErrorMessage("Please enter both fields.")
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.")
            return
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters.")
            return
        }

        setErrorMessage("")
        setStepMessage("")

        try {
            const response = await setPasswordApi({ email: userName.trim(), password })
            if (response.success) {
                setStepMessage(response.message)
                setScreen("login")
                setPassword("")
                setConfirmPassword("")
                setEmailVerified(false)
            }
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message ?? error.message ?? "Unable to set password.")
        }
    }

    const getTitle = () => {
        if (screen === "verify-email") return "Verify Email";
        if (screen === "set-password") return "Set Password";
        return t('auth.login.welcomeBack');
    }

    const getHelperText = () => {
        if (screen === "verify-email") return "Enter the patient email to verify your account.";
        if (screen === "set-password") return "Create a password for your account and confirm it.";
        return t('auth.login.helperText');
    }

    return (
        <Container>
            <BrandPanel>
                <BrandTop>
                    <LogoMark src={ShriyanLogo} alt="Shriyan Technology Pvt ltd" />
                    <div>
                        <BrandName>Shriyan Technology</BrandName>
                        <BrandSubText>{t('auth.brandSubText')}</BrandSubText>
                    </div>
                </BrandTop>

                <BrandContent>
                    <BrandTitle>{t('auth.login.brandTitle')}</BrandTitle>
                    <BrandDescription>{t('auth.login.description')}</BrandDescription>

                    <StatGrid>
                        <StatItem>
                            <StatValue>24</StatValue>
                            <StatLabel>Today bookings</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>12</StatValue>
                            <StatLabel>Active doctors</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>08</StatValue>
                            <StatLabel>Departments</StatLabel>
                        </StatItem>
                    </StatGrid>
                </BrandContent>
            </BrandPanel>

            <LoginPanel>
                <LoginCard>
                    <Title>{getTitle()}</Title>
                    <HelperText>{getHelperText()}</HelperText>
                    {stepMessage && <HelperText style={{ color: '#15803d' }}>{stepMessage}</HelperText>}
                    <Form onSubmit={screen === "login" ? submitButtonHandler : screen === "verify-email" ? verifyEmailHandler : setPasswordHandler}>
                        <FieldGroup>
                            Email
                            <InputWrapper>
                                <InputFiled
                                    type="email"
                                    placeholder="Enter your registered patient email"
                                    value={userName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                                />
                            </InputWrapper>
                        </FieldGroup>

                        {(screen === "login" || screen === "set-password") && (
                            <FieldGroup>
                                Password
                                <InputWrapper>
                                    <InputFiled
                                        type={showPassword ? "text" : "password"}
                                        placeholder={screen === "set-password" ? "Enter new password" : "Enter your password"}
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    />
                                    <IconButton
                                        type="button"
                                        title={showPassword ? t('auth.login.hidePassword') : t('auth.login.showPassword')}
                                        onClick={() => setShowPassword((current) => !current)}
                                    >
                                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </IconButton>
                                </InputWrapper>
                            </FieldGroup>
                        )}

                        {screen === "set-password" && (
                            <FieldGroup>
                                Confirm Password
                                <InputWrapper>
                                    <InputFiled
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                    />
                                    <IconButton
                                        type="button"
                                        title={showConfirmPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowConfirmPassword((current) => !current)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </IconButton>
                                </InputWrapper>
                            </FieldGroup>
                        )}

                        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

                        <Button type="submit">
                            <LogIn size={17} />
                            {screen === "login" ? t('auth.login.submitButton') : screen === "verify-email" ? "Verify Email" : "Save Password"}
                        </Button>
                    </Form>

                    {screen === "login" ? (
                        <Button
                            type="button"
                            style={{ marginTop: 12, background: '#6b7280' }}
                            onClick={() => {
                                setErrorMessage('')
                                setStepMessage('')
                                setPassword('')
                                setConfirmPassword('')
                                setScreen('verify-email')
                            }}
                        >
                            Forgot password / Set password
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            style={{ marginTop: 12, background: '#6b7280' }}
                            onClick={() => {
                                setErrorMessage('')
                                setStepMessage('')
                                setPassword('')
                                setConfirmPassword('')
                                setScreen('login')
                            }}
                        >
                            Back to login
                        </Button>
                    )}
                </LoginCard>
            </LoginPanel>
        </Container>
    )
}
export default LoginPage

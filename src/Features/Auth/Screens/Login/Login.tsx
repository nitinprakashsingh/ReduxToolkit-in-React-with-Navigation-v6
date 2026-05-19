import { Eye, EyeOff, LogIn } from "lucide-react"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import HoriOmLogo from "../../../../Assets/HoriOmLogo.png"
import { useAppDispatch } from "../../../../Store/types"
import { loginRequest } from "../../authSlice"
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
    ForgetButton,
    Form,
    HelperText,
    LinkRow,
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

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const submitButtonHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!userName.trim() || !password.trim()) {
            setErrorMessage("Please enter email and password to continue.")
            return
        }

        setErrorMessage("")
        dispatch(loginRequest({ email: userName, password }))
        navigate("/dashboard")
    }

    const forgetButtonHandler = () => {
        navigate("/forgot-password")
    }
    const signUpButtonHandler = () => {
        navigate("/signup")
    }

    return (
        <Container>
            <BrandPanel>
                <BrandTop>
                    <LogoMark src={HoriOmLogo} alt="Hari Om Seva Sansta logo" />
                    <div>
                        <BrandName>Hari Om Seva Sansta</BrandName>
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
                    <Title>{t('auth.login.welcomeBack')}</Title>
                    <HelperText>{t('auth.login.helperText')}</HelperText>

                    <Form onSubmit={submitButtonHandler}>
                        <FieldGroup>
                            {t('auth.login.emailLabel')}
                            <InputWrapper>
                                <InputFiled
                                    type="email"
                                    placeholder={t('auth.login.emailPlaceholder')}
                                    value={userName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </InputWrapper>
                        </FieldGroup>

                        <FieldGroup>
                            {t('auth.login.passwordLabel')}
                            <InputWrapper>
                                <InputFiled
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t('auth.login.passwordPlaceholder')}
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPassword(e.target.value)
                                    }
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

                        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

                        <Button type="submit">
                            <LogIn size={17} />
                            {t('auth.login.submitButton')}
                        </Button>

                        <LinkRow>
                            <ForgetButton type="button" onClick={signUpButtonHandler}>
                                {t('auth.login.createAccount')}
                            </ForgetButton>
                            <ForgetButton type="button" onClick={forgetButtonHandler}>
                                {t('auth.login.forgotPassword')}
                            </ForgetButton>
                        </LinkRow>
                    </Form>
                </LoginCard>
            </LoginPanel>
        </Container>
    )
}
export default LoginPage

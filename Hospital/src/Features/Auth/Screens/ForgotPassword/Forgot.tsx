import { ArrowLeft, KeyRound } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import ShriyanLogo from "../../../../Assets/ShriyanLogo.png"
import { useAppDispatch, useAppSelector } from "../../../../Store/types"
import { clearAuthMessage, forgotPasswordRequest } from "../../authSlice"
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
    ErrorText,
    FieldGroup,
    ForgetButton,
    Form,
    HelperText,
    InputFiled,
    InputWrapper,
    LinkRow,
    LoginCard,
    LoginPanel,
    LogoMark,
    SuccessText,
    Title,
} from "./Forgot.style"

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [formError, setFormError] = useState("")
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const { isLoading, error: serverError, resetMessage } = useAppSelector((state) => state.auth)

    useEffect(() => {
        dispatch(clearAuthMessage())

        return () => {
            dispatch(clearAuthMessage())
        }
    }, [dispatch])

    const resetPasswordHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const trimmedEmail = email.trim()

        if (!trimmedEmail || !newPassword.trim() || !confirmPassword.trim()) {
            setFormError(t('auth.forgot.requiredError'))
            return
        }

        if (newPassword.length < 6) {
            setFormError(t('auth.forgot.passwordLengthError'))
            return
        }

        if (newPassword !== confirmPassword) {
            setFormError(t('auth.forgot.alertMismatch'))
            return
        }

        setFormError("")
        dispatch(forgotPasswordRequest({ email: trimmedEmail, newPassword }))
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
                    <BrandTitle>{t('auth.forgot.title')}</BrandTitle>
                    <BrandDescription>{t('auth.forgot.descriptionReset')}</BrandDescription>
                </BrandContent>
            </BrandPanel>

            <LoginPanel>
                <LoginCard>
                    <Title>{t('auth.forgot.title')}</Title>
                    <HelperText>{t('auth.forgot.descriptionReset')}</HelperText>

                    <Form onSubmit={resetPasswordHandler}>
                        <FieldGroup>
                            {t('auth.forgot.emailLabel')}
                            <InputWrapper>
                                <InputFiled
                                    type="email"
                                    placeholder={t('auth.forgot.emailPlaceholder')}
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </InputWrapper>
                        </FieldGroup>

                        <FieldGroup>
                            {t('auth.forgot.newPasswordLabel')}
                            <InputWrapper>
                                <InputFiled
                                    type="password"
                                    placeholder={t('auth.forgot.newPasswordPlaceholder')}
                                    value={newPassword}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </InputWrapper>
                        </FieldGroup>

                        <FieldGroup>
                            {t('auth.forgot.confirmPasswordLabel')}
                            <InputWrapper>
                                <InputFiled
                                    type="password"
                                    placeholder={t('auth.forgot.confirmPasswordPlaceholder')}
                                    value={confirmPassword}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </InputWrapper>
                        </FieldGroup>

                        {formError && <ErrorText>{formError}</ErrorText>}
                        {!formError && serverError && <ErrorText>{serverError}</ErrorText>}
                        {resetMessage && <SuccessText>{resetMessage}</SuccessText>}

                        <Button type="submit" disabled={isLoading}>
                            <KeyRound size={17} />
                            {isLoading ? t('auth.forgot.resettingPassword') : t('auth.forgot.resetPassword')}
                        </Button>

                        <LinkRow>
                            <ForgetButton type="button" onClick={() => navigate("/login")}>
                                <ArrowLeft size={15} />
                                {t('auth.forgot.backToSignIn')}
                            </ForgetButton>
                        </LinkRow>
                    </Form>
                </LoginCard>
            </LoginPanel>
        </Container>
    )
}

export default ForgotPasswordPage

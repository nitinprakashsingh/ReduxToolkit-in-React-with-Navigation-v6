import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
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
} from "../Auth.styles"

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isEmailConfirmed, setEmailConfirmed] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation()

    const redirectToLoginPage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (isEmailConfirmed) {
            if (newPassword === confirmPassword) {
                alert(t('auth.forgot.alertSuccess'))
                navigate("/login")
            } else {
                alert(t('auth.forgot.alertMismatch'))
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
                        <BrandSubText>{t('auth.brandSubText')}</BrandSubText>
                    </div>
                </BrandTop>

                <BrandContent>
                    <BrandTitle>{t('auth.forgot.title')}</BrandTitle>
                    <BrandDescription>{t('auth.forgot.descriptionEmail')}</BrandDescription>
                </BrandContent>
            </BrandPanel>

            <LoginPanel>
                <LoginCard>
                    <Title>{t('auth.forgot.title')}</Title>
                    <HelperText>
                        {isEmailConfirmed
                            ? t('auth.forgot.descriptionReset')
                            : t('auth.forgot.descriptionEmail')}
                    </HelperText>

                    <Form onSubmit={redirectToLoginPage}>
                        <FieldGroup>
                            {t('auth.forgot.emailLabel')}
                            <InputField
                                type="email"
                                placeholder={t('auth.forgot.emailPlaceholder')}
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </FieldGroup>

                        {isEmailConfirmed && (
                            <>
                                <FieldGroup>
                                    {t('auth.forgot.newPasswordLabel')}
                                    <InputField
                                        type="password"
                                        placeholder={t('auth.forgot.newPasswordPlaceholder')}
                                        value={newPassword}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />
                                </FieldGroup>

                                <FieldGroup>
                                    {t('auth.forgot.confirmPasswordLabel')}
                                    <InputField
                                        type="password"
                                        placeholder={t('auth.forgot.confirmPasswordPlaceholder')}
                                        value={confirmPassword}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </FieldGroup>
                            </>
                        )}

                        <Button type="submit">
                            {isEmailConfirmed ? t('auth.forgot.resetPassword') : t('auth.forgot.sendResetLink')}
                        </Button>

                        <LinkRow>
                            <ForgetButton type="button" onClick={() => navigate("/login")}> 
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

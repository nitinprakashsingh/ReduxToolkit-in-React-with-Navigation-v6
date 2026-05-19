import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import HoriOmLogo from "../../../../Assets/HoriOmLogo.png"
import InputField from "../../components/InputFileds"
import { useAppDispatch, useAppSelector } from "../../../../Store/types"
import { signupRequest } from "../../authSlice"
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
    ErrorText,
    Button,
    LinkRow,
    ForgetButton,
} from "../Auth.styles"

const SignUpPage = () => {
    const [name, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const { isLoading, error: serverError, user } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (hasSubmitted && !isLoading && !serverError && user) {
            navigate('/login')
        }
    }, [hasSubmitted, isLoading, serverError, user, navigate])

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formErrors: Record<string, string> = {}

        if (!name || name.trim() === "") {
            formErrors.name = "Name is required"
        }
        if (!email || email.trim() === "") {
            formErrors.email = "Email is required"
        }
        if (!password || password.trim() === "") {
            formErrors.password = "Password is required"
        }
        if (!mobile || mobile.trim() === "") {
            formErrors.mobile = "Mobile number is required"
        }
        if (!address || address.trim() === "") {
            formErrors.address = "Address is required"
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
            return
        }

        setErrors({})
        dispatch(signupRequest({ name, email, password, mobile, address }))
        setHasSubmitted(true)
    }

    return (
        <Container>
            <BrandPanel>
                <BrandTop>
                    <LogoMark src={HoriOmLogo} alt="Hari Om Seva Sansta logo" />
                    <div>
                        <BrandName>Shriyan Cares</BrandName>
                        <BrandSubText>{t('auth.brandSubText')}</BrandSubText>
                    </div>
                </BrandTop>

                <BrandContent>
                    <BrandTitle>{t('auth.signup.title')}</BrandTitle>
                    <BrandDescription>{t('auth.signup.description')}</BrandDescription>
                </BrandContent>
            </BrandPanel>

            <LoginPanel>
                <LoginCard>
                    <Title>{t('auth.signup.cardHeader')}</Title>
                    <HelperText>{t('auth.signup.helperText')}</HelperText>

                    <Form onSubmit={submitHandler}>
                        <FieldGroup>
                            {t('auth.signup.nameLabel')}
                            <InputField
                                type="text"
                                placeholder={t('auth.signup.namePlaceholder')}
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                                    setUserName(e.target.value)
                                    setErrors((prev) => ({ ...prev, name: "" }));
                                }
                                }
                            />
                            {errors.name && <ErrorText>{errors.name}</ErrorText>}
                        </FieldGroup>

                        <FieldGroup>
                            {t('auth.signup.emailLabel')}
                            <InputField
                                type="email"
                                placeholder={t('auth.signup.emailPlaceholder')}
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                                    setEmail(e.target.value)
                                    setErrors((prev) => ({ ...prev, email: "" }));
                                }
                                }
                            />
                            {errors.email && <ErrorText>{errors.email}</ErrorText>}
                        </FieldGroup>

                        <FieldGroup>
                            {t('auth.signup.passwordLabel')}
                            <InputField
                                type="password"
                                placeholder={t('auth.signup.passwordPlaceholder')}
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                                    setPassword(e.target.value)
                                    setErrors((prev) => ({ ...prev, password: "" })); 
                                }
                                }
                            />
                            {errors.password && <ErrorText>{errors.password}</ErrorText>}
                        </FieldGroup>

                        <FieldGroup>
                            {t('auth.signup.mobileLabel')}
                            <InputField
                                type="tel"
                                placeholder="9876543210"
                                value={mobile}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{     
                                    setErrors((prev) => ({ ...prev, mobile: "" }));
                                    setMobile(e.target.value)
                                }
                                }
                            />
                            {errors.mobile && <ErrorText>{errors.mobile}</ErrorText>}
                        </FieldGroup>

                        <FieldGroup>
                            {t('auth.signup.addressLabel')}
                            <InputField
                                type="text"
                                placeholder={t('auth.signup.addressPlaceholder')}
                                value={address}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                                    setErrors((prev) => ({ ...prev, address: "" }));
                                    setAddress(e.target.value)
                                }
                                }
                            />
                            {errors.address && <ErrorText>{errors.address}</ErrorText>}
                        </FieldGroup>

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating account...' : t('auth.signup.submitButton')}
                        </Button>

                        {hasSubmitted && serverError ? <ErrorText>{serverError}</ErrorText> : null}

                        <LinkRow>
                            <ForgetButton type="button" onClick={() => navigate("/login")}>
                                {t('auth.signup.backToSignIn')}
                            </ForgetButton>
                        </LinkRow>
                    </Form>
                </LoginCard>
            </LoginPanel>
        </Container>
    )
}
export default SignUpPage

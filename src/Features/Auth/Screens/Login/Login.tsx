import { Eye, EyeOff, LogIn } from "lucide-react"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
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
    ErrorText,
    FieldGroup,
    ForgetButton,
    Form,
    HelperText,
    IconButton,
    InputFiled,
    InputWrapper,
    LinkRow,
    LoginCard,
    LoginPanel,
    LogoMark,
    StatGrid,
    StatItem,
    StatLabel,
    StatValue,
    Title,
} from "./Login.style"

const LoginPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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
                        <BrandSubText>Hospital web panel</BrandSubText>
                    </div>
                </BrandTop>

                <BrandContent>
                    <BrandTitle>Manage hospital operations from one simple panel.</BrandTitle>
                    <BrandDescription>
                        Track doctors, patients, appointments, packages, departments, and
                        disease records with a clean pilot-ready workspace.
                    </BrandDescription>

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
                    <Title>Welcome back</Title>
                    <HelperText>
                        Sign in to open your hospital dashboard and continue daily work.
                    </HelperText>

                    <Form onSubmit={submitButtonHandler}>
                        <FieldGroup>
                            Email address
                            <InputWrapper>
                                <InputFiled
                                    type="email"
                                    placeholder="admin@hospital.com"
                                    value={userName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </InputWrapper>
                        </FieldGroup>

                        <FieldGroup>
                            Password
                            <InputWrapper>
                                <InputFiled
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <IconButton
                                    type="button"
                                    title={showPassword ? "Hide password" : "Show password"}
                                    onClick={() => setShowPassword((current) => !current)}
                                >
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </IconButton>
                            </InputWrapper>
                        </FieldGroup>

                        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

                        <Button type="submit">
                            <LogIn size={17} />
                            Sign In
                        </Button>

                        <LinkRow>
                            <ForgetButton type="button" onClick={signUpButtonHandler}>
                                Create account
                            </ForgetButton>
                            <ForgetButton type="button" onClick={forgetButtonHandler}>
                                Forgot password?
                            </ForgetButton>
                        </LinkRow>
                    </Form>
                </LoginCard>
            </LoginPanel>
        </Container>
    )
}
export default LoginPage

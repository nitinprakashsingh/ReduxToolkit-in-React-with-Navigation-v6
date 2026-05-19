import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import HoriOmLogo from "../../../../Assets/HoriOmLogo.png"
import InputField from "../../components/InputFileds"
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

const SignUpPage = () => {
    const [name, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate()

    const submitHandler=()=>{
      console.log("Name:", name)
      console.log("Email:", email)
      console.log("Password:", password)
      console.log("Mobile:", mobile)
      console.log("Address:", address)
    }

    const signUpButtonHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        navigate("/login")
    }

    return (
        <Container>
            <BrandPanel>
                <BrandTop>
                    <LogoMark src={HoriOmLogo} alt="Hari Om Seva Sansta logo" />
                    <div>
                        <BrandName>Shriyan Cares</BrandName>
                        <BrandSubText>Hospital web panel</BrandSubText>
                    </div>
                </BrandTop>

                <BrandContent>
                    <BrandTitle>Register your account</BrandTitle>
                    <BrandDescription>
                        Create a secure account to manage doctors, patients, appointments,
                        departments, packages and disease records in one place.
                    </BrandDescription>
                </BrandContent>
            </BrandPanel>

            <LoginPanel>
                <LoginCard>
                    <Title>Create account</Title>
                    <HelperText>
                        Fill in your details to get started with the hospital dashboard.
                    </HelperText>

                    <Form onSubmit={signUpButtonHandler}>
                        <FieldGroup>
                            Name
                            <InputField
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setUserName(e.target.value)
                                }
                            />
                        </FieldGroup>

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

                        <FieldGroup>
                            Password
                            <InputField
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </FieldGroup>

                        <FieldGroup>
                            Mobile number
                            <InputField
                                type="tel"
                                placeholder="9876543210"
                                value={mobile}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setMobile(e.target.value)
                                }
                            />
                        </FieldGroup>

                        <FieldGroup>
                            Address
                            <InputField
                                type="text"
                                placeholder="Hospital or clinic address"
                                value={address}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setAddress(e.target.value)
                                }
                            />
                        </FieldGroup>

                        <Button type="submit"
                        onClick={submitHandler}
                        >Create account</Button>

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
export default SignUpPage

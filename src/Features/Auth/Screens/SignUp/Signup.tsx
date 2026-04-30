import React, { useEffect, useState } from "react";
import { Container } from "./Signup.styles";
import InputField from "../../components/InputFileds";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const [name, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate()

    const singUpButtonHandler = () => {
        navigate("/login")
    }

    return (
        <Container>
            <h2>SignUp Page</h2>
            <>
                <InputField
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserName(e.target.value)
                    }
                />
                <InputField
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                />
                <InputField
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMobile(e.target.value)
                    }
                />
                <InputField
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAddress(e.target.value)
                    }
                />
            </>
            <button onClick={singUpButtonHandler}>Submit</button>
        </Container>
    )
}
export default SignUpPage
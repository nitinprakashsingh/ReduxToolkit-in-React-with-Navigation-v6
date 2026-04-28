import { useState, useEffect } from "react"
import { Container, Button } from "./Forgot.style"
import InputField from "../../components/InputFileds/EmailInput"
import { useNavigate } from "react-router-dom"


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isEmailConfirmed, setEmailConfirmed] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        console.log("Email: ", email)
    }, [email])

    const redirectToLoginPage = () => {
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
            <h2>Forgot Password Page</h2>
            <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
            />
            {isEmailConfirmed && (
                <>
                    <InputField
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewPassword(e.target.value)
                        }
                    />

                    <InputField
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setConfirmPassword(e.target.value)
                        }
                    />
                </>
            )
            }
            <Button onClick={() => redirectToLoginPage()}>Submit</Button>
        </Container>
    )

}
export default ForgotPasswordPage
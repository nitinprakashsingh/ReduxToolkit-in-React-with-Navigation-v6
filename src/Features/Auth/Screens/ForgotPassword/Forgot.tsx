import {useState, useEffect} from "react"
import { Container,Button } from "./Forgot.style"
import InputField from "../../components/InputFileds/EmailInput"



const ForgotPasswordPage =()=>{
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isEmailConfirmed, setEmailConfirmed] = useState(false)

    useEffect(()=>{
        console.log("Email: ", email)
    }, [email])

    return(
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
            <Button onClick={()=>setEmailConfirmed(true)}>Submit</Button>
        </Container>
    )

}
export default ForgotPasswordPage
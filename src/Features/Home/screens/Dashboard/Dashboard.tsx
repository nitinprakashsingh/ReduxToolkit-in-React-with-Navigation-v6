import React,{useEffect} from "react"
import { Container,Card,CardWrapper, Sidebar, Content } from "../Dashboard/Dashboard.style"
import { useAppSelector } from "../../../../Store/types"

const HomePage =()=>{
    const user = useAppSelector((state) => state.auth.user)
    useEffect(()=>{

    }, [])
    const data = [{id: 1,title: "Hospital Availability"},{id:2,title: "Booking"},{id: 3,title: "Manage Beds"},{id: 4,title: "Our Package"},{id: 5,title: "Add Schedule"}]

      return(
        <Container>
            <Sidebar>
                <h2>Email: {user.email}</h2>
                <h2>Password: {user.password} </h2>
            </Sidebar>
            <Content>
                <CardWrapper>
                    {data.map((item) => <Card key={item.id}>{item.title}</Card>)}
                </CardWrapper>
            </Content>
        </Container>
      )
}
export default HomePage
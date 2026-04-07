import React,{useEffect, useState} from "react"
import { Container,Card,CardWrapper, Sidebar, Content } from "../Dashboard/Dashboard.style"
import { useAppSelector,useAppDispatch } from "../../../../Store/types"
import { fetchPostsRequest } from "../dashboardSlice"

const HomePage =()=>{
    const user = useAppSelector((state) => state.auth.user)
    const dispatch = useAppDispatch()
    const {data, isLoading, error} = useAppSelector((state) => state.dashboard)
    useEffect(()=>{
        dispatch(fetchPostsRequest())
    }, [dispatch])
    
    if(isLoading) return <h2>Loading...</h2>
    if(error) return <h2>Error: {error}</h2>
    

      return(
        <Container>
            <Sidebar>
                <h2>Email: {user ? user.email : "Hello Brother"}</h2>
                <h2>Password: {user ? user.password : "Test"} </h2>
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
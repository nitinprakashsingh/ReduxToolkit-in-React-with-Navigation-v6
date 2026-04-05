import styled from "styled-components";

export const  Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: center;`

export  const InputFiled = styled.input`
    padding: 10px;
    margin: 10px;
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;`

export const Button = styled.button`
    padding: 10px 20px;
    margin: 10px;
    width: 200px; 
    height: 40px;
    background-color: #007bff; 
    color: white;
    border-radius: 4px;
    border: none;
    &:hover {
        background-color: #b3004b; 
    };
   `
export const ForgetButton = styled.button`
    padding: 10px 20px;
    margin: 10px;
    width: 200px;
    border: none;
    &:hover{
    background-color: #b3004b;
    color: white;}
    `


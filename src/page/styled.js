import styled from 'styled-components';
import { primary } from '../styles/colors';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    height: auto;
    background: #000;
    font-family: 'sailec-regular', sans-serif;

    font-weight: 700;
`;
export const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    
    span{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        justify-content: center;
        align-items: center;
    }
`;
export const ContainerForm = styled.div`
    width: 100%;
    min-width: 200px;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background: #fff;
    display:flex;
    flex-direction: column;
    position: relative;
    font-size: 18px;
    h1{
        text-align: center;
        text-transform: uppercase;
    }
    p{
        font-size: 10px;
    }
`;
export const PostalCodes = styled.div`
    display: flex;
    width: 100%;
    height: 30%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    div{
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
`;
export const AlertError = styled.p`
    color: red;
    visibility: ${(props) => props.alertVisible ? 'visible' : 'hidden'};
`;
export const AlertErrorInput = styled.p`
    color: red;
    visibility: ${(props) => props.alertErrorVisible ? 'visible' : 'hidden'};
`;

export const Label = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: auto;
    height: 15%;
    padding: 5px;
    position: relative;
    margin-top: 5px;
    input{
        border: none;
        background: none;
        margin-left: 15px;
        margin-top: 10px;
        height: 20px;
        width: 200px;
        border-bottom: 2px solid ${primary};
        text-align: center;
        :focus{
            outline: 2px solid ${primary};
            border-bottom: none;
            background: none;
        }
    }
`;
export const ContainerInputs = styled.div`
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
`;

export const ButtonSubmit = styled.button`
    width: 200px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background: #000;
    color: #fff;
    font-weight: bold ;
    font-size: 18px;
    cursor: pointer;
    position: relative;
    :hover{
        background: ${primary};
        opacity: 0.7;
        transition: 0.2s;
    }
`;
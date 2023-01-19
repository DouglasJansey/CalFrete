import styled from 'styled-components';
import { primary } from '../../styles/colors';
export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 550px;
    background: #000;
    font-family: 'Signika Negative', sans-serif;
    font-weight: 700;
`;
export const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2px;
    
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
    width: 70%;
    min-width: 200px;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background: #fff;
    display:flex;
    flex-direction: column;
    position: relative;
    padding: 15px;
    h1{
        text-align: center;
    }
`;
export const PostalCodes = styled.div`
    display: flex;
    width: 100%;
    height: 30%;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;
export const PopUp = styled.span`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background: ${primary};
    color: #fff;
    font-size: 18px;
    visibility: ${(props) => props.active ? 'visible' : 'hidden'};
    padding: 10px 25px;
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        
    }
`;
export const AlertError = styled.p`
    color: red;
    visibility: ${(props) => props.alertVisible ? 'visible' : 'hidden'};
    
`;
export const ContainerPopUp = styled.span`
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 5px;

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
    margin-top: 15px;
    input{
        border: none;
        height: 25px;
        margin-top: 15px;
        padding: 2px;
        width: 155px;
        margin-left: 10px;
        border-bottom: 2px solid ${primary};

        :focus{
            outline: 2px solid ${primary};
            border-bottom: none;
            padding: 2px;
            background: none;
        }
    }
`;
export const Select = styled.select`
        border: none;
        background: none;
        height: 25px;
        padding: 2px;
        width: 200px;
        margin-left: 10px;
        border-bottom: 2px solid ${primary};
        padding: 2px;
        text-align: center;
        margin-top: 5px;
        :focus{
            outline: 2px solid ${primary};
            border-bottom: none;
            padding: 2px;
            background: none;
        }
        option{
            color: ${primary};
            font-size: 13px;
            padding: 10px;
           
        }
`;

export const ButtonSubmit = styled.button`
    margin-top: 20px;
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
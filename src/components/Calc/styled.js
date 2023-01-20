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
export const AlertErrorKg = styled.p`
    color: red;
    visibility: ${(props) => props.alertError ? 'visible' : 'hidden'};
    
`;
export const ContainerPopUp = styled.span`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
`;
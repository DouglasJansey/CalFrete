import styled from 'styled-components';
import { primary } from '../../styles/colors';

export const PopUp = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background: ${primary};
    color: #fff;
    font-size: 20px;
    display: ${(props) => props.active ? '' : 'none'};
    padding: 15px 35px;
    margin: 10px;
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        
    }
`;
export const AlertError = styled.div`
    color: red;
    display: ${(props) => props.alertVisible ? '' : 'none'};

    
    `;
export const AlertErrorKg = styled.div`
    color: red;
    display: ${(props) => props.alertError ? '' : 'none'};    
  
`;
export const ContainerPopUp = styled.span`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    div{
        margin-top: 10px;
    }
`;
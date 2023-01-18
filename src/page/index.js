/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import TablePrice from '../components/Address';

import {
    Container, ContainerForm, PostalCodes, Select,
    Label, Form, PopUp, ContainerPopUp, ButtonSubmit, AlertError,
} from './styled';
import { distritos } from '../components/Distritos';

export default function Calculator() {
    const loader = new Loader({
        apiKey: process.env.REACT_APP_API_KEY,
        version: "weekly",
      })
   // const service = new window.google.maps.DistanceMatrixService();
    let visible = true;
    let alert = false;
    let isValid = false;
    const [err, setErr] = useState(false);
    const [cepOrigem, setCepOrigem] = useState('');
    const [cepDestino, setCepDestino] = useState('');
    const [peso, setPeso] = useState('');
    const [distance, setDistance] = useState('');
    const [CalcTabela, setCalcTabela] = useState(cepDestino);


    useEffect(() => {
        loader.load().then(() =>{
            const service = new window.google.maps.DistanceMatrixService();
        if (cepOrigem && cepDestino) {
                service.getDistanceMatrix(
                {
                    origins: [cepOrigem],
                    destinations: [cepDestino],
                    travelMode: 'DRIVING',
                },(res)=> GetAddress(res))
            }
        })
    }, [cepDestino, cepOrigem, peso]);
    
    function GetAddress(data) {
        const destination = data.destinationAddresses[0].split(', ');
        const origin = data.originAddresses[0].split(', ');
        const obj = { peso, destination: destination[0].replace(/\d.*\d./,"") }
        if (!cepOrigem || !cepDestino) isValid = true;
        (!destination.includes('Portugal') || !origin.includes('Portugal'))
        ? setErr(true) : setErr(false);
        setCalcTabela(obj);
           // if(origin[0] === destination[0]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        //pegando os valores dos inputs após o submit
        setCepOrigem(e.target['origin'].value);
        setCepDestino(e.target['destination'].value);
        setPeso(e.target['weight'].value);
        
    }

    return (
        <Container>
            <ContainerForm>
                <h1>Faça uma Simulação</h1>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <PostalCodes>
                        <Label>
                            De onde:
                            <Select name="origin">
                                <option hidden defaultChecked value=''>Qual é o Distrito?*</option>
                                {distritos.map((item, index) => (
                                    <option name="ceporigin" key={index} value={item.value}>
                                        {item}</option>
                                ))}
                            </Select>
                        </Label>
                        <Label>
                            Para onde:
                            <Select name="destination">
                                <option hidden defaultChecked value=''>Qual é o Distrito?*</option>
                                {distritos.map((item, index) => (
                                    <option name="cepdestino" key={index} value={item.value}>
                                        {item}</option>
                                ))}
                            </Select>
                        </Label>
                    </PostalCodes>
                    <span>
                        <Label>
                            Qual a dimensão da sua encomenda:
                            <PostalCodes>
                                <Select name='weight' type="text">
                                    <option hidden defaultChecked value=''>Qual é o Peso?*</option>
                                    <option value="1kg">1kg</option>
                                    <option value="2kg">2kg</option>
                                    <option value="5kg" >5kg</option>
                                </Select>
                            </PostalCodes>
                        </Label>
                    </span>
                    <ButtonSubmit type='submit'> Simular </ButtonSubmit>
                </Form>
                <ContainerPopUp>
                    <PopUp active={visible} >
                       <TablePrice props={CalcTabela}/>
                    </PopUp>
                    <AlertError alertVisible={alert}>No momento só estamos entregando em Portugal</AlertError>
                </ContainerPopUp>
            </ContainerForm>
        </Container >
    )
}
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { googleMaps } from '../components/googleMap';

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
    let visible = false;
    let alert = false;
    let isValid = false;
    const [err, setErr] = useState(false);
    const [cepOrigem, setCepOrigem] = useState('');
    const [cepDestino, setCepDestino] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const total = calcTotal(distance || '');

    useEffect(() => {
        loader.load().then(() =>{
        if (cepOrigem && cepDestino) {
            const service = new window.google.maps.DistanceMatrixService();
                service.getDistanceMatrix(
                {
                    origins: [cepOrigem],
                    destinations: [cepDestino],
                    travelMode: 'DRIVING',
                },(res)=> dataFilter(res))
            }
        })
    }, [cepDestino, cepOrigem]);

    function calcTotal(distance) {
        if (err && (cepOrigem && cepDestino)) alert = true;
        if (distance && !err) {
            alert = false;
            const value = 0.20;
            const dist = parseFloat(distance).toFixed(2) || 0;
            let total = 0;
            total = value * dist;
            if (total > 0) visible = true;

            return total.toFixed(2);
        }
        return '';
    }
    function dataFilter(data) {
        GetAddress(data)
        if (data && data.rows) {
            const { status } = data.rows[0].elements[0];
            if (status === 'OK') {
                const info = data.rows[0].elements[0];
                for (let key in info) {
                    if (key === 'distance') {
                        const valueDistance = Math.round(info.distance.value / 1000);
                        const valueDuration = info.duration.text;
                        setDistance(valueDistance);
                        setDuration(valueDuration);
                    }
                }
            }
        }
    }
    function GetAddress(data) {
        const destination = data.destinationAddresses[0].split(', ');
        const origin = data.originAddresses[0].split(', ');
        if (!cepOrigem || !cepDestino) isValid = true;
        (!destination.includes('Portugal') || !origin.includes('Portugal'))
            ? setErr(true) : setErr(false);
           // if(origin[0] === destination[0]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        //pegando os valores dos inputs após o submit

        setCepOrigem(e.target['origin'].value);
        setCepDestino(e.target['destination'].value);
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
                                <input type="text" placeholder='Altura(cm)' />
                                <input type="text" placeholder='Comprimento(cm)' />
                                <input type="text" placeholder='Largura(cm)' />
                                <input type="text" placeholder='Número de volumes' />
                            </PostalCodes>
                        </Label>
                    </span>
                    <ButtonSubmit type='submit'> Simular </ButtonSubmit>
                </Form>
                <ContainerPopUp>
                    <PopUp active={visible} >
                        <div>Valor do frete: {visible ? total : ''}€</div>
                    </PopUp>
                    <AlertError alertVisible={alert}>No momento só estamos entregando em Portugal</AlertError>
                </ContainerPopUp>
            </ContainerForm>
        </Container >
    )
}
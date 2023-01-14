import { useState, useEffect } from 'react';
import axios from 'axios';
import { googleMaps } from '../components/googleMap';
import {
    Container, ContainerForm, PostalCodes, Select,
    Label, Form, PopUp, ContainerPopUp, ButtonSubmit, AlertError,
} from './styled';
import { distritos } from '../components/Distritos';

export default function Calculator() {
    let visible = false;
    let alert = false;
    let isValid = false;
    const [err, setErr] = useState(false);
    const [cepOrigem, setCepOrigem] = useState('');
    const [cepDestino, setCepDestino] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const total = calcTotal(distance || '');
    console.log(distritos);
    useEffect(() => {
        if (cepOrigem && cepDestino) {
            //chamando a função getData apenas se tiver cepOrigem e cepDestino
            async function getData() {
                axios(googleMaps(cepOrigem, cepDestino))
                    .then(res => res).then(response => {
                        dataFilter(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            getData();
        }
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
        GetAddress(data);
        if (data.rows) {
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
        const destination = data.destination_addresses[0].split(', ');
        const origin = data.origin_addresses[0].split(', ');
        if(!cepOrigem || !cepDestino) isValid = true;
        (!destination.includes('Portugal') || !origin.includes('Portugal'))
            ? setErr(true) : setErr(false);
    }
    console.log(isValid, cepDestino, cepOrigem);
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
                        <div>Tempo estimado de: {duration}</div>
                    </PopUp>
                    <AlertError alertVisible={alert}>No momento só estamos entregando em Portugal</AlertError>
                </ContainerPopUp>
            </ContainerForm>
        </Container >
    )
}
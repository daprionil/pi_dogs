import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import GroupPageDefault from "../components/GroupPageDefault";
import { useEffect, useState } from "react";

import getADog from "../controllers/getADog";
import SectionDefaultNullish from '../components/SectionDefaultNullish';
import Loader from '../base_components/Loader';
import CardDogDetail from '../components/CardDogDetail';
import { Title } from "react-head";

function DogPageDetails() {
    const {idDog} = useParams();
    const [dog, setDog] = useState({});
    const [loading, changeLoading] = useState(true);

    useEffect(() => {
        getADog({id:idDog}).then((dataDog) => {
            changeLoading(false);
            setDog(dataDog);
        });
    },[])

    return (
        <GroupPageDefault>
            <Title>Dogest - {dog?.name || 'Detail'}</Title>
            <DetailsPageDogStyled>
                {
                    loading ?
                        <Loader></Loader>
                    : dog?.name ?
                        <CardDogDetail {...dog}/>
                        : <SectionDefaultNullish message="La Raza que Intentas ver no ha sido Encontrada"/>
                }
            </DetailsPageDogStyled>
        </GroupPageDefault>
    );
}

const DetailsPageDogStyled = styled.div`
    width: 100%;
    height: 90vh;

    display:flex;
    align-items: center;
    justify-content: center;
`;

export default DogPageDetails;
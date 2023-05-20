import { useParams } from "react-router-dom";
import GroupPageDefault from "../components/GroupPageDefault";

function DogPageDetails() {
    const params = useParams();
    return (
        <GroupPageDefault>
            <p>Dog Detail {params.idDog}</p>
        </GroupPageDefault>
    );
}

export default DogPageDetails;
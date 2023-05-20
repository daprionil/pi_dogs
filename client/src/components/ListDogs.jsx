import CardDog from "./CardDog";

function ListDogs({dogs}) {
    return (
        <>
            {
                dogs && dogs.map((dog,i) => {
                    return <CardDog {...dog} key={i}/>
                })
            }
        </>
    );
}

export default ListDogs;
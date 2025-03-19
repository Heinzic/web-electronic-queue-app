import Cards from "../shared/Cards";

const cardData = [
    { title: "Дата и время", link: "/date"},
    { title: "Место", link: "/office"},
    { title: "Услуга", link: "/date"},
];

function Main() {
    return (
        <>
            <Cards cards={cardData} />
        </>
    );
}

export default Main;
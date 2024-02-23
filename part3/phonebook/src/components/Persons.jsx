const Persons = ({ personsToShow, deleteHandler}) => {
    return (
        <ul>
            {personsToShow.map(person => <li key={person.id}>
                {person.name} {person.number}
                <button onClick={() => deleteHandler(person.id, person.name)}>delete</button>
            </li>)}
        </ul>
    )
}
export default Persons
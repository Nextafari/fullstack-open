import PhoneBook from "./Phonebook"

const Persons = (props) => {
    let [...persons] = props.persons
    const [...filtered] = props.filtered
    const handleDelete = props.handleDelete
    
    if (filtered.length >= 1) {
        persons = filtered
    }

    return (
        <div>
            {
                persons.map(
                    person =>
                    <PhoneBook 
                        key={person.name}
                        id={person.id}
                        name={person.name}
                        phoneNumber={person.number}
                        handleDelete={handleDelete}
                    />
                )
            }
        </div>
    )
}

export default Persons

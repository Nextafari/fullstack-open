const PhoneBook = (props) => {
    const name = props.name
    const phoneNumber = props.phoneNumber
    const handlerFunc = props.handleDelete
    const id = props.id

    return (
        <li key={name}>
            {name} {phoneNumber}

            <button onClick={() => handlerFunc(id, name)}>delete</button>
        </li>
    )
}

export default PhoneBook

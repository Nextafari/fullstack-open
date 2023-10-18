import FormInput from "./FormInput"


const Form = (props) => {
    const {newName, handleOnSubmit, handleUserName, phoneNumber, handlePhoneNumber} = props

    return (
        <form onSubmit={handleOnSubmit}>
            <FormInput formTitle='name' data={newName} handlerFunc={handleUserName}/>
            <FormInput formTitle='number' data={phoneNumber} handlerFunc={handlePhoneNumber}/>

            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

export default Form

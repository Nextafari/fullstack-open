const FormInput = ({formTitle, data, handlerFunc}) => {
    return (
        <div>
            {formTitle}: <input value={data} onChange={handlerFunc}/>
        </div>
    )
}

export default FormInput

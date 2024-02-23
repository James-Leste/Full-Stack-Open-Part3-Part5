const Form = ({ newName, newNumber, handleInputName, handleInputNumber, addPerson }) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleInputName} />
            </div>
            <div>number: <input value={newNumber} onChange={handleInputNumber} /></div>

            <div>
                <button type="submit" onClick={addPerson}>add</button>
            </div>
        </form>
    )
}
export default Form
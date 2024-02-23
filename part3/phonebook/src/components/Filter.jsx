const Filter = ({newFilter, handleInputFilter}) =>{
    return (
        <div>filter shown with: <input value={newFilter} onChange={handleInputFilter} /></div>
    )
}
export default Filter
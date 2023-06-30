const Filter = ({newFilter, handleFilterChange}) => {
    return(
        <form>
            <div>
            filter shown with 
            <input value ={newFilter} 
            onChange={handleFilterChange}
            />
            </div>
        </form>
    )
    
}

export default Filter
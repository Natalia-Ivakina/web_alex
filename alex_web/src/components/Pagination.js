const PaginationComponent = ({inputVideosPerPage, handleVideosPerPageInputChange, handleSaveVideosPerPage}) => {
    return (
        <div>
            <p>How many videos do you want per page?</p>
            <input
                type="number"
                className="adminInput"
                value={inputVideosPerPage}
                onChange={handleVideosPerPageInputChange} // Update input field value
                min="1"
            />
            <button onClick={handleSaveVideosPerPage}>Save</button>
            {/* Apply the change on button click */}
        </div>
    );
};

export default PaginationComponent;
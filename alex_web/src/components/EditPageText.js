import {useEffect, useState} from "react";

const EditPageTextComponent = ({apiType}) => {

    return (
        <div className="edit-form">
            <h4>Edit Text</h4>
            <form id="" className="form-container">
                <div className="row">
                    <input
                        type='text'
                        value="Title"
                        required
                    />
                    <input
                        type='text'
                        value="Text1"
                        required
                    /></div>
                <div className="row">
                    <input
                        type='text'
                        value="Text2"
                        required
                    />
                    <input
                        type='text'
                        value="Text3"
                        required
                    /></div>
                <button type="submit">Edit Text</button>
            </form>
        </div>
    );
};

export default EditPageTextComponent;
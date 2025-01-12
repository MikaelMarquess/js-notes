import React, {useState, Fragment, useEffect} from "react";
import notesServices from "../../services/notesServices";
import ListNotes from "../notes/list";
import {push as Menu} from "react-burger-menu"
import Editor from "../editor/index"
import SearchNotes from "../notes/list/search";
import "../../styles/notes.scss"



const Notes = (props) => {
    const [notes, setNotes] = useState([])
    const [current_note, setCurrentNotes] = useState({title: "", body: "", _id: ""})
    const [viewEditor, setViewEditor] = useState(false)

    const handleStateChange = (state) => {
        props.setIsOpen(state.isOpen)
    }

useEffect(() => {
    fetchNotes()
}, [])

const fetchNotes = async() => {
    const response = await notesServices.index()
        if(response.data.allNotes.length >= 1){
            setNotes(response.data.allNotes.reverse())
            setCurrentNotes(response.data.allNotes[0])
            setViewEditor(true)
        }else{
            setNotes([])
            setCurrentNotes([])
            setViewEditor(false)
        }
}

const newNote = async() => {
    const response = await notesServices.newNote()
    if(response){
        console.log(response)
        fetchNotes()
    }else{
        alert("Tente novamente")
    }
}

const searchNotes = async(query) => {
    const response = await notesServices.searchNote(query)
    console.log(response)
    setNotes(response.data.note)
}

const deleteNote = async(note) => {
    const response = await notesServices.deleteNote(note._id)
    if(response){
        fetchNotes()
    }else{
        alert("Tente novamente")
    }
}

const updateNote = async (oldNote, params) => {
    const response = await notesServices.updateNote(oldNote._id, params);
    if (response.data && response.data.putNote) {
        // Substituir a nota atualizada no array
        const updatedNote = response.data.putNote;
        const newNotes = notes.map((note) =>
            note._id === oldNote._id ? updatedNote : note
        );

        setNotes(newNotes);
        setCurrentNotes(updatedNote);        
     }
};


const selectNote = (id) => {
    const note = notes.find((note) => {
        return note._id === id
    })
    setCurrentNotes(note)
}
    return(
        <Fragment>
            <div className="columns notes">
                <Menu
                pageWrapId={"notes-editor"}
                isOpen={props.isOpen}
                onStateChange={handleStateChange}
                disableAutoFocus
                outerContainerId={"notes"}
                customBurgerIcon={false}
                customCrossIcon={false}
                
                >
                <div className="columns">
                    <div className="column is-four-fifths">
                        <SearchNotes search={searchNotes} fetchNotes={fetchNotes}/>
                    </div>
                    <div className="column">
                        <div className="list">
                            <ListNotes
                            notes={notes}
                            selectNote={selectNote}
                            current_note={current_note}
                            new_note={newNote}
                            delete_note={deleteNote}
                            />
                        </div>
                    </div>
                </div>
                </Menu>
                <div className="column is-12 notes-editor" id="notes-editor">
                    {viewEditor &&(<Editor 
                    note={current_note}
                    updateNote={updateNote}
                    fetchNotes={fetchNotes}
                    />)}
                </div>
            
            </div>
        </Fragment>
    )
}

export default Notes
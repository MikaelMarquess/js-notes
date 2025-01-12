import React, {Fragment} from "react";
import Moment from "moment/moment";
import "../../../styles/burguer-notes.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ListNotes = (props) => {
    return(
        <Fragment>
            <div className="columns is-multiline" breakpoint="mobile">
                <div className="column is-flex is-align-items-center is-justify-content-space-between">
                    <p className="title is-6 has-text-black">{props.notes.length} Notas</p>
                    <button className="button new-note" onClick={() => props.new_note()}>+</button>
                </div>
                <div className="column is-full">
                    <ul className="list notes-list">
                        {props.notes.map((item, key) => (
                            <li 
                            key={key} 
                            className={`list-item ${item._id === props.current_note._id ? "active" : ""}`}  
                            onClick={()  => 
                                props.selectNote(item._id)}
                                
                            >
                                <p className="title is-5 has-text-black mb-1">
                                    {item.title.replace(/(<([^>]+)>)/ig, "").substring(0, 15)}
                                </p>
                                <p className="paragraph has-text-black m-0" subtitle spaced={false}>
                                {item.body.replace(/(<([^>]+)>)/ig, "").substring(0, 30)}
                                </p>
                                <div className="custom-left is-flex is-align-items-center is-justify-content-space-between" breakpoint="mobile">
                                    <span className="tag is-black">
                                        {Moment(item.created_at).format("DD/MM")}
                                    </span>
                                    <div className="trash">
                                    <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() => props.delete_note(item)}
                                    color="grey"
                                    />
                                </div>
                                </div>
                                
                            </li>
                            
                        ))}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default ListNotes
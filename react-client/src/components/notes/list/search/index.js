import React, {Fragment, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


const SearchNotes = (props) => {
const [query, setQuery] = useState("")

const handleKeyDown = (e) => {
    if(e.key == 'Enter'){
        props.search(query)
    }
}

    return(
    <Fragment>
       <div className="columns is-centered" >
            <div className="column is-9 search-input" >
                <input
                type="text"
                name={query}
                value={query}
                placeholder="Procurar..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                />
            </div>
            
                <button className="cancel-button" href="#" onClick={() =>
                     {
                        props.fetchNotes()
                        setQuery('')
                     }}>
                    <FontAwesomeIcon
                    icon={faTimes}
                    color="grey"
                    className="is-pulled-left"
                    />
                </button>
            
       </div>
    </Fragment>
  )
}

export default SearchNotes
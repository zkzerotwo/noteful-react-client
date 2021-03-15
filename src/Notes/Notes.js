import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'
import config from '../config'
import './Notes.css'
// import format from 'date-fns/format'


export default class Notes extends React.Component {
    static defaultProps = {
        onDeleteNote: () => {},
    }
    
    static contextType = NotefulContext;
    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id
        console.log(noteId)
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
            })
            .then(() => {
                this.context.deleteNote(noteId)
                this.props.onDeleteNote(noteId)
            })
            .catch(error => {
                console.error({ error })
            })
    }
    render() {
        const { name, id, modified } = this.props;
        console.log(this.props)
        return (
            <div className='Notes'>
                <h2 className='Notes__title'>
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button 
                className='Notes__delete' 
                type='button' 
                onClick={this.handleClickDelete}>
                    {' '}
        remove
      </button>
                <div className='Notes__dates'>
                    <div className='Notes__dates-modified'>
                        Modified
          {' '}
                        <span className='Date'>
                            {/* {format(new Date(modified), "uuuu MM do XXXXX ")} */}
                            {modified}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

Notes.propTypes = {
    modified: PropTypes.string,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}
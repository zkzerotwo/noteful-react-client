
import React from 'react'
import PropTypes from 'prop-types'
import NotefulContext from '../NotefulContext'
import CircleButton from '../CircleButton/CircleButton'
import './FolderListSide.css'
import { NavLink, Link } from 'react-router-dom'
import { countNotesForFolder } from '../folderFinders'

class FolderListSide extends React.Component {
    static contextType = NotefulContext;

    render() {
        const { folders = [], notes = [] } = this.context
        // console.log(this.context)
        return (
            <div className='FolderListSide'>
                <ul className='FolderListSide__list'>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='FolderListSide__folder-link'
                                to={`/folder/${folder.id}`}
                            >
                                <span className='FolderListSide__num-notes'>
                                    {countNotesForFolder(notes, folder.id)}
                                </span>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='FolderListSide__button-wrapper'>
                    <CircleButton
                        tag={Link}
                        to='/add-folder'
                        type='button'
                        className='FolderListSide__add-folder-button'
                    >
          Add Folder +
        </CircleButton>
                </div>
            </div>
        )
    }
}


export default FolderListSide;

FolderListSide.propTypes = {
    folder: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    })),
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired,
        modified: PropTypes.string.isRequired
    }))
}
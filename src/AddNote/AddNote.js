import React from 'react';
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';
import config from '../config';
import ValidationError from '../ValidationError';

class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            folderId: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            }
        }
    }


    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    static contextType = NotefulContext

    updateFolderId = (folderId) => {
        this.setState({
            folderId: {
                value: folderId,
                touched: true
            }
        })
        console.log(folderId)
    }

    updateName = (name) => {
        this.setState({
            name: {
                value: name,
                touched: true
            }
        })
    }

    updateContent = (content) => {
        this.setState({
            content: {
                value: content,
                touched: true
            }
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        // console.log("Howdy")
        const note = this.state.name.value
        const content = this.state.content.value
        const folderPick = this.state.folderId.value
        console.log(note)
        let payload = {
            name: note,
            content: content,
            folderId: folderPick
        }
        console.log(payload)
        this.setState({
            error: null
        })
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
            .then((notesRes) => {
                console.log(notesRes)
                if (!notesRes.ok) {
                    return notesRes.json().then(e => Promise.reject(e));
                }
                return notesRes.json()
            })
            .then((newNote) => {
                console.log(newNote)
                this.context.addNote(newNote)
            })
            .then(
                this.props.history.push('/')
            )
            .catch(error => this.setState({ error }))
    }
    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Name is required'
        }
    }
    validateFolderSelect() {
        const folderIsSelected = this.state.folderId.value;
        return !folderIsSelected;
    }
    render() {
        console.log(this.context)
        const folderList = this.context.folders.map(folder => {
            return (
                <option key={folder.id} value={folder.id}>{folder.name}</option>
            )
        })
        console.log(folderList)
        return (
            <section className='AddNote'>
                <h2>Create a Note</h2>
                <form
                    className='AddNote__form'
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <label htmlFor='noteName'>
                            Note Name
              {' '}

                        </label>
                        <input
                            type='text'
                            name='noteName'
                            id='noteName'
                            placeholder='Name of your Note'
                            onChange={e => this.updateName(e.target.value)}
                            required
                        />
                    </div>
                    {this.state.name.touched && (<ValidationError message={this.validateName()} />)}
                    <label htmlFor="content">
                        Content
                        </label>
                    <textarea
                        id="content"
                        name="content"
                        onChange={e => this.updateContent(e.target.value)}
                    ></textarea>
                    <label
                        htmlFor="folders"
                    >
                        Save in *
                        </label>
                    <select
                        id="folders"
                        name="folders"
                        onChange={e => this.updateFolderId(e.target.value)}
                        defaultValue="Select Folder"
                    >
                        <option
                            disabled
                        >
                            Select Folder
                            </option>
                        {folderList}
                    </select>
                    <div className='AddNote__buttons'>
                        <button
                            type='button'
                            onClick={() => { this.props.history.goBack() }}
                        >
                            Cancel
            </button>
                        {' '}
                        <button
                            type='submit'
                            disabled={this.validateName() || this.validateFolderSelect()}
                        >
                            Save
            </button>
                    </div>
                </form>
            </section>
        )

    }
}


export default AddNote;

AddNote.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })),
    addNote: PropTypes.func
}
import React from 'react'
import ValidationError from '../ValidationError'
import NotefulContext from '../NotefulContext'
import config from '../config'
import PropTypes from 'prop-types'

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            history: {
                goBack: () => { }
            },
            match: {
                params: {}
            }

        };
    }



    static contextType = NotefulContext;

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("Howdy")
        const { folderName } = e.target
        const folder = folderName.value
        console.log(folder)
        let payload = { name: folder }
        console.log(payload)
        this.setState({
            error: null
        })
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
            body: JSON.stringify(payload),
        })
            .then((foldersRes) => {
                console.log(foldersRes)
                if (!foldersRes.ok) {
                    return foldersRes.json().then(e => Promise.reject(e));
                }
                return foldersRes.json()
            })
            .then((newFolder) => {
                console.log(newFolder)
                this.context.addFolder(newFolder)
            })
            .then(
                this.props.history.push('/')
            )
            .catch(error => this.setState({ error }))
    }
    updateFolderName = (name) => {
        console.log("Hello again")
        this.setState({
            name: {
                value: name,
                touched: true
            }
        })
    }

    validateFolderName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Name is required'
        }
    }

    render() {
        console.log(this.context)
        console.log("yeayeayea")
        return (
            <section className='AddFolder'>
                <h2>Create a Folder</h2>
                <form
                    className='AddFolder__form'
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <label
                            htmlFor='folderName'>
                            Folder Name
              {' '}

                        </label>
                        <input
                            type='text'
                            name='folderName'
                            id='folderName'
                            placeholder='Name of your Folder'
                            onChange={e => this.updateFolderName(e.target.value)}
                            required
                        />
                        {this.state.name.touched && (<ValidationError message={this.validateFolderName()} />)}
                    </div>
                    <div
                        className='AddFolder__buttons'
                    >
                        <button
                            type='button'
                            onClick={() => { this.props.history.goBack() }}
                        >
                            Cancel
            </button>
                        {' '}
                        <button
                            type='submit'
                        >
                            Save
            </button>
                    </div>
                </form>
            </section>
        )
    }
}

export default AddFolder;

AddFolder.propTypes = {
    addFolder: PropTypes.func
}
import Notification from './components/Notification.jsx'
import personService from './services/persons.js'
import { useState } from 'react'
import { useEffect } from 'react'
import Filter from './components/Filter.jsx'
import Form from './components/Form.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notification, setNotification] = useState('')
    const [notificationStatus, setNotificationStatus] = useState('N')

    useEffect(() => {
        personService.getAll().then(allPersons => { setPersons(allPersons) })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const newObject = {
            name: newName,
            number: newNumber
        }

        if (persons.find(person => person.name === newName)) {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                const id = persons.filter(person => person.name === newName)[0].id
                personService.update(id, { id: id, ...newObject }).then(updated => {
                    setPersons(persons.map(person => person.id !== id ? person : updated))
                    setNotificationStatus('N')
                    setNotification(`Change ${newName}'s number into ${newNumber}`)
                    setNewName("")
                    setNewNumber("")
                }).catch(error => {
                    setNotificationStatus('E')
                    setNotification(`${error.response.data.error}`)
                })

                
            }
            return
        }

        personService.create(newObject).then(addedPerson => {
            setPersons(persons.concat(addedPerson))
            setNotificationStatus('N')
            setNotification(`Added ${newName}`)
            setNewName('')
            setNewNumber('')
        }).catch(error => {
            setNotificationStatus('E')
            setNotification(`${error.response.data.error}`)
        })
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name} ?`)) {
            personService.remove(id).then(response => {
                personService.getAll().then(allPersons => { setPersons(allPersons) })
            })
        }
    }

    const handleInputName = (event) => {
        setNewName(event.target.value)
    }

    const handleInputNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleInputFilter = (event) => {
        setNewFilter(event.target.value)
    }

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification status={notificationStatus} message={notification}></Notification>
            <Filter newFilter={newFilter} handleInputFilter={handleInputFilter}></Filter>
            <h3>Add a new</h3>
            <Form newName={newName} newNumber={newNumber} handleInputName={handleInputName} handleInputNumber={handleInputNumber} addPerson={addPerson}></Form>
            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow} deleteHandler={deletePerson}></Persons>
        </div>
    )
}

export default App

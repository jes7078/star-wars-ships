import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Page = () => {
  const [shipList, setShipList] = useState([])
  const [personList, setPersonList] = useState([])

  const createShipList = async () => {
    const resp = await axios.get('https://localhost:5001/api/Transport')
    setShipList(resp.data)
  }

  const createPersonList = async () => {
    const resp = await axios.get('https://localhost:5001/api/Person')
    setPersonList(resp.data)
  }

  useEffect(() => {
    createShipList()
    createPersonList()
  }, [])

  const deleteShip = async holder => {
    const resp = await axios.delete(
      'https://localhost:5001/api/Transport/' + holder
    )
    if (resp.statusText === 'OK') {
      window.alert('Ship deleted')
    } else {
      window.alert('Error, Ship Not deleted')
    }
    createShipList()
  }

  const deletePerson = async holder => {
    const resp = await axios.delete(
      'https://localhost:5001/api/Person/' + holder
    )
    if (resp.statusText === 'OK') {
      window.alert('Person deleted')
    } else {
      window.alert('Error, Person Not deleted')
    }
    createPersonList()
  }
  return (
    <section className="view">
      <h1>View and Delete Persons or Ships</h1>
      <h1>Ships</h1>
      <ul>
        {shipList.map((ship, index) => {
          return (
            <section className="ships" key={index}>
              <li>{ship.transportName}</li>

              <button
                className="deleteButton"
                value={ship.id}
                onClick={() => deleteShip(ship.id)}
              >
                Delete
              </button>
            </section>
          )
        })}
      </ul>
      <h1>People</h1>
      <ul>
        {personList.map((person, index) => {
          return (
            <section key={index}>
              <li>{person.name}</li>
              <button
                className="deleteButton"
                value={person.id}
                onClick={() => deletePerson(person.id)}
              >
                Delete
              </button>
            </section>
          )
        })}
      </ul>
    </section>
  )
}

export default Page

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Page2 = () => {
  const [shipList, setShipList] = useState([])
  const [personList, setPersonList] = useState([])
  const [shipName, setShipName] = useState('')
  const [shipSpeed, setShipSpeed] = useState('')
  const [shipId, setShipId] = useState(0)
  const [personId, setPersonId] = useState(0)
  const [personName, setPersonName] = useState('')
  const [personForce, setPersonForce] = useState('')
  const [personPrimaryWeapon, setPersonPrimaryWeapon] = useState('')
  const [personTransportName, setPersonTransportName] = useState('')
  const [personTransportId, setPersonTransportId] = useState('')
  const [personTransport, setPersonTransport] = useState('')

  const enterPersonName = eventData => {
    if (eventData) {
      setPersonName(eventData.target.value)
    }
  }

  const enterPersonForce = eventData => {
    if (eventData) {
      setPersonForce(eventData.target.value)
    }
  }

  const enterPersonPrimaryWeapon = eventData => {
    if (eventData) {
      setPersonPrimaryWeapon(eventData.target.value)
    }
  }

  const enterPersonTransportName = eventData => {
    if (eventData) {
      setPersonTransportName(eventData.target.value)
    }
  }

  const enterShipName = eventData => {
    if (eventData) {
      setShipName(eventData.target.value)
    }
  }

  const enterShipSpeed = eventData => {
    if (eventData) {
      setShipSpeed(eventData.target.value)
    }
  }

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

  const selectShip = id => {
    const filterShip = shipList.filter(sh => {
      return sh.id === id
    })
    setShipId(filterShip[0].id)
    setShipName(filterShip[0].transportName)
    setShipSpeed(filterShip[0].speed)
  }

  const selectPerson = id => {
    const filterPerson = personList.filter(pe => {
      return pe.id === id
    })
    setPersonId(filterPerson[0].id)
    setPersonName(filterPerson[0].name)
    setPersonForce(filterPerson[0].force)
    setPersonPrimaryWeapon(filterPerson[0].primaryWeapon)
    setPersonTransportName(filterPerson[0].transportName)
    setPersonTransportId(filterPerson[0].transportId)
    setPersonTransport(filterPerson[0].transport)
  }

  const updateShip = async () => {
    let ship = {
      id: shipId,
      transportName: shipName,
      speed: shipSpeed,
    }
    const resp = await axios.put(
      'https://localhost:5001/api/Transport/' + shipId,
      ship
    )
    if (resp.statusText === 'OK') {
      window.alert('Ship Updated')
    } else {
      window.alert('Error, Ship Not Updated')
    }
    createShipList()
  }

  const addShip = async () => {
    let ship = {
      transportName: shipName,
      speed: shipSpeed,
    }
    const resp = await axios.post('https://localhost:5001/api/Transport/', ship)
    if (resp.statusText === 'OK') {
      window.alert('Ship Added')
    } else {
      window.alert('Error, Ship Not Added')
    }
    createShipList()
  }

  const updatePerson = async () => {
    let person = {
      id: personId,
      name: personName,
      force: personForce,
      primaryWeapon: personPrimaryWeapon,
      transportName: personTransportName,
      transportId: personTransportId,
      transport: personTransport,
    }
    const resp = await axios.put(
      'https://localhost:5001/api/Person/' + personId,
      person
    )
    if (resp.statusText === 'OK') {
      window.alert('Person updated')
    } else {
      window.alert('Error, Person Not updated')
    }
    createPersonList()
  }

  const addPerson = async () => {
    let person = {
      name: personName,
      force: personForce,
      primaryWeapon: personPrimaryWeapon,
      transportName: personTransportName,
    }
    const resp = await axios.post('https://localhost:5001/api/Person/', person)
    if (resp.statusText === 'OK') {
      window.alert('Person added')
    } else {
      window.alert('Error, Person Not updated')
    }
    createPersonList()
  }

  return (
    <section>
      <section className="addShip">
        <h1>Add or Update a Ship or Person</h1>
        {/* ----------------Ship Input Section---------------------------- */}
        <section className="shipInput">
          <label>Ship Name</label>
          <input
            className="inputBar"
            type="text"
            value={shipName}
            placeholder="Enter Ship Name"
            onChange={enterShipName}
          ></input>
          <label>Ship Speed</label>
          <input
            className="inputBar"
            type="text"
            value={shipSpeed}
            placeholder="Enter Ship Speed"
            onChange={enterShipSpeed}
          ></input>
          <button onClick={addShip}>Add Ship</button>
          <button onClick={updateShip}>Update Ship</button>
        </section>
      </section>

      {/* ----------------Person Input Section---------------------------- */}
      <section className="addPerson">
        <h1>Person</h1>
        <section className="personInput">
          <label>Person's Name</label>
          <input
            className="inputBar"
            type="text"
            value={personName}
            placeholder="Enter Person Name"
            onChange={enterPersonName}
          ></input>
          <label>Person's Force</label>
          <input
            className="inputBar"
            type="text"
            value={personForce}
            placeholder="Enter Person's Force"
            onChange={enterPersonForce}
          ></input>
          <label>Person's Primary Weapon</label>
          <input
            className="inputBar"
            type="text"
            value={personPrimaryWeapon}
            placeholder="Enter Person's Primary Weapon"
            onChange={enterPersonPrimaryWeapon}
          ></input>
          <label>Person's Transport Name</label>
          <input
            className="inputBar"
            type="text"
            value={personTransportName}
            placeholder="Enter Person's Transport Name"
            onChange={enterPersonTransportName}
          ></input>
          <button onClick={addPerson}>Add Person</button>
          <button onClick={updatePerson}>Update Person</button>
        </section>
        {/* ----------------Ship Display Section---------------------------- */}
        <section className="addDisplay">
          <h1>Ship List</h1>
          <ul>
            {shipList.map((ship, index) => {
              return (
                <section key={index}>
                  <li>{ship.transportName}</li>
                  <li>{ship.speed}</li>

                  <button
                    className="selectButton"
                    value={ship.id}
                    onClick={() => selectShip(ship.id)}
                  >
                    Select for Update
                  </button>
                </section>
              )
            })}
          </ul>
          {/* ----------------Person Display Section---------------------------- */}
        </section>
        <section className="addDisplay">
          <h1>People List</h1>
          <ul>
            {personList.map((person, index) => {
              return (
                <section key={index}>
                  <li>{person.name}</li>
                  <button
                    className="selectButton"
                    value={person.id}
                    onClick={() => selectPerson(person.id)}
                  >
                    Select for Update
                  </button>
                </section>
              )
            })}
          </ul>
        </section>
      </section>
    </section>
  )
}

export default Page2

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import moment from 'moment';
import logic from '../../logic';
import Appointments from '../Appointments';
import './index.sass'

class Calendar extends Component {

    state = { users: [], owner: '', pets: [], appointments: [], pet: '', date: '', hour: '', visitConfirmed: false, year: moment().format('YYYY'), month: moment().format('MM'), day: moment().format('DD'), askConfirmation: false, buttonConfirm: true, error: null, errorDate: false }
   


    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

    componentDidMount() {
        this.retrieveUsers()
    }

    retrieveUsers = async () => {
        const users = await logic.retrieveUsers()
        this.setState({ users })
    }

    retrieveAppointments = async () => {
      
        let year= this.state.year
        let month = this.state.month
        const appointments = await logic.retrieveAppointments(year, month )
        this.setState({ appointments})
    }

  
    handleSelectOwner = async event => {
        event.preventDefault()
        const usersId = event.target.value
        this.retrievePets(usersId)
        console.log(usersId)
        console.log(typeof this.state.month === 'string')
        this.setState({ owner: usersId })

    }

    retrievePets = async userId => {
        const pets = await logic.retrievePets(userId)
        console.log("calendar userId " + userId)
        this.setState({ pets })
    }

    handleSelectPet = async event => {
        event.preventDefault()
        const petsId = event.target.value
        console.log("calendar petsID " + petsId)
        this.setState({ pet: petsId })
    }

    handleNextMonth = event => {
        event.preventDefault()
        let yearNumber = parseInt(this.state.year)
        let monthNumber = parseInt(this.state.month)
        let dayNumber = parseInt(this.state.day)
        console.log(yearNumber, monthNumber, dayNumber)
        this.setState({ month: monthNumber + 1 });
        console.log(this.state.month)
        if (this.state.month === 12) {
            this.setState({ year: yearNumber + 1, month: 1 })
        }
        
        
        
    }

    handleLastMont = event => {
        event.preventDefault()
        let yearNumber = parseInt(this.state.year)
        let monthNumber = parseInt(this.state.month)
        let dayNumber = parseInt(this.state.day)
        console.log(yearNumber, monthNumber, dayNumber)
        this.setState({ month: monthNumber - 1 });
        if (this.state.month === 1) {
            this.setState({ year: yearNumber - 1, month: monthNumber = 12 })
        }
    }

    handleDatePicker = event => {
        event.preventDefault()
        const date = event.target.value;
        this.retrieveAppointments()
        this.setState({ date }) 
        const dateSelected = new Date(date)
        const today = new Date()
        if (dateSelected < today) {
            this.setState({ errorDate: true, askConfirmation: false, buttonConfirm: false })
        } else if (dateSelected > today) {
            this.setState({ buttonConfirm: true })
        }
        function getDate(date) {
            let result = date.split('-');
            return result;
        }
            let splitDate = getDate(date);
            let yearVisit = splitDate[0];
            let monthVisit = splitDate[1];
            let dayVisit = splitDate[2];

            let year = yearVisit;
            let month = monthVisit;
            let day = dayVisit;
            this.setState({ year, month, day });
         
        }   

    handleSelectHour = event => {
        event.preventDefault()
     
        const hour = event.target.value;
        this.setState({ hour })
        console.log(hour)
    }

    handleCorrectDate = event => {
        event.preventDefault()
        this.setState({ errorDate: false })
    }

    handleConfirmVisitOK = event => {
        event.preventDefault()
        this.setState({ visitConfirmed: false, askConfirmation: false, error: false, errorDate: false })
        const { state: { owner, pet, date, hour } } = this
        this.assignVisit(owner, pet, date, hour)
    }

    assignVisit = async (owner, pet, date, hour) => {
        try {
            date = date.concat(' ' + hour)
            await logic.assignAppointment(owner, pet, date)
            this.setState({ error: false, visitConfirmed: true, errorDate: false })
            // this.retrieveAppointments()
        } catch ({ message }) {
            this.setState({ error: message, askConfirmation: false, visitConfirmed: false, errorDate: false })
        }
    }

    handleDeleteVisit = event => {
        event.preventDefault()
        debugger
        const appointmentId = event.target.value;
        this.deleteVisit(appointmentId)
    }

    deleteVisit = async (appointmentId) => {
        try {
            debugger
            await logic.deleteAppointment(appointmentId)

        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleConfirmVisitNO = event => {
        event.preventDefault()
        this.setState({ askConfirmation: false, error: false, confirmVisit: false, errorDate: false })
    }

    handleConfirmVisit = event => {
        event.preventDefault()
        this.setState({ askConfirmation: true, error: false, visitConfirmed: false, errorDate: false })
    }


    render() {
        const { state: { year, month } } = this

        const m = moment(`${year}-${month}`)
        return <section className="calendar">
            <h1>Appointments</h1>
            <div className="input__form">
                <label>Select Owner</label>
                <select name="owner" onChange={this.handleSelectOwner} required>
                    {<option></option>}{this.state.users.map(user => <option name="owner" value={user.id} required>{user.name}</option>)}
                </select>
            </div>
            <div className="input__form">
                <label>Select Pet</label>
                <select name="pet" onChange={this.handleSelectPet}>
                    {<option></option>}{this.state.pets.map(pet => <option name="pet" value={pet.id}>{pet.name}</option>)}
                </select>
            </div>
            <div className="input__form">
                <label>Date</label>
                <input type="date" defaultValue={`${this.state.year}-${this.state.month}-${this.state.day}`} onChange={this.handleDatePicker} />
            </div>
            <div className="input__form">
                <label>Hour</label>
                <select name="hour" onChange={this.handleSelectHour}>
                    <option>Select an hour:</option>
                    <option name="hour" value="17:00" onChange={this.handleOnChange}>17:00</option>
                    <option name="hour" value="17:30" onChange={this.handleOnChange}>17:30</option>
                    <option name="hour" value="18:00" onChange={this.handleOnChange}>18:00</option>
                    <option name="hour" value="18:30" onChange={this.handleOnChange}>18:30</option>
                    <option name="hour" value="19:00" onChange={this.handleOnChange}>19:00</option>
                    <option name="hour" value="19:30" onChange={this.handleOnChange}>19:30</option>
                </select>
                {this.state.buttonConfirm && <button onClick={this.handleConfirmVisit} className="button">Confirm</button>}

                {this.state.askConfirmation && <div><p className="feedback feedback__confirmation">Are you sure you want to assign this visit?</p></div>}
                {this.state.askConfirmation && <button onClick={this.handleConfirmVisitOK} className="button__confirm">Yes</button>}
                {this.state.askConfirmation && <button onClick={this.handleConfirmVisitNO} className="button__confirm">No</button>}
                {this.state.visitConfirmed && <div><p className="feedback feedback__success">Visit successfully assigned!</p></div>}
                {this.state.errorDate && <div><p className="feedback feedback__error">Select a correct date</p></div>}
                {this.state.errorDate && <button onClick={this.handleCorrectDate} className="button__confirm">Ok</button>}
                {this.state.error && <p className="feedback feedback__error">{this.state.error}</p>}
            </div>
            <div className="arrows">    
                <i className="fas fa-arrow-left arrow" onClick={this.handleLastMont}></i>
                <i className="fas fa-arrow-right arrow" onClick={this.handleNextMonth}></i>
            </div>

            <h2>{m.format('MMMM')} {year}</h2>
            {
                (() => {
                    const days = []
                    const weeks = Math.ceil((m.day() + m.daysInMonth()) / 7)

                    let paint = false
                    let count = 1
                  
                    for (let w = 0; w < weeks; w++) {
                        for (let d = 0; d < 7; d++) {
                            if (d === m.day()) paint = true;

                            const mNow = moment(`${year}-${month}-${count}`)

                            if (paint && count <= m.daysInMonth()) {

                                days.push(<div><table><tr className="month-day" key={count}>{`${mNow.format('dddd')} ${count++}`}
                                </tr>
                                    <tr>
                                        <th>17:00
                                        {this.state.appointments.map(appointment => <p name="appointment" value={appointment.id}>owner: {appointment.owner}{' '}pet:{appointment.pet}</p>)}
                                            <button onClick={this.handleDeleteVisit} className="button__delete">Delete</button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>17:30
                                        <button onClick={this.handleDeleteVisit} className="button__delete">Delete</button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>18:00
                                        <button onClick={this.handleDeleteVisit} className="button__delete">Delete</button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>18:30
                                        <button onClick={this.handleDeleteVisit} className="button__delete">Delete</button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>19:00
                                        <button onClick={this.handleDeleteVisit} className="button__delete">Delete</button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>19:30
                                        <button onClick={this.handleDeleteVisit} className="button__delete">Delete</button>
                                        </th>
                                    </tr>
                                </table>
                                </div>)
                            } else
                                days.push(<div className="day" key={`${w}-${d}`}></div>)
                        }
                    }
                    return days
                })()
            }
        </section>
    }
}

export default withRouter(Calendar)
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import React, {useState, useEffect} from 'react';

function App() {
  const [reminderMsg, setReminderMsg] = useState('')
  const [remindAt, setRemindAt] = useState('')
  const [reminderList, setRemindList] = useState([])

  useEffect(() => {
    axios.get("/getAllReminder").then(res => setRemindList(res.data))
  }, [])

  const addReminder = () => {
    axios.post("/addReminder", {reminderMsg, remindAt})
    .then(res => setRemindList(res.data))
    setReminderMsg("")
    setRemindAt("") 
  }

  const deleteReminder = (id) => {
     axios.post("/deleteReminder", {id})
     .then(res => setRemindList(res.data)) 
  }

  return (
    <div className="App">
    {console.log(reminderList)}
    <div className="homepage">
    <div className="homepage_header">
      <h1>Remind Me 🛎️</h1>
      <input type="text" placeholder="Reminder notes here.." value={reminderMsg} onChange={(e) => setReminderMsg(e.target.value)} />
      <DateTimePicker
      value={remindAt}
      onChange={setRemindAt}
      minDate={new Date()}
      minutePlaceholder="mm"
      hourPlaceholder="hh"
      dayPlaceholder="DD"
      monthPlaceholder="MM"
      yearPlaceholder="YYYY" />
      <div className="button" onClick={addReminder}> Add Reminder</div>
    </div>
      
      <div className="homepage_body">
      {
        reminderList.map(reminder => (
          <div className="reminder_card" key={reminder._id}>
            <h2>{reminder.reminderMsg}</h2>
            <h3>Remind Me At:</h3>
            <p>{String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"})))}</p>
            <div className="button" onClick = {() => deleteReminder(reminder._id)} > Delete </div>
          </div>

        ))
      }
      </div>
    </div>
    </div>
  );
}

export default App;

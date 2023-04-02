import { useState } from "react";
import { timeList } from "./utils";
import './todoList.css'

function TodoListFunc (props) {
    const [select, setSelect] = useState(6);
    const [inputValue, setInputValue] = useState('');
    const [recordList, setRecordList] = useState([]);

    function addRecord() {
        if (inputValue !== "" && select !== "") {
            setRecordList([ ...recordList, { time: select, notice: inputValue }])
        }
        return
    }

    function deleteRecord(time){
        const newRecordList = recordList.filter((record) => record.time !== time);
        setRecordList(newRecordList);
        // deleteLocalStorage(time);
    }


    return (
       <div className="todo-list">
            <div className="todo-list__wrapper">
                <Select value={select} setSelect={setSelect} />
                <Input value={inputValue} setInput={setInputValue} />
                <Button addRecord={addRecord} />
            </div>

            <List
                recordList={recordList}
                setRecordList={setRecordList}
                deleteRecord={deleteRecord}
            />
        </div>
    );
}

const Select = ({value, setSelect}) => {
    return (
        <select onChange={(e) => setSelect(e.target.value)} 
        value={value}
        className="select"
        >
            {timeList.map((record) => {
                return (
                    <option key={record.time} value={record.time}>
                        {record.time}.00
                    </option>
                )
            })}
        </select>
    )
}

const Input = ({setInput}) => {
    return(
        <input
            className="record-input"
            placeholder="Введите задачу"
            type="text"
            onChange={(e) => setInput(e.target.value)}
        />
    )
}

const Button = ({addRecord }) => {
    return (
        <button onClick={() => addRecord()} className="record-btn-add "> 
            Добавить!
        </button>
    )
}

const List = ({ recordList, deleteRecord }) => {
    let newRecordlist = [];
    if (recordList !== []) {
      newRecordlist = recordList.map((record) => {
        return (
          <div className="record" key={record.time}>
            <div className="time">{record.time}.00</div>
            <div className="notice">{record.notice}</div>
            <button className="delete" onClick={() => deleteRecord(record.time)}>
              x
            </button>
          </div>
        );
      });
    }
  
    return <div className="list">{newRecordlist} </div>;
  };

export default TodoListFunc;
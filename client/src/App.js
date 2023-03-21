import logo from "./logo.svg";
// import "./App.css";
import { useState, useEffect } from "react";
// import * as dotenv from "dotenv";
// dotenv.config({});
function App() {
  const [name, setName] = useState("");
  const [datalist, setDataList] = useState([]);
  const [newData, setNewData] = useState("");

  useEffect(() => {
    if (newData) {
      setDataList([]);
      console.log("newDatanewData", JSON.parse(newData));
      let {
        documentKey: { _id },
        updateDescription: { updatedFields },
      } = JSON.parse(newData);

      let DL = datalist;
      DL.map((e) => {
        if (e._id === _id) {
          e.name = updatedFields.name;
        }
      });

      console.log(":dsg hvdsds", DL);
      setDataList(DL);
      setNewData("");
    }
  }, [newData]);

  useEffect(() => {
    fetch(`http://${process.env.host ?? "localhost"}:9876/dummies`)
      .then((res) => res.json())
      .then((res) => {
        setDataList(res.data);
      });

    let sse = new EventSource(
      `http://${process.env.host ?? "localhost"}:9876/server-sent-events`
    );
    sse.onmessage = (response) => {
      setNewData(response.data);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <input
          placeholder="Dummy name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {name}
        <button
          onClick={() => {
            fetch(`http://${process.env.host ?? "localhost"}:9876/create`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name,
              }),
            });
          }}
        >
          Submit
        </button>
      </header>

      <ul>
        {datalist.map((e) => {
          return <li key={e._id}>{e.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;

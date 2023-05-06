import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);

  const [data, setData] = useState([]);
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:5000/display",
      headers: {},
    };
    console.log("Hello");
    axios(config)
      .then(function (response) {
        const data = JSON.stringify(response.data);
        const array = JSON.parse(data).array;
        console.log(data);
        setData(array);
        setChanged(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [changed]);
  const deleteHandler = function (e) {
    axios({
      method: "POST",
      url: "http://localhost:5000/delete",
      data: {
        itemName: e.target.value,
      },
    })
      .then((response) => {
        console.log("Data has been sent to server");
        if (response.data.status === "success") {
          console.log("Data has been submitted");
          console.log(response);
          setChanged(true);
        }
      })
      .catch((e) => {
        console.log("Internal Server error" + e);
      });
  };
  const insertHandler = function () {
    axios({
      method: "POST",
      url: "http://localhost:5000/insert",
      data: {
        itemName: itemName,
        brand: brand,
        price: price,
      },
    })
      .then((response) => {
        console.log("Data has been sent to server");
        if (response.data.status === "success") {
          console.log("Data has been submitted");
          console.log(response);
          setChanged(true);
          setItemName("");
          setBrand("");
          setPrice("");

        }
      })
      .catch((e) => {
        console.log("Internal Server error" + e);
      });
  };

  return (
    <div>
      <h3 class="card-title text-center display-4 mb-5">Super Market</h3>

      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          {data &&
            data.map((row, key) => {
              return (
                <tr class="table-light">
                  <th scope="row">Name : {row.itemName}<br />Brand : {row.brand}</th>
                  <td>{row.price}</td>

                  <td>
                    <button
                      onClick={deleteHandler}
                      class="btn btn-info btn-sm"
                      value={row.itemName}
                    >
                      Delete
                    </button>
                  </td>
                  <td></td>
                </tr>
              );
            })}
          <tr class="table-secondary">
            <th scope="row">
              <div style={{ marginBottom: "10px" }}>
                <label>Name : </label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={itemName}
                  onInput={(e) => setItemName(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Brand : </label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={brand}
                  onInput={(e) => setBrand(e.target.value)}
                />
              </div>
            </th>

            <td>
              <div style={{ verticalAlign: "middle" }}>
                <input
                  type="text"
                  name=""
                  id=""
                  value={price}
                  onInput={(e) => setPrice(e.target.value)}
                />{" "}</div>
            </td>

            <td>
              <button onClick={insertHandler} class="btn btn-info btn-sm">
                Add
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;

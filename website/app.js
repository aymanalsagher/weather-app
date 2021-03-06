/* Global Variables */

// URLs and Keys

const url = "http://api.openweathermap.org/data/2.5/weather?zip=";
const key = "254ce9e917f47c34622cc18d9275cfe7&units=metric";

// DOM selections

const generateBtn = document.getElementById("generate");
const date = document.getElementById("date");
const temperature = document.getElementById("temp");
const content = document.getElementById("content");

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Listen to user click

document
  .getElementById("generate")
  .addEventListener("click", getWeatherAndFeeling);

function getWeatherAndFeeling(e) {
  e.preventDefault();
  const postalCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getTemperature(url, postalCode, key).then((data) => {
    postData("http://localhost:7777/addData", {
      date: newDate,
      temperature: data.main.temp,
      feeling: feelings,
    }).then(() => updateUI());
  });
}

// Async GET data from URL
const getTemperature = async (url, postalCode, key) => {
  const res = await fetch(url + postalCode + ",us" + "&APPID=" + key);
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

// Async POST data to the local server
const postData = async (url = "", data = {}) => {
  const postRequest = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await postRequest.json();
    return newData;
  } catch (err) {
    console.log("Error", err);
  }
};

// Update user interface

const updateUI = async () => {
  const request = await fetch("http://localhost:7777/allData");
  try {
    const allData = await request.json();

    date.innerHTML = `Date of Request: ${allData.date}`;
    //prettier-ignore
    temperature.innerHTML = `Temperature: ${allData.temperature}`;
    content.innerHTML = `You feel: ${allData.feeling}`;
  } catch (err) {
    console.log("Error", err);
  }
};

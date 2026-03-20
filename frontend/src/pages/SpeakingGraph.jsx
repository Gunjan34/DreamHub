// import {
// LineChart,
// Line,
// XAxis,
// YAxis,
// Tooltip,
// CartesianGrid,
// ResponsiveContainer,
// } from "recharts";
//  import { useState } from "react";
//  import { useEffect } from "react";
// const SpeakingGraph = () => {
// const [data, setData] = useState([]);

// useEffect(() => {
// const user = JSON.parse(localStorage.getItem("dreamhubUser"));

// fetch(`http://localhost:5000/api/progress/${user._id}`)
//   .then((res) => res.json())
//   .then((resData) => {
//     const formatted = resData.map((item) => ({
//       day: new Date(item.date).toLocaleDateString(),
//       score: item.score,
//     }));
//     setData(formatted);
//   });

// }, []);

// // Dummy progress data (later you can fetch from backend)
// // const data = [
// // { day: "Mon", score: 40 },
// // { day: "Tue", score: 55 },
// // { day: "Wed", score: 60 },
// // { day: "Thu", score: 75 },
// // { day: "Fri", score: 70 },
// // { day: "Sat", score: 85 },
// // { day: "Sun", score: 90 },
// // ];

// return ( <div className="bg-white dark:bg-gray-800 
//  p-6 rounded-2xl shadow-xl transition">

//   <h2 className="text-xl font-bold mb-4 
//   text-gray-800 dark:text-gray-100">
//     📊 Speaking Progress
//   </h2>

//   <ResponsiveContainer width="100%" height={250}>
//     <LineChart data={data}>
//       <CartesianGrid strokeDasharray="3 3" />

//       <XAxis dataKey="day" 
//       stroke="#8884d8" />

//       <YAxis />

//       <Tooltip />

//       <Line
//         type="monotone"
//         dataKey="score"
//         stroke="#6366f1"
//         strokeWidth={3}
//       />
//     </LineChart>
//   </ResponsiveContainer>
// </div>

// );
// };

// export default SpeakingGraph;


import { useEffect, useState } from "react";
import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer,
} from "recharts";

const SpeakingGraph = () => {
const [data, setData] = useState([]);

useEffect(() => {
const user = JSON.parse(localStorage.getItem("dreamhubUser"));
const userId = user?._id || user?.id; // ✅ HANDLE BOTH
//Console Check
console.log("User:", user);
console.log("User ID:", user?._id);

fetch(`http://localhost:8000/api/practice/progress/${user.id}`)
  .then((res) => res.json())
  .then((resData) => {
    //Add
    console.log("API DATA:", resData);
    const formatted = resData.map((item) => ({
      day: new Date(item.date).toLocaleDateString(),
      score: item.score,
    }));
    setData(formatted);
  });


}, []);

return ( <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl"> <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
📊 Speaking Progress </h2>


  {/* <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line
  type="monotone"
  dataKey="score"
  stroke="#6366f1"
  strokeWidth={3}
  dot={{ r: 5 }}   // 👈 ADD THIS
/>
    </LineChart>
  </ResponsiveContainer> */}

  {data.length === 0 ? (
  <p className="text-gray-400 text-center">
    Add more practice to see full graph 📈
  </p>
) : (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="score"
        stroke="#6366f1"
        strokeWidth={3}
        dot={{ r: 5 }}
      />
    </LineChart>
  </ResponsiveContainer>
)}
</div>
);
};

export default SpeakingGraph;



// import { useState, useEffect } from "react";
// import { getDay, addMonths } from "date-fns";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios"
// // Define React component for displaying doctors by department
// const DoctorsByDepartment = () => {
//   const [department, setDepartment] = useState("");
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [appointmentDate, setAppointmentDate] = useState("");

//   const fetchDoctors = (department) => {
//     fetch(`http://localhost:3001/doctors/${department}`)
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Failed to fetch doctors.");
//         }
//       })
//       .then((data) => {
//         setDoctors(data || []);
//         setSelectedDoctor("");
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleDepartmentChange = (e) => {
//     const selectedDepartment = e.target.value;
//     setDepartment(selectedDepartment);
//     fetchDoctors(selectedDepartment);
//     setSelectedDoctor("");
// const doctor_id = selectedDoctor.Id;

//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const isWeekday = (date) => {
//     const day = getDay(date);
//     return day !== 0 && day !== 6;
//   };

//   const BookAppointment = () => {
//     const [loggedInPatientId, setLoggedInPatientId] = useState(null);
//     const [data, setData] = useState(null);
//     const selectedDoctorId = selectedDoctor ? selectedDoctor.id : null;
//     const selectedAppointmentDate = selectedDate ? selectedDate : null;



    
//     const patientId = setLoggedInPatientId(); 
//     const currentDate = new Date();
//     const registrationDate = currentDate;
//     const updateDate = currentDate;

//     const appointment = {
//       appointmentnumber: null,
//       doctor_id: selectedDoctorId,
//       patient_id: patientId,
//       appointment_date: selectedAppointmentDate,
//       registration_date: registrationDate,
//       update_date: updateDate,
//       status: 0,
      
//     };

//     console.log(selectedDoctorId);
//     useEffect(() => {
//       const token = localStorage.getItem("token");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`, 
//         },
//       };

//       axios.get("/protectedRoute", config)
//         .then((response) => {
//           setData(response.data);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }, []);

//     const token = token; 

//     fetch("http://localhost:3001/appointments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(appointment),
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log("Appointment booked successfully.");
//         } else {
//           throw new Error("Failed to book appointment.");
//         }
//       })
//       .catch((err) => console.error(err));

//   };
//   return (
//     <div>
//       <h2>Select Department</h2>
//       <select value={department} onChange={handleDepartmentChange}>
//         <option value="">Select Department</option>
//         <option value="Dentist">Dentist</option>
//         <option value="Cardiologists">Cardiologists</option>
//         <option value="Neurologist">Neurologist</option>
//         <option value="Internal Medicine">Internal Medicine</option>
//         <option value="Pulmonologist">Pulmonologist</option>
//         <option value="Radiologist">Radiologist</option>
//       </select>
//       {department && (
//         <div>
//           <ul>
//             {doctors.map((doctor) => (
//               <li key={doctor.id} onClick={() => setSelectedDoctor(doctor)}>
//                 <h5>
//                   Your Doctor will be:
//                   <span
//                     style={{
//                       color: "blue",
//                       fontSize: "14px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {doctor.fullname}
//                   </span>
//                 </h5>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <h3>Select Appointment Date:</h3>
//       <DatePicker
//         onChange={handleDateChange}
//         selected={selectedDate} 
//         filterDate={isWeekday}
//         minDate={new Date()}
//         maxDate={addMonths(new Date(), 2)}
//         showDisabledMonthNavigation
//         id="date"
//         required
//         placeholderText="Please enter your date"
//       />
//       <button onClick={BookAppointment}>Book Appointment</button>{" "}
//     </div>
//   );
// };
// export default DoctorsByDepartment;

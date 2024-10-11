import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const handleSignup = async (values: any) => {
        console.log("data::::::::::::::", values);
        try {
            const formData = new FormData();

            formData.append("firstname", values.firstname);
            formData.append("lastname", values.lastname);
            formData.append("email", values.email);
            formData.append("profile_photo", values.profile_photo);
            formData.append("company_address", values.company_address);
            formData.append("company_city", values.company_city);
            formData.append("company_state", values.company_state);
            formData.append("company_zip", values.company_zip);
            formData.append("home_address", values.home_address);
            formData.append("home_city", values.home_city);
            formData.append("home_state", values.home_state);
            formData.append("home_zip", values.home_zip);
            formData.append("appointment_letter", values.appointment_letter);
            console.log(formData);
            const response = await axios.post("http://localhost:5000", formData, {
                "headers": {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data);
            alert("Data sent successfully!");
            navigate(`/profile/${response.data.user.id}`);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const ValidationSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        profile_photo: Yup.mixed().required("Image is required"),
        company_address: Yup.string().required("Company address is required"),
        company_city: Yup.string().required("Company City is required"),
        company_state: Yup.string().required("Company State is required"),
        company_zip: Yup.string().required("Company Zip is required").min(6, "Company zip should be of 6 digits").matches(/^\d+$/, 'Only digits are allowed'),
        home_address: Yup.string().required("Home address is required"),
        home_city: Yup.string().required("Home City is required"),
        home_state: Yup.string().required("Home State is required"),
        home_zip: Yup.string().required("Home Zip is required").min(6, "Home zip should be of 6 digits").matches(/^\d+$/, 'Only digits are allowed'),
        appointment_letter: Yup.mixed().required("Appointment letter is required"),
    });

    return (
        <div className="container" style={{ backgroundColor: '#777777', padding: '20px', borderRadius: '8px' }}>
            <h2 className="text-center">Sign Up</h2>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    profile_photo: null,
                    company_address: '',
                    company_city: '',
                    company_state: '',
                    company_zip: '',
                    home_address: '',
                    home_city: '',
                    home_state: '',
                    home_zip: '',
                    appointment_letter: null
                }}
                validationSchema={ValidationSchema}
                onSubmit={handleSignup}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="mb-3">
                            <label>First Name:</label>
                            <Field className="form-control" name="firstname" placeholder="First Name" />
                            <ErrorMessage name="firstname" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Last Name:</label>
                            <Field className="form-control" name="lastname" placeholder="Last Name" />
                            <ErrorMessage name="lastname" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Email:</label>
                            <Field className="form-control" name="email" placeholder="Email" />
                            <ErrorMessage name="email" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Profile Photo:</label>
                            <input className="form-control" type="file" name="profile_photo" accept="image/png, image/jpeg, image/jpg" onChange={(event: any) => {
                                setFieldValue("profile_photo", event.currentTarget.files[0]);
                            }} />
                            <ErrorMessage name="profile_photo" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Company Address:</label>
                            <Field className="form-control" type="text" name="company_address" placeholder="Enter company address" />
                            <ErrorMessage name="company_address" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Company City:</label>
                            <Field className="form-control" type="text" name="company_city" placeholder="Enter company City" />
                            <ErrorMessage name="company_city" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Company State:</label>
                            <Field className="form-control" type="text" name="company_state" placeholder="Enter company State" />
                            <ErrorMessage name="company_state" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Company Zip:</label>
                            <Field className="form-control" type="text" name="company_zip" placeholder="Enter company Zip" />
                            <ErrorMessage name="company_zip" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Home Address:</label>
                            <Field className="form-control" type="text" name="home_address" placeholder="Enter Home address" />
                            <ErrorMessage name="home_address" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Home City:</label>
                            <Field className="form-control" type="text" name="home_city" placeholder="Enter Home City" />
                            <ErrorMessage name="home_city" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Home State:</label>
                            <Field className="form-control" type="text" name="home_state" placeholder="Enter Home State" />
                            <ErrorMessage name="home_state" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Home Zip:</label>
                            <Field className="form-control" type="text" name="home_zip" placeholder="Enter Home Zip" />
                            <ErrorMessage name="home_zip" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Appointment Letter:</label>
                            <input className="form-control" type="file" name="appointment_letter" accept=".pdf" onChange={(event: any) => {
                                setFieldValue("appointment_letter", event.currentTarget.files[0]);
                            }} />
                            <ErrorMessage name="appointment_letter" component="div" className='text-danger' />
                        </div>

                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Signup;


































// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddUser.css';


// interface FormDataType {
//   firstName: string;
//   lastName: string;
//   email: string;
//   homeAddress: string;
//   homeCity: string;
//   homeState: string;
//   homeZip: string;
//   companyAddress: string;
//   companyCity: string;
//   companyState: string;
//   companyZip: string;
//   profilePhoto: File | null;
//   appointmentLetter: File | null;
// }

// const AddUser: React.FC = () => {
//   const [formData, setFormData] = useState<FormDataType>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     homeAddress: '',
//     homeCity: '',
//     homeState: '',
//     homeZip: '',
//     companyAddress: '',
//     companyCity: '',
//     companyState: '',
//     companyZip: '',
//     profilePhoto: null,
//     appointmentLetter: null,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files.length > 0) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formDataToSubmit = new FormData();
//     for (const key in formData) {
//       if (formData[key as keyof FormDataType] !== null) {
//         formDataToSubmit.append(key, formData[key as keyof FormDataType] as any);
//       }
//     }

//     try {
//       await axios.post('http://localhost:5000/api/users', formDataToSubmit, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('User added successfully!');
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         homeAddress: '',
//         homeCity: '',
//         homeState: '',
//         homeZip: '',
//         companyAddress: '',
//         companyCity: '',
//         companyState: '',
//         companyZip: '',
//         profilePhoto: null,
//         appointmentLetter: null,
//       });
//     } catch (error) {
//       console.error(error);
//       alert('Error adding user');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
//       <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
//       <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//       <input type="text" name="homeAddress" placeholder="Home Address" value={formData.homeAddress} onChange={handleChange} required />
//       <input type="text" name="homeCity" placeholder="Home City" value={formData.homeCity} onChange={handleChange} required />
//       <input type="text" name="homeState" placeholder="Home State" value={formData.homeState} onChange={handleChange} required />
//       <input type="text" name="homeZip" placeholder="Home Zip" value={formData.homeZip} onChange={handleChange} required />
//       <input type="text" name="companyAddress" placeholder="Company Address" value={formData.companyAddress} onChange={handleChange} required />
//       <input type="text" name="companyCity" placeholder="Company City" value={formData.companyCity} onChange={handleChange} required />
//       <input type="text" name="companyState" placeholder="Company State" value={formData.companyState} onChange={handleChange} required />
//       <input type="text" name="companyZip" placeholder="Company Zip" value={formData.companyZip} onChange={handleChange} required />
//       <input type="file" name="profilePhoto" onChange={handleFileChange} accept=".png, .jpg, .jpeg" required />
//       <input type="file" name="appointmentLetter" onChange={handleFileChange} accept=".pdf" required />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default AddUser;















// import {Form, Field, Formik, ErrorMessage} from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import './User.css'; 
// // import { json } from 'sequelize';
// // import { useNavigate } from 'react-router-dom';


// const validationSchema = Yup.object({
//     name: Yup.string().required('Required'),
//     email: Yup.string().email('Invalid Email').required('Required'),
//     profilePhoto: Yup.mixed().required('Please upload an image'),
//     companyAddress: Yup.string().required('Required'),
//     companyCity: Yup.string().required('Required'),
//     companyState: Yup.string().required('Required'),
//     companyZip: Yup.number().required('Please enter Zip Code').min(6,"Required 6 digit"),
//     homeAddress: Yup.string().required('Required'),
//     homeCity: Yup.string().required('Required'),
//     homeState: Yup.string().required('Required'),
//     homeZip: Yup.number().required('Please enter Zip Code').min(6,'Required 6 digit'),
//    appointmentLetter: Yup.mixed()
// });

// export default function User(){
//     // const navigate = useNavigate();
//     const handleUser = async (values: any) => {
//         console.log(values);
//         // try {
//         //     axios.post("http://localhost:4000/user", values, {
//         //         headers : {
//         //             "Content-Type" : 'application/json'
//         //         }
//         //     }).then((response) => {
//         //         console.log(JSON.stringify(response.data));
//         //       })
//         //       .catch((error) => {
//         //         console.log(error);
//         //       });
           
//         // } catch (err) {
//         //     alert("Error");
//         // }
//     };

//     return (
//         <div className="User-container">
//             <h1>User</h1>
//             <Formik
//                 initialValues={{
//                     name: '',
//                     email: '',
//                     profilePhoto: '',
//                     companyAddress: '',
//                     companyCity: '',
//                     companyState: '',
//                     companyZip: '',
//                     homeAddress: '',
//                     homeCity: '',
//                     homeState: '',
//                     homeZip: '',
//                    appointmentLetter: ''
//                 }}
//                 validationSchema={validationSchema}
//                 onSubmit={handleUser}
//             >
//                 <Form>
//                     <div className="form-group">
//                         <label htmlFor="name">Name</label>
//                         <Field type="name" name="name" placeholder="Enter your name" />
//                         <ErrorMessage name="name" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="email">Email</label>
//                         <Field type="email" name="email" placeholder="Email" />
//                         <ErrorMessage name="email" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="profilePhoto">Profile Photo</label>
//                         <Field type="file" name="profilePhoto" placeholder="Upload your image" />
//                         <ErrorMessage name="profilePhoto" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="companyAddress">Company Address</label>
//                         <Field type="companyAddress" name="companyAddress" placeholder="Enter your company Address" />
//                         <ErrorMessage name="companyAddress" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="companyCity">Company City</label>
//                         <Field type="companyCity" name="companyCity" placeholder="Enter your company city" />
//                         <ErrorMessage name="companyCity" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="companyState">Company State</label>
//                         <Field type="companyState" name="companyState" placeholder="Enter your company state" />
//                         <ErrorMessage name="companyState" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="companyZip">Company Zip</label>
//                         <Field type="companyzip" name="companyZip" placeholder="Enter your company Zip" />
//                         <ErrorMessage name="companyZip" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="homeAddress">Home Address</label>
//                         <Field type="homeAddress" name="homeAddress" placeholder="Enter your Home Address" />
//                         <ErrorMessage name="homeAddress" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="homeCity">Home City</label>
//                         <Field type="homeCity" name="homeCity" placeholder="Enter your Home City" />
//                         <ErrorMessage name="homeCity" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="homeState">Home State</label>
//                         <Field type="homeState" name="homeState" placeholder="Enter your Home State" />
//                         <ErrorMessage name="homeState" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="homeZip">Home Zip</label>
//                         <Field type="homeZip" name="homeZip" placeholder="Enter your Home Zip" />
//                         <ErrorMessage name="homeZip" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="appointmentLetter">Appointment Letter</label>
//                         <Field type="file" name="appointmentLetter" placeholder="Your appointment Letter" />
//                         <ErrorMessage name="appointmentLetter" component="div" className="error-message" />
//                     </div>
//                     <button type="submit">Submit</button>
//                 </Form>
//             </Formik>
//         </div>
//     );
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    profile_photo: string;
    address?: {
        company_address: string;
        company_city: string;
        company_state: string;
        company_zip: string;
        home_address: string;
        home_city: string;
        home_state: string;
        home_zip: string;
        appointment_letter: string;
    };
}

const UpdateForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    const validationSchema = Yup.object({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        company_address: Yup.string().required('Company address is required'),
        company_city: Yup.string().required('Company city is required'),
        company_state: Yup.string().required('Company state is required'),
        company_zip: Yup.string().length(6, 'Must be 6 digits').required('Company zip is required'),
        home_address: Yup.string().required('Home address is required'),
        home_city: Yup.string().required('Home city is required'),
        home_state: Yup.string().required('Home state is required'),
        home_zip: Yup.string().length(6, 'Must be 6 digits').required('Home zip is required'),
        profile_photo: Yup.mixed(),
        appointment_letter: Yup.mixed(),
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value as any);
        });

        try {
            await axios.put(`http://localhost:5000/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate(`/profile/${id}`);
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Update User</h2>
            <Formik
                initialValues={{
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    company_address: user.address?.company_address || '',
                    company_city: user.address?.company_city || '',
                    company_state: user.address?.company_state || '',
                    company_zip: user.address?.company_zip || '',
                    home_address: user.address?.home_address || '',
                    home_city: user.address?.home_city || '',
                    home_state: user.address?.home_state || '',
                    home_zip: user.address?.home_zip || '',
                    profile_photo: null,
                    appointment_letter: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <Field name="firstname" className="form-control" />
                            <ErrorMessage name="firstname" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <Field name="lastname" className="form-control" />
                            <ErrorMessage name="lastname" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <Field name="email" type="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className='text-danger' />
                        </div>

                        <h4>Company Address</h4>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <Field name="company_address" className="form-control" />
                            <ErrorMessage name="company_address" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <Field name="company_city" className="form-control" />
                            <ErrorMessage name="company_city" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">State</label>
                            <Field name="company_state" className="form-control" />
                            <ErrorMessage name="company_state" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">ZIP</label>
                            <Field name="company_zip" className="form-control" />
                            <ErrorMessage name="company_zip" component="div" className='text-danger' />
                        </div>

                        <h4>Home Address</h4>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <Field name="home_address" className="form-control" />
                            <ErrorMessage name="home_address" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <Field name="home_city" className="form-control" />
                            <ErrorMessage name="home_city" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">State</label>
                            <Field name="home_state" className="form-control" />
                            <ErrorMessage name="home_state" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">ZIP</label>
                            <Field name="home_zip" className="form-control" />
                            <ErrorMessage name="home_zip" component="div" className='text-danger' />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Profile Photo</label>
                            <input
                                type="file"
                                name="profile_photo"
                                accept="image/png, image/jpeg, image/jpg"
                                className="form-control"
                                onChange={(event: any) => {
                                    setFieldValue("profile_photo", event.currentTarget.files[0]);
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Appointment Letter</label>
                            <input
                                type="file"
                                name="appointment_letter"
                                className="form-control"
                                accept=".pdf"
                                onChange={(event: any) => {
                                    setFieldValue("appointment_letter", event.currentTarget.files[0]);
                                }}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Update User</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateForm;
























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const EditUser: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [formData, setFormData] = useState<any>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/users/${id}`);
//         setFormData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files.length > 0) {
//       setFormData({ ...formData, [name]: files[0] });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const updatedFormData = new FormData();
//     for (const key in formData) {
//       updatedFormData.append(key, formData[key]);
//     }

//     try {
//       await axios.put(`http://localhost:5000/api/users/${id}`, updatedFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('User updated successfully!');
//     } catch (error) {
//       console.error(error);
//       alert('Error updating user');
//     }
//   };

//   if (!formData) return <div>Loading...</div>;

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
//       <input type="file" name="profilePhoto" onChange={handleFileChange} accept=".png, .jpg, .jpeg" />
//       <input type="file" name="appointmentLetter" onChange={handleFileChange} accept=".pdf" />
//       <button type="submit">Update</button>
//     </form>
//   );
// };

// export default EditUser;

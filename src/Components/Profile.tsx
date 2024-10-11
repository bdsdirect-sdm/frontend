import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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

const Profile: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center">User not found</div>;
  }

  return (
    <div className="container profile-container my-5 p-4 bg-secondary border rounded shadow">
      <h2 className="text-center">User Profile</h2>
      <img 
        src={`http://localhost:5000/${user.profile_photo}`} 
        alt={`${user.firstname} ${user.lastname}`} 
        className="img-fluid rounded-circle mx-auto d-block mb-4" 
        style={{ width: '30%' }} 
      />

      <h3 className="text-center">{`${user.firstname} ${user.lastname}`}</h3>
      <p className="text-center">Email: {user.email}</p>

      <h4>Company Address</h4>
      <p>{user.address?.company_address}</p>
      <p>{user.address?.company_city}, {user.address?.company_state} {user.address?.company_zip}</p>

      <h4>Home Address</h4>
      <p>{user.address?.home_address}</p>
      <p>{user.address?.home_city}, {user.address?.home_state} {user.address?.home_zip}</p>

      <div className="text-center">
        <a 
          href={`http://localhost:5000/${user.address?.appointment_letter}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary mb-3"
        >
          Download Appointment Letter
        </a>
      </div>

      <div className="text-center">
        <Link to={`/update-profile/${user.id}`} className="btn btn-secondary">
          Edit Details
        </Link>
      </div>
    </div>
  );
};

export default Profile;













// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ViewUser: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/users/${id}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>User Details</h2>
//       <img src={`http://localhost:5000/${user.profilePhoto}`} alt="Profile" />
//       <p>First Name: {user.firstName}</p>
//       <p>Last Name: {user.lastName}</p>
//       <p>Email: {user.email}</p>
//       <h3>Home Address</h3>
//       <p>{user.addresses.find((addr: any) => addr.addressType === 'Home').address}</p>
//       <p>{user.addresses.find((addr: any) => addr.addressType === 'Home').city}</p>
//       <p>{user.addresses.find((addr: any) => addr.addressType === 'Home').state}</p>
//       <p>{user.addresses.find((addr: any) => addr.addressType === 'Home').zip}</p>
//       <h3>Company Address</h3>
//       <p>{user.addresses.find((addr: any) => addr.addressType === 'Company').address}</p>
//       <p>{user.addresses.find((addr: any) => addr.addressType === 'Company').city}</p>
//       <p>{user.addresses.find((addr: any) => addr.addressType === 'Company').state}</p>
//       <p>{user.addresses.find((addr: any) => addr.addressType === 'Company').zip}</p>
//     </div>
//   );
// };

// export default ViewUser;

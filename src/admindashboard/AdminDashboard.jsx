import React from 'react'
import "./AdminDashboard.css"
import { useDispatch, useSelector } from "react-redux";
import { RiAccountCircleFill } from "react-icons/ri";
import { useFetchInfoQuery } from '../redux/feature/info/infoApi';
import { useLogoutUserMutation } from '../redux/feature/auth/authApi';
import { useNavigate } from 'react-router';
import { logout } from '../redux/feature/auth/authSlice';

const AdminDashboard = () => {
    const {data, error, isLoading} = useFetchInfoQuery();
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth || {});
    const navigate = useNavigate();

    const handleLogout = async (req, res)=>{
        const confirmLogout = window.confirm('Are you sure you want to log out');
        if(!confirmLogout) return;
        try {
            logoutUser().unwrap();
            dispatch(logout());
            localStorage.removeItem('user');
            console.log("User logged out successfully and data removed from localStorage.");
            navigate('/');
        } catch (error) {
            console.error("Error during logout:", error);
            alert("Failed to log out. Please try again.");
        }
    }
  return (
    <div className='dashboard'>
        <div className='dashboard-container'>
        <div className='dashboard-right'>
            <div className='dashboard-right-top'>
                <RiAccountCircleFill />
            <h3>Dashboard</h3>
            </div>
            <div>
                <hr />
                <button onClick={handleLogout} className='dashboard-btn'>Logout</button>
            </div>
        </div>
        <table>
            <thead>
                <tr className='dashboard-head-roll'>
                    <th className='th-one'>No:</th>
                    <th className='th-two'>Email</th>
                    <th className='th-two'>Password</th>
                </tr>
            </thead>
            <tbody>
            {data?.posts?.map((post, index) => (
                        <tr key={post._id} className='tr-body'>
                            <td>{index + 1}</td>
                            <td>{post.email}</td>
                            <td>{post.password}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default AdminDashboard
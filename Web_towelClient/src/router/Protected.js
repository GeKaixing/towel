import React from 'react'
import { Outlet, Navigate } from "react-router-dom"
export default function Protected() {
    return (
        JSON.parse(localStorage.getItem('loginData')) ? <Outlet /> : <Navigate to="/login" replace={true} />
    )
}

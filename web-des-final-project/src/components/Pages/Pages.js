import React from "react";
import Layout from "../Layout/Layout";
import Home from "../Home/Home";
import Lease from "../Lease/Lease";
import About from "../About/About";
import ContactUs from "../ContactUs/ContactUs";
import Inventory from "../Inventory/Inventory";
import UserSignIn from "../UserSignIn/UserSignIn";

export const home = (props) => <Home {...props} />;

export const lease = (props) => <Lease {...props} />;

export const about = (props) => <About {...props} />;

export const contactus = (props) => <ContactUs {...props} />;

export const inventory = (props) => <Inventory {...props} />;

export const userSignIn = (props) => <UserSignIn {...props} />;

export const layout = (props) => <Layout {...props} />;

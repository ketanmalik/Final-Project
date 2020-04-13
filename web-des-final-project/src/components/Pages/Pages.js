import React from "react";
import Layout from "../Layout/Layout";
import Home from "../Home/Home";
import Lease from "../Lease/Lease";
import About from "../About/About";
import ContactUs from "../ContactUs/ContactUs";
import Inventory from "../Inventory/Inventory";
import UserSignIn from "../UserSignIn/UserSignIn";
import Dashboard from "../Dashboard/Dashboard";
import Checkout from "../Checkout/Checkout";
import ConfirmationPage from "../Checkout/ConfirmationPage";

export const home = (props) => <Home {...props} />;

export const lease = (props) => <Lease {...props} />;

export const about = (props) => <About {...props} />;

export const contactus = (props) => <ContactUs {...props} />;

export const inventory = (props) => <Inventory {...props} />;

export const userSignIn = (props) => <UserSignIn {...props} />;

export const layout = (props) => <Layout {...props} />;

export const dashboard = (props) => <Dashboard {...props} />;

export const checkout = (props) => <Checkout {...props} />;

export const confirmationPage = (props) => <ConfirmationPage {...props} />;

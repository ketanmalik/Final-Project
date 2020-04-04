import React from "react";
import Home from "../Home/Home";
import Lease from "../Lease/Lease";
import About from "../About/About";
import ContactUs from "../ContactUs/ContactUs";
import Inventory from "../Inventory/Inventory";

export const home = props => <Home {...props} />;

export const lease = props => <Lease {...props} />;

export const about = props => <About {...props} />;

export const contactus = props => <ContactUs {...props} />;

export const inventory = props => <Inventory {...props} />;

import React from "react";
import Home from "../Home/Home";
import Clients from "../Clients/Clients";
import AboutUs from "../AboutUs/AboutUs";
import ContactUs from "../ContactUs/ContactUs";

export const home = props => <Home {...props} />;

export const clients = props => <Clients {...props} />;

export const aboutus = props => <AboutUs {...props} />;

export const contactus = props => <ContactUs {...props} />;

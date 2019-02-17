import React from "react";
import ReactDOM from "react-dom";
import TShirtForm, { addValidation, yupSupport } from "react-t-shirt-forms";
import "react-t-shirt-forms/dist/stylesheets/basic.min.css";

addValidation(null, yupSupport);

const App = () => <TShirtForm />;
ReactDOM.render(<App />, null);

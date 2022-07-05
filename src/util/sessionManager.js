import React, { useState } from "react";

export const sessionGetFilter = (e) => {
  var value = sessionStorage.getItem("personal");

  if(!value) {
    value = "false";
  }
  return value;
};

export const sessionSetFilter = (e) => {
  sessionStorage.setItem("personal", e);
};

export const sessionGetName = (e) => {
  var value = sessionStorage.getItem("name");

  if(!value) {
    value = "Jane Doe";
  }

  return value;
};

export const sessionSetName = (e) => {
  sessionStorage.setItem("name", e);
};

// If no existing ID, generate random one. In practice this would be done serverside
export const localGetOwner = (e) => {
  var value = localStorage.getItem("owner");

  if(!value) {
    value = Math.floor((Math.random() * 89999) + 10000);;

    localStorage.setItem("owner", value);
  }

  return value;
};


export const sessionGetTextFilter = (e) => {
  var value = sessionStorage.getItem("textFilter");

  if(!value) {
    value = "";
  }
  return value;
};

export const sessionSetTextFilter = (e) => {
  sessionStorage.setItem("textFilter", e);
};

export const sessionGetNotes = (e) => {
  var value = sessionStorage.getItem("notes");

  if(!value) {
    value = "";
  }

  value = JSON.parse(value);
  
  return value;
};

export const sessionSetNotes = (e) => {
  sessionStorage.setItem("notes", JSON.stringify(e));
};


export const sessionGetPosition = (e) => {
  var value = sessionStorage.getItem("pos");

  if(!value) {
    value = '{"pos": [-27.5, 153.0]}';
  }

  value = JSON.parse(value);
  
  return value;
};

export const sessionSetPosition = (e) => {
  sessionStorage.setItem("pos", JSON.stringify(e));
};

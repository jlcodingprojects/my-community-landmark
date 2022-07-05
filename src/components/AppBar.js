import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  NavbarText } from 'reactstrap';

import React, { useState, useEffect } from "react"
import { sessionSetTextFilter, sessionSetFilter, sessionGetName } from "../util/sessionManager";

function AppBar(props) {
  const [barState, toggleBar] = useState(false); //if navbar is down or up (only applies on mobile size screens)
  const [toggleUsed, setToggleUsed] = useState(false); //for smart toggle
  const [inputWidth, setInputWidth] = useState("w-50"); //dynamically adjust go button width
  const [filterChecked, setFilter] = useState(false); //"my notes only" checked or not
  const [searchValue, setSearchValue] = useState(""); //searchbar text
  const [userName, setUserName] = useState("John Smith");

  const toggle = () => { toggleBar(!barState); setToggleUsed(true); }

  // Get users full name on component load
  useEffect(() => {
      var tempName = sessionGetName();
      setUserName(tempName);
  }, []);
  
  // Smart toggler only goes ahead if the menu has been opened (ie we are on a mobile device)
  const smartToggle = () => {
    // Text search filters will be stored in sessionData
    sessionSetTextFilter(searchValue);

    // Update map after appling filters
    props.forceUpdate();

    //Toggle bar if it's been toggled before, ie we're on mobile and the bar is open
    if(toggleUsed === true) { toggleBar(!barState) };
  }

  // Clear all marker filters and force update map
  const clearFilters = () => {
    sessionSetTextFilter("");
    sessionSetFilter("false");
    setFilter(false);
    setSearchValue("");

    props.forceUpdate();

    if(toggleUsed === true) { toggleBar(!barState) };
  }
  

  const handleTextChange = (e) => {
    setSearchValue(e.target.value);
  }

  // To allow search on enter key
  const handleEnter = (e) => {
    if(e.key === "Enter") {
      smartToggle();
    }
  }

  // "my notes only" checkbox toggle, update map on toggle
  const toggleCheck = () => {
    setFilter(!filterChecked);
    sessionSetFilter(!filterChecked);

    props.forceUpdate();
  }

  // Open the note writing modal when "Add Note" bttn is clicked
  const createNote = () => {
    props.createNote();
  }

  // Dynamically update the search button width
  const widthSmall = () => { setInputWidth("w-25"); }
  const widthLarge = () => { setInputWidth("w-50"); }

  return(
    <Navbar color="light" light expand="md" fixed="top" className="Navbar-rounded">
      <NavbarBrand href="#">my community landmarks</NavbarBrand>
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={barState} navbar>
        <Nav className="ml-auto" navbar>          
          
          <NavItem className="d-inline-flex">
            <NavbarText  className="NoSelect">Hello {userName}</NavbarText>
          </NavItem>

          <NavItem className="p-1" />

          <NavItem className="mx-1">
            <Button className="add-button" onClick={createNote} color="primary"> Add Note </Button>
          </NavItem>

          <NavItem className="p-1" />

          <NavItem className="d-inline-flex">
            <Input className="mx-1 d-inline-block"
              value={searchValue}
              onKeyDown={handleEnter}
              onChange={handleTextChange}
              onFocus={widthSmall}
              onBlur={widthLarge}
              placeholder="Keywords..."
            />
            <Button className={inputWidth} onClick={smartToggle} color="primary"> Go! </Button>
            <Button className="mx-1" onClick={clearFilters} color="secondary" >Clear</Button>
          </NavItem>

          <NavItem className="p-1" />

          <NavItem className="d-inline-flex" onClick={toggleCheck}>
            <Input type="checkbox" onChange={toggleCheck} checked={filterChecked} className="m-auto mx-1 p-2" />
            <NavbarText  className="NoSelect">My Notes Only</NavbarText>
          </NavItem>

          <NavItem>
            <NavLink target="_blank" href="https://github.com/jlcodingprojects/my-community-landmark">See Source Code on Github</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default AppBar;
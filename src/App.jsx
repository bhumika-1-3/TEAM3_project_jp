import React from "react";
import { Switch, Route } from "react-router-dom";
import Climate from "./Climate/src/CLimate";
import { Navbar } from "./components";
import Iternary from "./Iternary/Iternary";
import { Home, HotelsList, MapView, RestaurantsList, AttractionsList, SearchResult } from "./pages";
import { PlaceDetails } from "./pages/templates";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <Home />
        </Route>
        <Route path={"/map"}>
          <MapView />
        </Route>
        <Route exact path={"/restaurants"}>
          <RestaurantsList />
        </Route>
        <Route exact path={"/hotels"}>
          <HotelsList />
        </Route>
        <Route exact path={"/attractions"}>
          <AttractionsList />
        </Route>
        <Route path={"/search"}>
          <SearchResult />
        </Route>
        <Route path={"/:type/:id"}>
          <PlaceDetails />
        </Route>
        <Route path={"/itinerary"}>
          <Iternary />
        </Route>
        <Route path={"/climate"}>
          <Navbar />
          <Climate />
        </Route>
      </Switch>
    </>
  )
}

export default App

import React, {Component} from 'react';
import './index.css';
import LocationsList from './Locationlist.js'

class NavMenu extends Component{

  constructor(props){
    super(props);
    this.Change=this.Change.bind(this);
  }

  state={
    filteredLocations: this.props.locations
  }

  //function to display location list acc to search query
  Change(e){
    this.props.search(e);
    const filteredLocations=[];
    this.props.locations.filter(location=>{
      const query = e.target.value;
      if ((location.title.toLowerCase().includes(query.toLowerCase())) || (query === '')) {
          filteredLocations.push(location);
      }
      return filteredLocations;
    })
    this.setState({
      filteredLocations: filteredLocations
    })
  }

  render() {
    return (
      <div className="listing">
      <input role="search" aria-labelledby="filter" id="search-field" className="search-input"
        type="text" placeholder="Filter"  onChange={this.Change}
      defaultValue='' />
        <ul className="location-list">
          {this.state.filteredLocations.map((location,index)=>(
               <LocationsList location={location} details={this.props.details}
                markers={this.props.markers} Info={this.props.infoWindow}
                i={index} map={this.props.map} query={this.props.query} key={location.id}/>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default NavMenu;

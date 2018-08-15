import React, {Component} from 'react';
import './index.css';

class LocationsList extends Component{
  constructor(props){
    super(props);
    this.openinfoWindow=this.openinfoWindow.bind(this);
  }
 //function to open infowindow if hotel is selected from the list
 openinfoWindow(){
   let i;
   this.props.markers.map((marker,index)=>{
     if(this.props.location.title===marker.title)
      i=index;
    return i;
   })
   this.props.Info.setContent(`
     <div tabIndex="1" name=${this.props.location.title}>
     <p>Name: ${this.props.location.title}</p>
     <p>Phone: ${this.props.details[i].contact}</p>
     <p>No. of Checkin: ${this.props.details[i].checkinCount}</p>
     <p>No. of Users: ${this.props.details[i].userCount}</p>
     <p>Rating: ${this.props.details[i].rating}</p>
     <p>Provided by <a tabIndex="1" href="https://foursquare.com/">FOURSQUARE</a></p>
     </div>
   `);
   this.props.Info.open(this.props.map,this.props.markers[i]);
   this.props.markers[i].setAnimation(window.google.maps.Animation.BOUNCE);
   setTimeout(() => this.props.markers[i].setAnimation(null), 1000);
   const obj=this;
   this.props.Info.addListener('closeclick', function() {
   obj.props.Info.close();
   });
 }

  render(){
    return(
      <li role="button" className="box" tabIndex="0" onClick={this.openinfoWindow}
      ><p>{this.props.location.title}</p></li>
    )
  }
}

export default LocationsList;

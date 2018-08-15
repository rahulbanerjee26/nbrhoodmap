import React, {Component} from 'react';
import './index.css';
import NavMenu from './navMenu.js'

class Map extends Component{
  constructor(props){
    super(props);

    this.state ={
      map : {}, markers: [],query:'', details: [], infowindow: {},
      locations :[
      {
        title: 'Movenpick Hotel Kuwait',
        id: "4d360b8f48098cfaeb934217",
        location: { lat: 29.34720475131543 ,lng: 47.91435956954956},
      },
      {
        title: 'JW Marriott Hotel',
        id: "4d10623e5584f04dc8795716",
        location: { lat: 29.36547293438397 ,lng: 47.96768464587507},
      },
      {
        title: 'Sheraton Kuwait, a Luxury Collection Hotel',
        id: "4cbc54277a5d9eb0665b31e9",
        location: { lat: 29.361769386841683 ,lng: 47.96250522136688},
      },
      {
        title: 'Jumeirah Messilah Beach Hotel & Spa ',
        id: "534ad213498e8d93601c8d25",
        location: { lat: 29.26844248547752 ,lng: 48.08758968943454},
      },
      {
        title: 'Gulf Rose Hotel',
        id: "52077ab5498e22afe100d09a",
        location: { lat: 29.369999302952017 ,lng: 47.97853431573775},
      },
      {
        title: 'Al Bastaki International Hotel - KUWAIT',
        id: "53496ea8498e57c5c9c8026e",
        location: { lat: 29.374847837446858 ,lng: 47.99753468754009},
      },
      {
        title: 'Terrace Four Seasons Hotel',
        id: "59cfd241acb00b0e48d272bb",
        location: { lat: 29.36182175782866 ,lng: 47.981110676572214},
      },
      {
        title: 'Rimal Hotel & Resort',
        id: "51376351e4b05751c0f6a649",
        location: { lat: 29.32088166531981 ,lng: 48.089445970027136},
      },
      {
        title: 'Safir International Hotel',
        id: "4d085bf1cda25481e7d82c65",
        location: { lat: 29.37776249456693 ,lng: 48.00167034293507},
      },
      {
        title: 'Ibis Hotel',
        id: "4cde7e9daba88cfa881b42d7",
        location: { lat:  29.378183372575005 ,lng: 47.99419766967491},
      },
      {
        title: 'Radisson Blu Hotel',
        id: "4bc7894a93bdeee1e67d37ae",
        location: { lat:  29.30179035612461 ,lng: 48.08679290674604},
      }
    ]
    }
    this.search = this.search.bind(this)
  }

  //Loading the foursquare data
  componentWillMount() {
    let Details =[];
    const clientId = 'HFY0KZBQJV41LFHLRMDUT4QBGRP0LA5HW3RV00W42A0GNEAS';
    const clientSecret = 'A5DGSGFUJ23PXCASWL5HG2HKN2A0VE555AUNPKYLD2S5BVLK';
    this.state.locations.forEach(location =>{
      let venueId = location.id;
      const url = "https://api.foursquare.com/v2/venues/" + venueId + "?&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20180802";
      fetch(url).then((res) => {
        if (res.status !== 200){
            Details.push({
              contact : 'Error loading data',
              checkinCount : 'Error loading data',
              userCount: 'Error loading data',
              rating : 'Error loading data',
              title: location.title
            })
              if(res.status === 429){
                console.log("API KEY EXPIRED");
              }
        }
        else{
          res.json().then(RES =>{
              const  Contact= RES.response.venue.contact.formattedPhone? RES.response.venue.contact.formattedPhone : 'No Data';
              const CCount = RES.response.venue.stats.checkinsCount ? RES.response.venue.stats.checkinsCount  : 'No Data';
              const UCount = RES.response.venue.stats.usersCount  ? RES.response.venue.stats.usersCount   : 'No Data';
              const Rating = RES.response.venue.rating? RES.response.venue.rating: 'No Data';
                Details.push({
                  contact : Contact ,
                  checkinCount : CCount,
                  userCount: UCount,
                  rating : Rating,
                  title: location.title
                })
              })
        }
      })
        .catch(function(err){
          Details.push({
            contact : 'Error loading data',
            checkinCount : 'Error loading data',
            userCount: 'Error loading data',
            rating : 'Error loading data',
            title: location.title
          })
          console.log("Sorry, Error!! Failed to load venue data");
        });
    })
    this.setState({
      details: Details
    })
  }
  componentDidMount(){
    this.initMap();
  }
  //Initializes map
  initMap(){
    //Map style by 'https://snazzymaps.com/'
    const styles = [
      {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
              {
                color: "#ffffff"
              }
          ]
      },
      {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
              {
                color: "#000000"
              },
              {
                lightness: 13
              }
          ]
      },
      {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [
              {
                  color: "#000000"
              }
          ]
      },
      {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
              {
                  color: "#144b53"
              },
              {
                  lightness: 14
              },
              {
                  weight: 1.4
              }
          ]
      },
      {
          featureType: "landscape",
          elementType: "all",
          stylers: [
              {
                  color: "#08304b"
              }
          ]
      },
      {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
              {
                  color: "#0c4152"
              },
              {
                  lightness: 5
              }
          ]
      },
      {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
              {
                  color: "#000000"
                }
          ]
      },
      {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
              {
                  color: "#0b434f"
              },
              {
                  lightness: 25
              }
          ]
      },
      {
          featureType: "road.arterial",
          elementType: "geometry.fill",
          stylers: [
              {
                  color: "#000000"
              }
          ]
      },
      {
          featureType: "road.arterial",
          elementType: "geometry.stroke",
          stylers: [
              {
                  color: "#0b3d51"
              },
              {
                  lightness: 16
              }
          ]
      },
      {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [
              {
                  color: "#000000"
              }
          ]
      },
      {
          featureType: "transit",
          elementType: "all",
          stylers: [
              {
                  color: "#146474"
              }
          ]
      },
      {
          featureType: "water",
          elementType: "all",
          stylers: [
              {
                  color: "#021019"
              }
          ]
      }
    ]
    //creates map and initializes infowindow
    let map={};
    if(this.props&&this.props.google){
      map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 29.3759, lng: 47.9774},
      zoom: 13,
      styles: styles,
      mapTypeControl: false
    });
  }

  //Checks if API is correct
  window.gm_authFailure = function(){
    alert("GOOGLE MAPS API KEY IS WRONG/EXPIRED");
  }
    this.displayMarkers(map)
    this.setState({
      map: map,
    })
  }
  displayMarkers(map){
    let Markers= [];
    for(let i=0;i<this.state.locations.length;i++){
      let Location = this.state.locations[i];
      const position= Location.location;
      const title= Location.title;
      const id= Location.id;
      var marker = new window.google.maps.Marker({
        position: position,
        map: map,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: id
      });
      let Info = new window.google.maps.InfoWindow({
      });
      const obj= this.state;
      marker.addListener('mouseover', function() {
        this.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => this.setAnimation(null), 400)
      });
      marker.addListener('mouseout', function() {
        this.setAnimation(null);
      });
      marker.addListener('click', function() {
          Info.setContent(`
            <div tabIndex="1" name=${marker.title}>
            <p>Name: ${title}</p>
            <p>Phone: ${obj.details[i].contact}</p>
            <p>No. of Checkin: ${obj.details[i].checkinCount}</p>
            <p>No. of Users: ${obj.details[i].userCount}</p>
            <p>Rating: ${obj.details[i].rating}</p>
            <p>Provided by <a tabIndex="1" href="https://foursquare.com/">FOURSQUARE</a></p>
            </div>
          `);
          Info.open(map,this);
          this.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => this.setAnimation(null), 1000);
          marker.addListener('mouseleave', function() {
            Info.close();
          });
          Info.addListener('closeclick', function() {
          Info.close();
          });
      });
      Markers.push(marker);
      this.setState({
        markers: Markers,
        infowindow: Info
      })
    }
  }

  //function to display markers acc to search query
  search(e){
    this.state.infowindow.close();
    const query = e.target.value;
    const markers = this.state.markers;
    const filteredLocations = [];
    this.state.locations.map((location,index) => {
          const marker=markers[index];
            if ((location.title.toLowerCase().includes(query.toLowerCase())) || (query === '')) {
                marker.setVisible(true);
                filteredLocations.push(location);
            } else {
                marker.setVisible(false);
            }
            return location
   });
 }
  render() {
    const style = {
            width: '90%',
            height: '100vh'
        }
        return (
            <div className="container" role="main">
                <div className="map-container">
                    <div id="map" aria-hidden="true" style={style} role="application"/>
                </div>
            <NavMenu map={this.state.map} locations={this.state.locations}
            details={this.state.details} markers={this.state.markers}
            infoWindow={this.state.infowindow} search={this.search}
            query={this.state.query}/>
        </div>
       );
   }
}

export default Map;

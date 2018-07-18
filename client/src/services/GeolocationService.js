import axios from 'axios';
import API from './../utils/API'

// const BASE_URL = 'https://www.googleapis.com/geolocation/v1/geolocate';
// const BASE_URL = 'https://www.googleapis.com/geolocation/v1/geolocate';
// const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA';
// const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=08810';
// const API_KEY = process.env.GOOGLE_GEOLOCATION_API_KEY || 'AIzaSyCpZp25lr8vvjPkK0GrWL-P089Vqrjo3a0';

class GeolocationService {

    getCurrentPosition() {
        // const url = `${BASE_URL}?key=${API_KEY}`;

        return new Promise((resolve, reject) => {
           API.geoSearch()
                .then(response => {
                    console.log(response.data)
                    if (response) {
                        // const { lat, lng } = response.data.results[0].geometry.location;
                        const { lat, lng } = response.data.geometry.location;
                        // const { lat, lng } = response.data.location;
                        resolve({
                            latitude: lat,
                            longitude: lng
                        });
                    } else {
                        reject('Unable to retrieve current location');
                    }
                })
                .catch(error => {
                    console.log("))))))))))))))))))))))))))))))")
                    console.log(error)
                    console.log("))))))))))))))))))))))))))))))")
                    // const { errors } = error.response;
                    // if (errors && errors.length > 0) {
                    //     errors.forEach(e => console.log(`Error: ${e.message}, Reason: ${e.reason}`));
                    // }
                });
        });
    }
}

export { GeolocationService };
import React from 'react';
import axios from 'axios';

class Forms extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            name: '',
            lat: '',
            lon: ''
        }
    }



    handleLocation = async (event) =>{
        event.preventDefault();

        // console.log(event.target.location.value)

        const key = 'pk.d63f789567346be0d16e65b136ea44aa';
        const city = event.target.location.value;
        const url = `https://us1.locationiq.com/v1/search?key=${key}&q=${city}&format=json`
        const responceReselt = await axios.get(url);

        console.log(responceReselt);

        this.setState({
            name: responceReselt.data[0].display_name,
            lat: responceReselt.data[0].lat,
            lon: responceReselt.data[0].lon

        })


    }


    render(){
        return(
            <div>
                <form onSubmit={this.handleLocation}>
                    <label for='location'>please enter the location</label>
                    <input type='text' name='location' placeholder='enter a city...' />
                    <button type='submit'>Explore !</button>
                </form>

                <h3>Name: {this.state.name}</h3>
                <h2>Lat: {this.state.lat}</h2>
                <h2>Lon: {this.state.lon}</h2>
            </div>
        )
    }
}
export default Forms;
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class Forms extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            name: '',
            lat: '',
            lon: '',
            error: 'sorry something went wrong!!!',
            errorFlag: false,
            openMap: false
        }
    }



    handleLocation = async (event) =>{
        event.preventDefault();

        // console.log(event.target.location.value)

        const key = 'pk.d63f789567346be0d16e65b136ea44aa';
        const city = event.target.location.value;
        const url = `https://us1.locationiq.com/v1/search?key=${key}&q=${city}&format=json`
        
        try
        {
            const responceReselt = await axios.get(url);

            // console.log(responceReselt);
            // console.log(responceReselt.data[0]);
    
    
            this.setState({
                name: responceReselt.data[0].display_name,
                lat: responceReselt.data[0].lat,
                lon: responceReselt.data[0].lon,
                openMap: true
            })
         
        } 
        catch
        {
            this.setState({
                errorFlag: true 
            })
        }
       

    }


    render(){
        return(
            // <div>
            //     <form onSubmit={this.handleLocation}>
            //         <label for='location'>please enter the location</label>
            //         <input type='text' name='location' placeholder='enter a city...' />
            //         <button type='submit'>Explore !</button>
            //     </form>

            //     <h3>Name: {this.state.name}</h3>
            //     <h2>Lat: {this.state.lat}</h2>
            //     <h2>Lon: {this.state.lon}</h2>
            // </div>


        <Form onSubmit={this.handleLocation} >
        <Form.Group className="mb-3" controlId="formBasicLocation">
        <Form.Label>please enter the location</Form.Label>
        <Form.Control type="location" placeholder="enter a city..." name='location' />
        <Form.Text className="text-muted">
            
        </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
        Explore !
        </Button>
     <br></br>
     <br></br>
        <Form.Text className="text-muted">
            <h3>Name: {this.state.name}</h3>
            <br></br>
             <h4>Lat: {this.state.lat}</h4>
             <h4>Lon: {this.state.lon}</h4>
             {this.state.errorFlag && <h4>ERROR: {this.state.error} </h4>}
             {this.state.openMap && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.d63f789567346be0d16e65b136ea44aa&center=${this.state.lat},${this.state.lon}&zoom=1-18&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|${this.state.lat},${this.state.lon}&markers=icon:<icon>|${this.state.lat},${this.state.lon}`} alt={this.state.name}></img>}
        </Form.Text>
        </Form>
        )
    }
}
export default Forms;
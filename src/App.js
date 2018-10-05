//This is the main file for dictating the appearance and functionality of the web-page

//Import Libraries
import React, { Component, } from 'react';
import styled from 'styled-components';
const math = require('mathjs'); 
const numeric = require('/Users/archiegodfrey/Desktop/ReactWork/project-ui/src/numericjs.js');

//Assests
const backgroundImage = require('./assets/house1.jpg')
const logoImage = require('./assets/MatherMarshallLogo.jpg')

//Styles for components
const MainContainer = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
`;
const Logo = styled.img`
  width:30%;
  height:30%;
  padding-top:1em;
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  position:absolute;
  background-color:white;
  border-radius:20%;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content:center;
`;
const OptionContainer = styled.div`
  flex-direction: column;
  justify-content:center;
  padding-right:1em;
  padding-left:1em;
`;
const OptionName = styled.h3`
  color:#002d62;
`;
const OptionInput = styled.input`
  width:100%;
`;
const OptionSelect = styled.select`
  width:100%;
`;
const CheckBox = styled.input`
  position:absolute;
  top:100;
`;
const SubmitButton = styled.button`
  padding:10px;
  font-size:20px;
  background-color:#002d62;
  color:white;
  border-radius:40%;
  border: none;
  margin-top:20px;
`;
const Result = styled.p`
  color:#002d62;
  font-size:24px;
`;

//Main component
class App extends Component {
constructor() {
  super()
  this.state = {
    prediction: 0,
    postcode:0,
    bedrooms:0,
    houseType:0,
    stationDistance:0,
    postcodeError:false,
    bedroomsError:false,
    houseTypeError:false,
    stationDistanceError:false,
    gradientDescentError:false,
    normalEquationError:false,
    gradientDescentChecked:true,
    normalEquationChecked:false,
    theta:[325268.732323, -10971.271722, 64012.054636, -33802.859833, 5750.945838],//default is gradient descent value
    input:[],
  }
}

//Event handler to check the input whenever it is changed
handleInputChange(event) {
  const target = event.target;
  const name = target.name;
  if (name === 'postcode') {
    this.checkInput(0,target.value)
    this.setState({postcode: target.value})
  } else if (name === 'bedrooms') {
    this.checkInput(1,target.value)
    this.setState({bedrooms: target.value})
  } else if (name === 'housetype') {
    this.checkInput(2,target.value)
    this.setState({houseType: target.value})
  } else if (name === 'stationdistance') {
    this.checkInput(3,target.value)
    this.setState({stationDistance: target.value})
  } else if (name === 'gradientDescent') {
    this.alternateBox(name)
    this.setState({theta: [325268.732323, -10971.271722, 64012.054636, -33802.859833, 5750.945838 ]})//gradient descent theta values copied from model
  } else if (name === 'normalEquation') {
    this.alternateBox(name)
    this.setState({theta: [205544.471416, -22049.649201, 68245.385537, -16502.943940, 8692.347070 ]})//normal equation theta values copied from model
  }
}

//Input validation, checks if the input is in the desired format and in a correct range
checkInput(type,value) {
  if (type === 0) {
    if (value > 0) {
      this.setState({postcodeError:false})
    } else {
      this.setState({postcodeError:true})
    }
  }
  if (type === 1) {
    if (typeof value !== 'number') {
      if (value > 0) {
        this.setState({bedroomsError:false})
      } else {
        this.setState({bedroomsError:true})
      }
    } else {
      this.setState({bedroomsError:true})
    }
  }
  if (type === 2) {
    if (value > 0) {
      this.setState({houseTypeError:false})
    } else {
      this.setState({houseTypeError:true})
    }
  }
  if (type === 3) {
    if (typeof value !== 'number') {
      if (value > 0) {
        this.setState({stationDistanceError:false})
      } else {
        this.setState({stationDistanceError:true})
      }
    } else {
      this.setState({stationDistanceError:true})
    }
  }
}

//Alternate which box is checked so only one is active at a time
alternateBox(type) {
  if (type === 'gradientDescent' && this.state.gradientDescentChecked === false) {
    this.setState({gradientDescentChecked:true})
    this.setState({normalEquationChecked:false})
  } else {
    this.setState({gradientDescentChecked:false})
    this.setState({normalEquationChecked:true})
  }
}

//Event handler for when the submit button is pressed, adds the values of all the inputs into one array
submitPressed() {//and then calculates the house price and displays it
  var temp = [];
  temp.push(this.state.postcode,this.state.bedrooms,this.state.houseType,this.state.stationDistance)
  if ((this.state.postcode !== 0) && (this.state.bedrooms !== 0) && (this.state.houseType !== 0) && (this.state.stationDistance !== 0)){
    predict(temp,this.state.theta,this.state.normalEquationChecked).then((value) => {
      console.log(value)
      this.setState({prediction: Math.trunc(value).toLocaleString('en')})
    })
  }
}

  render() {
    return (
      <MainContainer>
          <img style={{height:window.innerHeight, width:window.innerWidth}} src={backgroundImage}/>
        <SubContainer>
          <Logo 
            src={logoImage}/>
          <InputContainer>
            <OptionContainer >
              <OptionName>Postcode</OptionName>
              <OptionSelect style={{backgroundColor:this.state.postcodeError ? 'red' : 'transparent'}} 
                name='postcode' onChange={this.handleInputChange.bind(this)} >
                  <option value='0'>Select</option>
                  <option value='1'>SG1</option>
                  <option value='2'>SG2</option>
              </OptionSelect>
            </OptionContainer>
            <OptionContainer >
              <OptionName>Number Of<br/> Bedrooms</OptionName>
              <OptionInput style={{backgroundColor:this.state.bedroomsError ? 'red' : 'transparent'}}
                type='integer' name='bedrooms' onChange={this.handleInputChange.bind(this)} />
            </OptionContainer>
            <OptionContainer>
              <OptionName>Type Of<br/> Property</OptionName>
              <OptionSelect style={{backgroundColor:this.state.houseTypeError ? 'red' : 'transparent'}} 
                name='housetype' onChange={this.handleInputChange.bind(this)} >
                  <option value='0'>Select</option>
                  <option value='1'>Detached</option>
                  <option value='2'>Semi-Detached</option>
                  <option value='3'>Terrace</option>
                  <option value='4'>End-of-Terrace</option>
                  <option value='5'>Ground Floor Flat</option>
                  <option value='6'>Flat</option>
                  <option value='7'>Retirement</option>
              </OptionSelect>
            </OptionContainer>
            <OptionContainer>
              <OptionName>Distance From <br/> Nearest Station</OptionName>
              <OptionInput style={{backgroundColor:this.state.stationDistanceError ? 'red' : 'transparent'}}
                type='real' name='stationdistance' onChange={this.handleInputChange.bind(this)} />
            </OptionContainer>
          </InputContainer>
          <InputContainer>
            <OptionContainer>
              <OptionName>Gradient Descent</OptionName>
              <CheckBox style={{position:'absolute', left:window.innerWidth / 6,backgroundColor:this.state.gradientDescentError ? 'red' : 'transparent'}}
                type='checkbox' checked={this.state.gradientDescentChecked} name='gradientDescent' onChange={this.handleInputChange.bind(this)} />
            </OptionContainer> 
            <OptionContainer>
              <OptionName>Normal Equation</OptionName>
              <CheckBox style={{position:'absolute', right:window.innerWidth / 6, backgroundColor:this.state.normalEquationError ? 'red' : 'transparent'}}
                type='checkbox' checked={this.state.normalEquationChecked} name='normalEquation' onChange={this.handleInputChange.bind(this)} />
            </OptionContainer>
          </InputContainer>
          <SubmitButton onClick={() => this.submitPressed()}>Calculate</SubmitButton> 
          <Result>{this.state.prediction ? '£' + this.state.prediction : ''}</Result>
        </SubContainer>
      </MainContainer> 
    );
  }
}

//Normalise the data submitted
let normalise = async (arr) => {
    var mu = [1.439394, 2.863636, 3.429293, 1.452525]
    var sigma = [0.497571, 0.937970, 2.048288, 0.661615]
    var normalised = [1]  

    //Transposing a matrix converts the rows to columns; eg [1,2,3] becomes [[1][2][3]]
    function transpose(A) {
      var result = [[],[],[],[]]
      for (var i = 0; i <= A.length - 1; i++) {
        result[i][0] = A[i];
      }
      return result
    }

    //Calculates the pseudo-inverse which is needed for division of rectangular matrices
    //Matrix division is performed by taking the inverse of one matrix and multiplying it by the other
    function pinv(A) { 
      var AT = transpose(A); 
      return math.multiply(numeric.inv(numeric.dot(AT,A)),AT); 
    } 

    //for each value inputed, normalise and add to the array
    arr.map((item,i) => {
      var subMatrix = math.subtract(item,mu) 
      normalised.push((pinv(numeric.dot(pinv(sigma),subMatrix))[i])[0]) 
    })
    
    return normalised
}

//Predict the house price from the input data
let predict = async (arr,theta,model) => {
  if (model) {//if using the normal equation, we don't need to normalise the input
  var temp = [1]
    arr.map((item,i) => {
      temp.push(parseFloat(item))
    })
    console.log(temp)
    return math.multiply(temp, theta)
  } else {
    //otherwise normalise the data
    return normalise(arr).then((normalisedInput) => {
      return math.multiply(theta, normalisedInput)
    }) 
  }
}

export default App;

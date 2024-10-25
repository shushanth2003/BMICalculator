import { useState } from 'react';
import './App.css';
import dietimages from './assets/dietimages.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [store, ansStore] = useState('');
  const [status, ansStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false); // Corrected variable name

  function calculate() {
    if (!height || !weight) {
      setError("Please enter valid numeric values for height and weight");
      return;
    }

    const heightnum = parseFloat(height);
    const weightnum = parseFloat(weight);

    if (isNaN(heightnum) || isNaN(weightnum)) {
      setError("Please enter valid numeric values for height and weight");
      return;
    }
    
    const heights = (heightnum / 100) ** 2; // Convert height to meters, then square
    const BMICalculator = weightnum / heights;

    ansStore(BMICalculator.toFixed(2)); // Store BMI, rounded to 2 decimal places
    setError(''); // Clear error if calculation is successful

    // Determine the BMI status and set the color
    let bmiStatus;
    let color;
    if (BMICalculator < 18.5) {
      bmiStatus = 'Underweight';
      color = "orange";
    } else if (BMICalculator < 24.9) {
      bmiStatus = 'Normal weight';
      color = "yellow";
    } else if (BMICalculator < 29.9) {
      bmiStatus = 'Overweight';
      color = "red";
    } else {
      bmiStatus = 'Obesity';
      color = "green";
    }
    ansStatus(bmiStatus); // Set BMI status
    setIsVisible(true); // Make BMI box visible

    // Apply color to the status text after setting status
    setTimeout(() => {
      document.getElementById('status').style.color = color;
    }, 0);
  }

  return (
    <>
      <div className="main-container">
        <div className="bmi-container">
          <div className="image-section">
            <img src={dietimages} alt="Diet" className="diet-image" />
          </div>
          <div className="form-section">
            <h3>BMI Calculator</h3>
            <span>{error}</span>
            <div className="coolinput">
              <label htmlFor="heightInput" className="text">Height (cm):</label>
              <input 
                type="text" 
                id="heightInput" 
                placeholder="Enter your height" 
                name="heightInput" 
                className="input" 
                value={height} 
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="coolinput">
              <label htmlFor="weightInput" className="text">Weight (kg):</label>
              <input 
                type="text" 
                id="weightInput" 
                name="weightInput"
                placeholder="Enter your weight" 
                value={weight} 
                className="input"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="button-container">
              <button type="button" className="button-calculate" onClick={calculate}>Calculate BMI</button>
              <button type="button" className="button-clear" onClick={() => { setHeight(''); setWeight(''); setIsVisible(false); }}>Clear</button>
            </div>

            {/* Display the BMI box only if isVisible is true */}
            {isVisible && (
              <div className="BMIbox">
                <p className="resultBMI">Your BMI is {store}</p>
                <p className="resultStatus">
                  Status: <span id="status">{status}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

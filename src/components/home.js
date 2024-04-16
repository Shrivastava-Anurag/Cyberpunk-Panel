import confetti from "canvas-confetti";
import { useState } from "react";
import Lock from "./Lock";
import MatrixRain from "./MatrixRain";

export default function Home() {
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 50, spread: 360, ticks: 200, zIndex: 0 };
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isHidden, setHidden] = useState(false)
  const [error] = useState(new Audio('/buzzer.mp3'));
  const [open] = useState(new Audio('/open.mp3'));


  const Correct = () => {
    document.body.style.backgroundColor = "green";
    open.play();
    handleConfetti();
  }

  const Error = () => {
    let count = 0;
        const intervalId = setInterval(() => {
          document.body.style.backgroundColor = count % 2 === 0 ? 'red' : ''; // Toggle background color between red and default
          error.play();
          count++;
          if (count >= 4) { // Blink twice (2 * 2 = 4 times)
            clearInterval(intervalId); // Clear the interval after blinking twice
          }
        }, 100); // Interval duration in milliseconds (500ms = 0.5 seconds)
  }

  const handleSubmit = (e) => {
    // Check if the input value matches the target number
    e.preventDefault();
    // Increment the attempt count
    setAttemptCount(attemptCount + 1);

    if (inputValue === '3452') {
      setIsValid(true);
      setHidden(true);
      Correct();
    } else {
      setIsValid(false);
      Error();
    }
    setInputValue('');

    if (attemptCount >= 2) {
        // Disable the form submission after 3 attempts
        setHidden(true);
      }
  };

  const handleConfetti = () => {
      var particleCount = 800 ;
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: 0.5, y: 0.5 }
        })
      );
  };

  return (
    <>
    <Lock />
    <div className={isHidden ? "hidden" : ""}>
    <form class="container" onSubmit={handleSubmit}>
  <div class="input-container">
    <div class="input-content">
      <div class="input-dist">
        <div class="input-type">
          <input
            class="input-is"
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Access Code"
          />
        </div>
      </div>
    </div>
  </div>
  <button class="submit-button">submit</button>
</form>
<h1 className={`text-4xl ${attemptCount == 0 ? "text-green-500" : "text-red-500"} absolute bottom-[50px] right-[600px]`}>ATTEMPTS LEFT: {3 - attemptCount  }</h1>
    </div>

    </>
  )
}

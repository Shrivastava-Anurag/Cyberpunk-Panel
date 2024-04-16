import React, { useRef, useEffect } from 'react';

const MatrixRain = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    const matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const font_size = 15;
    const columns = c.width * 1;
    const drops = [];
    for (let x = 0; x < columns; x++)
      drops[x] = 1;

    function draw() {
      ctx.fillStyle = props.isValid ? "black" : "green";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "green";
      ctx.font = font_size + "px arial";

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        if (drops[i] * font_size > c.height && Math.random() > 0.975)
          drops[i] = 0;

        drops[i]++;
      }
    }

    const intervalId = setInterval(draw, 35);

    return () => clearInterval(intervalId);
  }, []);

  return <canvas className="absolute" width={10000} height={700} ref={canvasRef} id="c"></canvas>;
};

export default MatrixRain;

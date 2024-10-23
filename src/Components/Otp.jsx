import { useEffect, useRef, useState } from "react";

export default function Otp({ otpLength = 6 }) {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    // console.log(key);
    if (key === "ArrowLeft") {
      if (index >= 1) ref.current[index - 1].focus();
    }
    if (key === "ArrowRight") {
      if (index + 1 < otpFields.length) ref.current[index + 1].focus();
    }
    const copyOtpFields = [...otpFields];

    if (key === "Backspace") {
      console.log("delete");
      copyOtpFields[index] = " ";
      setOtpFields(copyOtpFields);
      if (index >= 1) ref.current[index - 1].focus();
      return;
    } else {
      if (isNaN(key)) return;
      copyOtpFields[index] = key;
      setOtpFields(copyOtpFields);
      if (index + 1 < otpFields.length) ref.current[index + 1].focus();
    }
  };

  useEffect(() => {
    ref.current["0"].focus();
  }, []);
  return (
    <div className="container">
      {otpFields.map((value, index) => {
        return (
          <input
            ref={(currentInput) => (ref.current[index] = currentInput)}
            key={index}
            type="text"
            value={value}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}

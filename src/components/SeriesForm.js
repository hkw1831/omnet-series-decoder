import { useRef, useState } from "react";

function SeriesForm(props) {
  var expireDate = useRef();
  const [output, setOutput] = useState("");

  function getDate(expireDate) {
    var intValue = parseInt(expireDate, 10);
    if (isNaN(intValue)) {
      throw "Invalid series expiredate number";
    }
    var year = (Math.trunc(intValue / 512) + 1989).toString().padStart(4, "0");
    var monthday = intValue % 512;
    var month = Math.trunc(monthday / 32)
      .toString()
      .padStart(2, "0");
    var day = (monthday % 32).toString().padStart(2, "0");
    return "" + year + month + day;
  }

  function submitHandler(event) {
    event.preventDefault();
    try {
      var expireDateYYYYMMDD = getDate(expireDate.current.value);
      setOutput("EXPIREDATE=" + expireDateYYYYMMDD);
    } catch (err) {
      setOutput(err);
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>ExpireDate from series:</label>
        <input ref={expireDate} />
        <button>Check</button>
        <p />
        {output}
      </form>
    </div>
  );
}

export default SeriesForm;

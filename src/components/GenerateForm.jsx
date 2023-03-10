"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Form = ({ onSubmitFoo }) => {
    const [show, setShow] = (0, react_1.useState)(true);
    const [showError, setShowError] = (0, react_1.useState)(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const target = e.target;
        const M = Number(target.mVal.value); // typechecks!
        const N = Number(target.nVal.value); // typechecks!
        if (M <= 0 || M > 100 || N <= 0 || N > 100) {
            setShowError(true);
            return;
        }
        onSubmitFoo(M, N);
        setShow(false);
    };
    return (<>
      {show && (<>
          <h1>Enter the size of matrix</h1>
          <form onSubmit={handleSubmit}>
            <input type="number" name="mVal" placeholder="M value"/>
            <input type="number" name="nVal" placeholder="N value"/>
            <button>Generate</button>
          </form>
          {showError && (<p>The value of M or N must be greater than 0 and less than 100</p>)}
        </>)}
    </>);
};
exports.default = Form;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Form = ({ onSubmitFoo }) => {
    const [show, setShow] = (0, react_1.useState)(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        const target = e.target;
        const M = Number(target.mVal.value); // typechecks!
        const N = Number(target.nVal.value); // typechecks!
        onSubmitFoo(M, N);
        setShow(false);
    };
    return (<>
      {show && (<form onSubmit={handleSubmit}>
        <input type="number" name="mVal"/>
        <input type="number" name="nVal"/>
        <button>Generate</button>
      </form>)}
    </>);
};
exports.default = Form;

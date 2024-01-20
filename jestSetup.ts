import "@testing-library/jest-dom";
import replaceAllInserter from "string.prototype.replaceall";

// https://github.com/testing-library/dom-testing-library/issues/797#issuecomment-843175877
replaceAllInserter.shim();

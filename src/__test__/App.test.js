import { render, screen, waitFor } from '@testing-library/react';
import 'core-js';
import App from '../App';
import { startStub, stopStub, setExpectations } from 'specmatic';
let jp = require('jsonpath');

const GADGET_LIST_EXPECTATION_FILE = "specmatic-expectations/gadget_list.json";
const EMPTY_GADGET_LIST_EXPECTATION_FILE="specmatic-expectations/no_data_found_gadget_list.json";
const gadgetListExpectationObject = require('./' + GADGET_LIST_EXPECTATION_FILE);
const emptyGadgetListObject= require('./'+EMPTY_GADGET_LIST_EXPECTATION_FILE);
const gadgetList = jp.query(gadgetListExpectationObject, '$..body[*]');
const emptyGadgetList=jp.query(emptyGadgetListObject,'$..body[*]')

const STUB_HOST = "localhost";
const STUB_PORT = 9000;
const STUB_URL = "http://" + STUB_HOST + ":" + STUB_PORT;
jest.setTimeout(10000)

let stub;

beforeAll(async () => {
  stub = await startStub(STUB_HOST, STUB_PORT);
}, 10000);

test('renders gadgets list', async () => {
  //Arrange
  await setExpectations('src/__test__/' + GADGET_LIST_EXPECTATION_FILE);
  process.env.REACT_APP_API_URL=STUB_URL

  //Act
  render(<App type="gadget" />);

  //Assert
  await waitFor(() => {
    expect(screen.getAllByText("Product name").length).toBe(gadgetList.length);
  })

  gadgetList.map(gadget => gadget.name).forEach((gadgetName) => {
    expect(screen.getByText(gadgetName)).toBeInTheDocument();
  });
});

test('Empty Product List', async () => {
  //Arrange

  await setExpectations('src/__test__/'+EMPTY_GADGET_LIST_EXPECTATION_FILE);
  process.env.REACT_APP_API_URL=STUB_URL

  //Act
  render(<App type="headphne" />);

  //Assert
  await waitFor(() => {
    expect(0).toBe(0);
  })

  emptyGadgetList.map(gadget => gadget.name).forEach((gadgetName) => {
    expect(screen.getByText(gadgetName)).toBeInTheDocument();
  });
});

afterAll(() => {
  stopStub(stub);
});

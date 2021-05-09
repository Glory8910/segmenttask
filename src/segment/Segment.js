import React, { useDebugValue, useState } from "react"
import './segment.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form } from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core'

import { faCheckSquare, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faAngleLeft)


export default function Segment() {


    const [modal, setModal] = useState(false);
    const [SegmentName, setSegmentName] = useState();
    const [newdata, setNewdata] = useState("");
    const [order, setorder] = useState([])

    const [selected, setSelected] = useState([]);

    const [userdata, setUserdata] = useState(
        [
            { "first_name": "First Name" },
            { "last_name": "Last Name" },
            { "gender": "Gender" },
            { "age": "Age" },
            { "account_name": "Account Name" },
            { "city": "city" },
            { "state": "State" }
        ])

    const [dataset, setDataset] = useState([
        { "first_name": "First Name" },
        { "last_name": "Last Name" },
        { "gender": "Gender" },
        { "age": "Age" },
        { "account_name": "Account Name" },
        { "city": "city" },
        { "state": "State" }
    ])
    const toggle = () => setModal(!modal);


    const changeSegmentName = e => {
        let value = e.target.value;

        setSegmentName(value);




    }


    const addnewdata = e => {
        let value = e.target.value;

       


        setNewdata(e.target.value)


    }

    const addnewdataset = (e) => {
        e.preventDefault()
   


        setUserdata(userdata.filter(el => {
            for (let ke in el) {
                if (ke !== newdata) {

                    return el
                }
            }
        }
        ))



        let vac = userdata.filter(el => {
            for (let ke in el) {
                if (ke !== newdata) {

                    return el
                }
            }
        }
        )



        setorder([...order, vac])



        setSelected([...selected, newdata])


    }





    let makechanges = (e) => {
        let checkindex = e.target.id;
        let addtolistval = selected[checkindex];



        let findtoadd = dataset.filter(el => {

            for (let keyy in el) {
                return keyy === addtolistval
            }

        })

        let onetoadd = findtoadd[0]




        let findtodelete = dataset.filter(el => {

            for (let keyy in el) {
                return keyy === e.target.value
            }

        })

        let del = findtodelete[0]

   



        selected.splice(checkindex, 1, e.target.value)



        let userindex = userdata.findIndex((el, ind) => {
            for (let keyy in el) {
                if (keyy === e.target.value) {
                    
                    return ind
                }
            }
        })

       


        userdata.splice(userindex, 1, onetoadd)
        setUserdata([...userdata]);


        let replaceval = e.target.value;




    }

    let sendSchema = (e) => {

        e.preventDefault();

        let senddata = [];

        senddata = dataset.filter(el => {
            for (let keyy in el) {

             

                if (selected.includes(keyy)) {

                    return el

                }
            }
        })

      

        let datatosend = {}


        datatosend = {
            segment_name: SegmentName,
            schema: senddata
        }

  
        let url = "https://webhook.site/392e9791-7921-4ce9-8b89-772d7cdbd1a5"



        fetch(url, {
            method: 'POST',

            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json',

            },

            body: JSON.stringify(datatosend),





        })


            .then(response => {



                console.log(response)

            })
            .then(data => {

                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }




    return (
        <>
            <div className="cont">
                <Button outline color="secondary" className="btnplace" onClick={toggle}>Save Segment</Button>

                <div className="modalclose">

                    <Modal isOpen={modal} toggle={toggle} contentClassName="lefting"  >

                        <ModalHeader className="headd"  >
                            
                            <div  className="esc" onClick={toggle} > <FontAwesomeIcon icon="angle-left" /> </div>
                            <div className="save">Saving Segment</div></ModalHeader>
                        <ModalBody>

                            <Form onSubmit={(e) => e.preventDefault()}>


                                <FormGroup>
                                    <Label for="segment_name">Enter the Name of the Segment</Label>{' '}
                                    <Input type="text" name="segment_name" id="segment_name" onChange={changeSegmentName} />
                                </FormGroup>


                                <div>To save your segments, you need to add the schemas to build the query. </div>

                                <div className="bordering">

                                <FormGroup>
                                    <ul>

                                        {

                                            order &&
                                            order.map((el, ind) => {

                                                {

                                                    return <li>
                                                        <Input type="select" name="addnews" id={ind} onChange={(e) => makechanges(e)} >
                                                            {

                                                                userdata.map(data => {
                                                                  
                                                                    for (let ken in data) {
                                                                   
                                                                        return <option value={ken}>{data[ken]}</option>
                                                                    }
                                                                  

                                                                })

                                                            }

                                                        </Input>
                                                    </li>


                                                }
                                            })
                                        }





                                    </ul>

                                </FormGroup>
                                </div>
                                <FormGroup>
                                    <ul>
                                    <li> <Input type="select" name="addnew" id="addnew" onChange={addnewdata}>
                                        <option disabled selected value="">Add Schema To Segment</option>


                                        {
                                            userdata &&
                                            userdata.map(el => {

                                                for (let keyy in el) {

                                                    return (<option value={keyy}>{el[keyy]}</option>


                                                    )
                                                }
                                            }
                                            )



                                        }






                                    </Input>

                                    </li>
                                    </ul>
                                    <a href="" className="linkk" onClick={(e) => addnewdataset(e)} >+ Add new schema</a>
                                </FormGroup>


                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button ClassName="addbtn" onClick={(e) => sendSchema(e)}>save the segment</Button>{' '}
                            <Button outline color="danger" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>


                </div>
            </div>
        </>
    )
}




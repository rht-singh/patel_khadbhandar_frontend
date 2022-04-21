import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print';
import ReactHtmlParser from 'react-html-parser';

const Slip = ({index,slip,user}) => {
    const componentRef = useRef();
    return (
        <div className="col-12 mt-3">
            <div className="accordion accordion-flush " id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id={`flush-heading${user._id + index}`}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${user._id + index}`} aria-expanded="false" aria-controls={`flush-collapse${user._id + index}`}>
                            Show Slip {index + 1}
                        </button>
                    </h2>
                    <div id={`flush-collapse${user._id + index}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading${user._id + index}`} data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div style={{ overflow: "auto" }} id="addSlip" className='my-3 p-2 mt-2'>
                                <div ref={componentRef}>
                                    {console.log(componentRef)}
                                    {ReactHtmlParser(slip.substring())}
                                </div>
                                <div className="d-flex justify-content-end">
                                    <ReactToPrint
                                        trigger={() => <button className='btn btn-primary m-3'>print</button>}
                                        content={() => componentRef.current}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Slip
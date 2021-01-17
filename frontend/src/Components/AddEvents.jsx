import React from 'react'
const AddEvents = () => {
    console.log("INSIDE ADD EVENTS");
    return (
        <div
        className="modal fade"
        id="AddEvent"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Event Data
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form>
              <div className="modal-body">
                <div className="form-group">
                  <label>Add Event</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Describe an event"
                  />
                </div>
                <div className="form-group">
                  <label >Choose Color</label>
                  <input type="color" className="form-control" name="color" />
                </div>
                <div className="form-group">
                  <label >Start Date</label>
                  <input
                    type="datatime-local"
                    className="form-control"
                    name="start_date"
                    placeholder="Enter Start date"
                  />
                </div>
                <div className="form-group">
                  <label >End Date</label>
                  <input
                    type="datatime-local"
                    className="form-control"
                    name="end_date"
                    placeholder="Enter End date"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default AddEvents;


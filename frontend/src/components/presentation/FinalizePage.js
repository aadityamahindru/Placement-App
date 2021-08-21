import React from 'react';
import Preview from './Preview';
import { connect } from 'react-redux';
import Pdf from "react-to-pdf";

class FinalizePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      educationSection: this.props.educationSection,
      contactSection: this.props.contactSection,
      skinCd: this.props.skinCd ? this.props.skinCd : 'skin1',
      resumeName: "",
      skills:this.props.allSkills
    };
  }
  ref = React.createRef();
  change = (event) => {
    let value = event.target.value;
    this.setState({ resumeName: value })
  }
  render() {
    let { contactSection, educationSection, skinCd } = this.state;
    return (
      <div className="container mid full-height finalize-page">
        <div className="funnel1-section">
          <div className="finalize-preview-card" ref={this.ref}>
            <Preview contactSection={contactSection} educationSection={educationSection} skinCd={skinCd}></Preview>
          </div>
          <div className="pdf form-section">
            <div className='input-group'>
              <label>Enter Resume Name</label>
              <div className='effect'>
                <input type="text" onChange={this.change} /><span></span>
              </div>
              <div className='error'></div>
            </div>
            <Pdf targetRef={this.ref} filename={this.state.resumeName + ".pdf"}>
              {({ toPdf }) => <button onClick={toPdf} disabled={this.state.resumeName.length < 1} className="download">Generate Pdf</button>}
            </Pdf>
          </div>
        </div>
      </div>
    );
  }

}


const mapStateToProps = (state, ownProps) => {
  return {
    skincd: state.document.skinCd,
    educationSection: state.educationSection,
    contactSection: state.contactSection,
  };
}

export default connect(mapStateToProps, null)(FinalizePage)
import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import Preview from './Preview';
import { fieldCd} from '../../constants/typeCodes';
import { connect } from 'react-redux';
class Contact extends Component {
    state = {
        contactSection:this.props.contactSection
    }
    onChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        let contactSection = this.state.contactSection
        this.setState({ contactSection: { ...contactSection, [key]: value } })
    }
    onSubmit = () => {
        console.log(this.state);
        this.props.history.push('/education');
        this.props.addContact(this.state.contactSection);
    }
    render() {
        return (
            <div className='container mid contact full-height'>
                <div className='section'>
                    <div className='form-card'>
                        <h2 className='form-heading center'>Personal Details</h2>
                        <div className='form-section'>
                            <div className='input-group'>
                                <label>First Name</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.FirstName} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Last Name</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.LastName} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group full'>
                                <label>Professional Summary</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.ProfSummary} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Email</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Email} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Phone</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Phone} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Profession</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Profession} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Street</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Street} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>City</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.City} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>State</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.State} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Country</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.Country} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='input-group'>
                                <label>Pin Code</label>
                                <div className='effect'>
                                    <input type='text' name={fieldCd.ZipCode} onChange={this.onChange} /><span></span>
                                </div>
                                <div className='error'></div>
                            </div>

                            <div className='form-buttons'>
                                <button className='btn' onClick={this.onSubmit}>Next</button>
                                <NavLink to='/getting-started' className='center back-btn'>Back</NavLink>
                            </div>

                        </div>
                    </div>
                    <div className='preview-card'>
                        <Preview contactSection={this.state.contactSection} skinCode={"skin1"} educationSection={this.props.educationSection}></Preview>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state,ownProps)=>{
    return state;
}
const mapDispatchToProps=(dispatch)=>{
    return{
        addContact:(contactSection)=>{dispatch({type:'ADD_CONTACT',contactSection:contactSection})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Contact);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fieldCd } from '../../constants/typeCodes';
import Preview from './Preview';
import AddIcon from '@material-ui/icons/Add';
class Education extends Component {
    state = {
        contactSection: this.props.contactSection,
        educationSection: this.props.educationSection,
        newSkill:"",
        skills:[]
    }
    onChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        let educationSection = this.state.educationSection
        this.setState({ educationSection: { ...educationSection, [key]: value } })
        this.props.addEducation(this.state.educationSection);
    }
    onSubmit = () => {
        this.props.addAllSkill(this.state.skills)
        this.props.history.push('/finalize');
    }
    skill=(event)=>{
        let value=event.target.value;
        this.setState({newSkill:value})
    }
    addSkill=()=>{
        this.props.addSkill(this.state.newSkill)
        let skills=this.state.skills
        skills.push(this.state.newSkill);
        this.setState({
            newSkill:"",
            skills:skills
        })
    }
    render() {
        return (
            <div className="container mid education">
                <div className="section funnel-section">
                    <div className="form-card">
                        <h2 className="form-heading center">Educational Details</h2>
                        <div className="form-section">
                            <div className="input-group"><label>College Name</label>
                                <div className="effect"><input type="text" name={fieldCd.SchoolName} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>Degree</label>
                                <div className="effect"><input type="text" name={fieldCd.Degree} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>CGPA</label>
                                <div className="effect"><input type="text" name={fieldCd.GraduationCGPA} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>City/State</label>
                                <div className="effect"><input type="text" name={fieldCd.SchoolCity} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>Graduation Month</label>
                                <div className="effect"><input type="text" name={fieldCd.GraduationDate} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>

                            <div className="input-group"><label>Graduation Year</label>
                                <div className="effect"><input type="text" name={fieldCd.GraduationYear} onChange={this.onChange} /><span></span>
                                </div>
                                <div className="error"></div>
                            </div>
                            <div className="input-group full"><label>Skills</label>
                                <div className="skills">
                                    <div className="effect"><input type="text" name={fieldCd.Skills} value={this.state.newSkill} onChange={this.skill} /><span></span>
                                    </div>
                                    <AddIcon onClick={this.addSkill}/>
                                </div>
                                <div className="error"></div>
                            </div>
                            <div className="form-buttons">
                                <button className="btn hvr-float-shadow" type='button' onClick={this.onSubmit}>Next</button>
                                <NavLink to='/contact' className="center">Back</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="preview-card">
                        <Preview contactSection={this.state.contactSection} skinCode={"skin1"} educationSection={this.state.educationSection}></Preview>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        addEducation: (educationSection) => { dispatch({ type: 'ADD_EDUCATION', educationSection: educationSection }) },
        addSkill:(skills)=>{dispatch({ type: 'ADD_SKILLS', skills: skills })},
        addAllSkill:(allSkills)=>{dispatch({ type: 'ADD_ALLSKILLS', allSkills: allSkills })}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Education);
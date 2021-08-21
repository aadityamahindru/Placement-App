import React, { Component } from 'react'
import { connect } from 'react-redux';
import { skinCodes } from '../../constants/typeCodes'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
class GettingStarted extends Component {
    state = {
        skinCd:this.props.document.skinCd,
    }
    onChange=(value)=>{
        this.setState({skinCd:value});
        this.props.setSkin(value);
        this.props.history.push("/contact");
    }
    render() {
        return (
            <div className="container mid gettingStarted">
                <h1 className=" center">
                    Select a resume template to get started
            </h1>
                <p className=" center">
                    You’ll be able to edit and change this template later!
            </p>
                <div className='styleTemplate'>
                    {
                        skinCodes.map((value) => {
                            return (
                                <div className="template-card rounded-border">
                                    <CheckCircleIcon className={this.state.skinCd===value?"selected":"hide"}></CheckCircleIcon>
                                    <img src={`/images/${value}.svg`} alt='template' />
                                    <button type="button" className='btn-template' onClick={()=>this.onChange(value)}>USE TEMPLATE</button>
                                </div>
                            )
                        })
                    }
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
        setSkin:(skinCd)=>{dispatch({type:'SET_SKIN',skinCd:skinCd})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(GettingStarted);

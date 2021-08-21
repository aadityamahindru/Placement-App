import initialState from "./initialState.json";
import update from 'immutability-helper';
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_CONTACT": return update(state,{contactSection:{$merge:action.contactSection}})
        case "ADD_EDUCATION": return update(state,{educationSection:{$merge:action.educationSection}})
        case "SET_SKIN": return  update(state,{document:{skinCd:{$set:action.skinCd}}});
        case "ADD_JOBID": return update(state,{jobId:{$set:action.jobId}})
        case "ADD_USER": return update(state,{user:{$set:action.user}})
        case "UPDATE_MENU": return update(state,{menu:{$set:action.menu}})
        case "ADD_ADMIN": return update(state,{admin:{$set:action.admin}})
        case "ADD_SKILLS": return update(state,{skills:{$set:action.skills}})
        case "ADD_ALLSKILLS": return update(state,{allSkills:{$set:action.allSkills}})
        default: return state;
    }
}
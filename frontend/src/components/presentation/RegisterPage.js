import React from 'react'

function RegisterPage() {
    return (
        <div className='login-container'>
            <div className='input-group'>
                <label>Username</label>
                <div className='effect'>
                    <input type='text' name='FNAM' /><span></span>
                </div>
                <div className='error'></div>
            </div>

            <div className='input-group'>
                <label>First Name</label>
                <div className='effect'>
                    <input type='text' name='FNAM' /><span></span>
                </div>
                <div className='error'></div>
            </div>
        </div>
    )
}

export default RegisterPage

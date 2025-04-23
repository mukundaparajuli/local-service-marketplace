import React from 'react'

const LoginCard = () => {
    return (
        <div className='bg-gray-500 h-1/3 w-1/4 p-4 rounded-md flex justify-center items-center'>
            <form className=' flex flex-col gap-4'>
                <div className='flex flex-col gap-2 bg-red-400 h-full'>
                    <label htmlFor="username">username</label>
                    <input className='px-2 py-1' type='text' id='username' about='username' />
                </div>

                <div className='flex flex-col gap-2 items-start'>
                    <label htmlFor="username">password</label>
                    <input className='px-2 py-1' type='password' id='password' about='password' />
                </div>
            </form>
        </div>
    )
}

export default LoginCard
interface registerDataType {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber?: string,
}

export const register = async (registerData: registerDataType) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                "Content-Type": "application/json",

            },
        })
        console.log(await response.json());
    } catch (err) {
        console.log(err);
    }
}
export default function Profile(){
    
    const user=JSON.parse(localStorage.getItem('user'))
if(user){
    console.log(user)
}
    return (
        <>
            {user && (
                <div>
                    <p>username: {user.username}</p>
                    <p>ROLES: {user.roles}</p>
                    <p>token: {user.accessToken}</p>
                </div>
            )
              

            }
        </>
    )
}
# Flash cards enpoints

## roles
  - `[GET] /api/roles`

  response: (list of roles)

  ```
  [
    {
      name: 'user'
    },
    {
      name: 'admin'
    }
  ]
  ```

## users
  - `[GET] /api/users`
  - `[GET] /api/users/{user_id}`

## auth
  - `[POST] /api/auth/login`

  request 
  
  - body
    ```
    {
      "username": "foo",
      "password": "securePassword123"
    }
    ```
  
  response
  - data
    ```
    {
      id: 1
      username: "foo",
      
      role: {
        id: 1,
        name: "user",
      },

      token,
      message: "welcome back, foo"
    }
    ```

  - `[GET] /api/auth/logout`
  
  response

  - data
    
    if logged in
    ```
    {
      message: "logged out"
    }
    ```
    
    else
    ```
    {
      message: "not logged in"
    }
    ```

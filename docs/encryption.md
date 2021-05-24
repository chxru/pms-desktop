# Encryption

> The methods used in this application might change in future.

**Until the plans for storing data in the servers are finalized, the single user - local only database is being used due to complex nature in encryption**

## Summary

- Passwords are hashed using bcrypt.js
- Patient data is encrypted using AES-256 inside the database with a key derived from the users password (PBKDF2)  
  Every field in patient object is encode into an string and that data is encrypted and saved inside the database.

```
patient object
  - keywords : string[]
  - data : aes-256 string,
```

- Patient name has to be un-encrypted because queries cannot perform inside encrypted data  
  Keywords object hold the first and last name of patient. Search queries are perform against the keyword array

- This method has a panetly when searching only for a specific field of a patient but since current state of the application do not contain such functions, so its okay in this point.

## Procedure

### When running the application for the first time

1. After the user () enters the credentials username and bcrypted password saved inside USER database  
   Note: Currently PMS is designed for single user, when PMS expands to multiple user app, "the user" is the ADMIN of the PMS network
2. A string is generated as the pbkdf2 salt and saved in metadata database
3. A 256bit key derived from password is saved inside the memcache database
4. Everytime an encrypt/decrypt happens, the key is being fetched from memcache and do the cipher

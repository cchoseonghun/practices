## References

* https://velog.io/@from_numpy/NestJS-Implementing-2FA-using-OTP-feat.-QR-Google-Authenticator

## Test

* Login
  * localhost:3000/api/auth/login
* Get User Infomation without 2FA
  * localhost:3000/api/auth/authenticate
* Generate QR Code for 2FA (Google, MS Authenticator)
  * localhost:3000/api/mfa/generate
* Authentication with 2FA
  * localhost:3000/api/mfa/authenticate
* Authorization with 2FA
  * localhost:3000/api/test

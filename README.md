# Util
Códigos úteis

### KeyStore
    keytool -genkeypair -v -keystore KeyStore -alias appID -keyalg RSA -sigalg SHA1withRSA -validity 10000

### PEM
    openssl pkcs12 -in pushcert.p12 -out pushcert.pem -nodes -clcerts

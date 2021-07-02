#小白兔的开发之路

mkdir config
cd config
openssl
OpenSSL> genrsa -out private.key 4096
OpenSSL> rsa -in private.key -pubout -out public.key
exit

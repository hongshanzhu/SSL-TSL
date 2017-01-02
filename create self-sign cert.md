# 准备 #

    mkdir SSL-TSL
    cd SSL-TSL/
    mkdir ./demoCA
    mkdir demoCA/newcerts
    vi demoCA/index.txt   空文件
    vi demoCA/serial   写入01
    

# 1.首先生成CA私钥 #

    openssl genrsa -out ca.key 1024
# 2.然后用CA私钥生成自签名证书 #
    openssl req -new -x509 -days 365 -key ca.key -out ca.crt
没有-x509参数，只是生成证书请求，加上参数生成自签名证书。

# 3.生成服务器端私钥 #
    openssl genrsa -out server.key 1024
# 4.生成服务器端证书请求 #
    openssl req -new -key server.key -out server.csr

You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.

---

    Country Name (2 letter code) [AU]:CN
    State or Province Name (full name) [Some-State]:GD
    Locality Name (eg, city) []:GZ
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:ericsson
    Organizational Unit Name (eg, section) []:ses
    Common Name (e.g. server FQDN or YOUR name) []:***testssl.com***
    Email Address []:362625119@qq.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

# 5.用CA根证书进行签名生成服务器端证书 #
    openssl ca -in server.csr -out server.crt -cert ca.crt -keyfile ca.key
我们就有了构建服务器端需要的两个文件server.key和server.crt

# 6.生成客户端私钥 #
`openssl genrsa -out client.key 1024`
# 7.生成客户端证书请求 #
    openssl req -new -key client.key -out client.csr
# 8.用CA根证书进行签名生成客户端证书 #
    openssl ca -in client.csr -out client.crt -cert ca.crt -keyfile ca.key
我们就有了构建客户端需要的两个文件client.key和client.crt

# 9 验证证书 #

    openssl s_client -connect 127.0.0.1:8000 -cert client.cet -key client.key -tls1 -CAfile ca.cert -state -showcerts

    结果Verify return code: 0 (ok)
    
    openssl s_client -connect 127.0.0.1:8180 -tls1 -CAfile ca.crt -state -showcerts
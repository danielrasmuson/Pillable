function e {
    echo $1;
    open 'http://127.0.0.1:8080/debug?port=5858';
    bash -c 'node-inspector'
    bash -c 'node --debug-brk ./test/getSession.js'
    # bash -c 'XXXX ; bash'
}  
e 'test/getSession.js';

# add todo to check that its installed
# npm install -g node-inspector

# function e {
#     echo $1 
# }  
# e Hello

# // view full file here: https://github.com/node-inspector/node-inspector
# npm install -g node-inspector

# // start your inspector server
# node-inspector

# // then start your script -- pause on the first line
# node --debug-brk your/short/node/script.js

# // then visit this url
# 'http://127.0.0.1:8080/debug?port=5858'
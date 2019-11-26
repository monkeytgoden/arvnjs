## mongodb setup and run
1. download https://www.mongodb.com/download-center/community
2. install mongo: select option Mongo Compass to work wtih MongoDB
3. create folder E:/MongoDB -> add folders: data, log and file: config.txt
4. edit config.txt
    ##store data
    dbpath=E:\MongoDB\data
    ##all output go here
    logpath=E:\MongoDB\log\mongo.log
5.  run cmd
> cd <bin_folder_of_mongodb>

> mongod.exe --config E:\MongoDB\config.txt

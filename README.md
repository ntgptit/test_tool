

Điền các thông tin trong walrush.csv
id,active,memonics,private_key,address,sui_balance,proxy_url

    - id tăng dần từ 1 -> n 
    - active = 1 là chạy
    - memonics điền 12 seed_phase
    - proxy_url : http://usename:password@ip:port

Yêu cầu chạy node faucet trước để hệ thống tự động sinh ra seed_phase, private_key,address thì mới chạy được lệnh node index

Chạy node faucet để tự động gen ví + faucet ( 1proxy cho 1 ví / Faucet được 2 lượt / ngày ) 
Chạy node index để auto Swap , auto mint NFT

npm install
```

### Run code
```
node index
```


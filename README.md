# DATA-PREPARATION

このリポジトリは、医療機関・薬局のリストを整形するためのスクリプトを格納します。

このスクリプト群は、NestJSの`nest new application`をスキャフォールディングして作られているが、Webサーバーとして利用していない。

## 医療機関検索用データの作成方法

下記コマンドを順にプロジェクトルートにて実行する。

```shell: ピルにゃんデータから郵便番号を元に住所、市区町村コードを取得
npx ts-node ./src/medicalinstitution_postalcode2address.ts --csvFilePath './data/20230625/medicalinstitution-20220808-raw.csv' > ./data/20230625/tmp.csv
```

```shell: 住所から緯度経度を取得
npx ts-node ./src/medicalinstitution_address2latlng.ts --csvFilePath './data/20230625/tmp.csv' > ./data/20230625/medicalinstitution-output.json
```

これで出力されたデータをMongoDBに入れる。

### 注意点
Google Geocoding APIで住所から緯度経度を引けない場合がある。その場合、`latitude`,  `langitude`の項目にはnullとなる。
MongoDBにデータを入れた後、これらのレコードを探して、正しい緯度経度を入力する必要がある。

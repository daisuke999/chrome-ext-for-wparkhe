# Eddy - Arkhe Pattern Liblary Extention

WordPressテーマ「Arkhe」用のサードパーティ製のChrome拡張です。

[demo - YouTube](https://youtu.be/FlHFBFl3POs)

## 機能

+ Arkhe公式のブロックパターン配布サイト「Arkheパターンライブラリ」で配布されているブロックパターンに組み込まれているCSS変数をサイト内で調整してデザインの変更を試すことができるようになります。

## 技術スタック

+ [Vite](https://ja.vitejs.dev/)
+ [CRXJS Vite Plugin](https://crxjs.dev/vite-plugin)

## 環境構築

リポジトリをクローン。  
クローンしたディレクトリに移動した後に「npm install」実行。  
ViteやCRXJSがインストールされる。

```
npm install
```

### 開発サーバー起動

```
npm run dev
```

### ビルド

```
npm run build
```

## インストール

ローカルで動作させる方法。開発時はこの方法を使用。

+ Chromeを起動。Macの場合「︙」メニューから「その他のツール」→「拡張機能」を選択。
+ 「デベロッパーモード」をクリックしてONの状態にする。
+ 「パッケージ化されていない拡張機能を読み込む」を選択。ビルドで生成されたdistディレクトリを指定。
+ 拡張機能が読み込まれたら有効化する。

修正内容を反映させたいときは更新ボタンを押すと変更が反映される。

## 関連リンク

+ [Arkhe パターンライブラリ | コピペで使える、Arkheテーマ専用のブロックパターン集](https://patterns.arkhe-theme.com/)
+ [Arkhe | ミニマム、シンプル、ちょうどいい。WEB制作用の無料WordPressテーマ](https://arkhe-theme.com/ja/)
---
title: Use App Router for Next.js Application
status: ACCEPTED
labels: 
  - フロントエンド
  - Next.js
  - ルーティング
  - アーキテクチャ
---

# Use App Router for Next.js Application

## コンテキスト

Next.jsアプリケーションの開発において、ルーティングアーキテクチャを選定する必要がある。
- React Server Componentsを活用したい
- より細かいキャッシング制御が必要
- ストリーミングやサスペンスを活用したパフォーマンス最適化を行いたい
- 新しいプロジェクトのため、レガシーコードとの互換性は不要

## 決定事項

Next.js 13以降で導入されたApp Routerを採用する。

## 選択肢

### 選択肢1: App Router
- **利点:**
  - React Server Componentsのフルサポート
  - 細かいキャッシング制御
  - ストリーミングとサスペンスの標準サポート
  - より直感的なレイアウトシステム
  - Parallel RoutesやIntercepting Routesなどの高度な機能
- **欠点:**
  - 比較的新しいため、コミュニティリソースが少ない
  - 一部のライブラリとの互換性問題
  - 学習コストが高い

### 選択肢2: Pages Router（従来型）
- **利点:**
  - 成熟したエコシステム
  - 豊富なドキュメントとチュートリアル
  - ほとんどのライブラリとの互換性
  - シンプルで理解しやすい
- **欠点:**
  - React Server Componentsが使えない
  - キャッシング制御が限定的
  - レイアウトの共有が複雑

### 選択肢3: 他のメタフレームワーク（Remix等）
- **利点:**
  - モダンなアプローチ
  - 優れたデータローディング戦略
- **欠点:**
  - Next.jsと比較してエコシステムが小さい
  - チームの学習コストが高い
  - Vercelとの統合が限定的

## 結果

- **ポジティブな影響:**
  - パフォーマンスの向上（Server Componentsによる）
  - より良いSEO（ストリーミングSSR）
  - 開発体験の向上（ファイルベースルーティング）
  - 将来性のあるアーキテクチャ
- **ネガティブな影響:**
  - チームの学習期間が必要
  - 一部のクライアントサイドライブラリの移行作業
  - デバッグが複雑になる可能性
- **リスク:**
  - まだ発展途上の機能による破壊的変更
  - パフォーマンスチューニングの複雑性

## 参考資料

- [Next.js App Router公式ドキュメント](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
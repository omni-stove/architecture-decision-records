---
title: Use Tanstack Query for request state
status: ACCEPTED
labels: 
  - フロントエンド
  - 状態管理
  - データフェッチング
---

# Use Tanstack Query for request state

## コンテキスト

Reactアプリケーションにおいて、サーバーからのデータ取得と状態管理を効率的に行う必要がある。
- APIリクエストのキャッシング機能が必要
- ローディング、エラー、成功状態の管理を簡潔に行いたい
- バックグラウンドでのデータ再取得機能が求められる
- 楽観的更新やミューテーションの管理が必要

## 決定事項

Tanstack Query（旧React Query）を採用し、サーバー状態の管理を行う。

## 選択肢

### 選択肢1: Tanstack Query
- **利点:**
  - 強力なキャッシング機能
  - 自動的なバックグラウンド再取得
  - 楽観的更新のサポート
  - DevToolsによるデバッグ支援
  - TypeScriptの型サポートが優秀
- **欠点:**
  - 学習コストがある
  - バンドルサイズの増加

### 選択肢2: SWR
- **利点:**
  - 軽量（Tanstack Queryより小さい）
  - シンプルなAPI
  - Vercelが開発
- **欠点:**
  - 機能がTanstack Queryより少ない
  - ミューテーションのサポートが限定的
  - DevToolsが公式提供されていない

### 選択肢3: 手動実装（useEffect + useState）
- **利点:**
  - 追加の依存関係なし
  - 完全なコントロール
- **欠点:**
  - キャッシング機能の実装が複雑
  - エラーハンドリングやローディング状態の管理が煩雑
  - 再利用性が低い

## 結果

- **ポジティブな影響:**
  - APIリクエストの重複を自動的に排除
  - ユーザー体験の向上（キャッシュによる高速表示）
  - 開発効率の向上（ボイラープレートコードの削減）
  - エラーハンドリングの一元化
- **ネガティブな影響:**
  - チームメンバーの学習が必要
  - バンドルサイズの増加（約25KB gzipped）
- **リスク:**
  - 過度なキャッシング設定による古いデータの表示
  - 複雑なクエリ依存関係の管理

## 参考資料

- [Tanstack Query公式ドキュメント](https://tanstack.com/query/latest)
- [Practical React Query](https://tkdodo.eu/blog/practical-react-query)
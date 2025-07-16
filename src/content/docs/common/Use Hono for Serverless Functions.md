---
title: Use Hono for Serverless Functions
status: ACCEPTED
labels: 
  - バックエンド
  - API
  - サーバーレス
  - フレームワーク
---

# Use Hono for Serverless Functions

## コンテキスト

サーバーレス環境で動作するAPIを構築する必要がある。
- Edge Runtime（Cloudflare Workers、Deno Deploy等）での動作が必要
- 軽量で高速なフレームワークが求められる
- TypeScriptのファーストクラスサポートが必須
- 複数のサーバーレスプラットフォームでの可搬性が重要

## 決定事項

Honoをサーバーレス関数のWebフレームワークとして採用する。

## 選択肢

### 選択肢1: Hono
- **利点:**
  - 超軽量（約14KB）
  - Edge Runtimeに最適化
  - TypeScriptネイティブ
  - Express風の親しみやすいAPI
  - マルチランタイム対応（Cloudflare Workers、Deno、Bun、Node.js）
  - ミドルウェアエコシステム
- **欠点:**
  - 比較的新しいフレームワーク
  - コミュニティがExpressより小さい
  - 一部の高度な機能は自前実装が必要

### 選択肢2: Express
- **利点:**
  - 最も普及しているNode.jsフレームワーク
  - 豊富なミドルウェアエコシステム
  - 大量のドキュメントとリソース
- **欠点:**
  - Edge Runtimeで動作しない
  - 比較的重い
  - TypeScriptサポートが後付け
  - サーバーレスに最適化されていない

### 選択肢3: Fastify
- **利点:**
  - 高パフォーマンス
  - プラグインシステム
  - スキーマベースのバリデーション
- **欠点:**
  - Edge Runtime非対応
  - 学習曲線がある
  - サーバーレス環境での起動時間

### 選択肢4: itty-router
- **利点:**
  - 極めて軽量（約1KB）
  - Cloudflare Workers特化
  - シンプルなAPI
- **欠点:**
  - 機能が限定的
  - ミドルウェアサポートが弱い
  - 他のランタイムでの動作が限定的

## 結果

- **ポジティブな影響:**
  - コールドスタートの最小化
  - Edge環境での優れたパフォーマンス
  - 開発体験の向上（TypeScript、型推論）
  - プラットフォーム間の移植性
- **ネガティブな影響:**
  - チームの学習コスト
  - 既存のExpressミドルウェアの移植作業
  - コミュニティリソースの相対的な少なさ
- **リスク:**
  - フレームワークの成熟度
  - 長期的なメンテナンスの保証

## 参考資料

- [Hono公式ドキュメント](https://hono.dev/)
- [Hono vs Express Performance](https://github.com/honojs/hono#benchmarks)
- [Edge Runtime比較](https://blog.cloudflare.com/workers-runtime-apis/)
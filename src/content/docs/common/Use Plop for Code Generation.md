---
title: Use Plop for Code Generation
status: ACCEPTED
labels: 
  - アーキテクチャ
  - 技術選定
  - 開発ツール
  - 自動化
---

## コンテキスト

ソフトウェア開発において、新しいファイルやコードを作成する際に以下の課題が発生している：

- 定型的なファイル作成作業の繰り返し
- ファイル構造やテンプレートの一貫性確保の難しさ
- 命名規則の統一とタイポの防止
- 新しいメンバーが参加した際の学習コストと生産性向上の遅れ
- リファクタリング時の大量ファイル作成・更新作業の手間

また、現代の開発では一つの機能に対して複数のファイル（実装、テスト、設定ファイル等）が必要になることが多く、手動での作成は非効率的である。

## 決定事項

コード生成ツールとしてPlopを採用し、ファイルやコードの自動生成を行う。

## 選択肢

### 選択肢1: 手動でのファイル作成

- **利点:**
  - 外部ツールへの依存がない
  - 完全な自由度がある
  - シンプルで理解しやすい

- **欠点:**
  - 定型的な作業の繰り返しによる開発効率の低下
  - 一貫性の確保が困難
  - 人的ミスによるタイポや構造の不統一
  - 新規メンバーの生産性向上に時間がかかる

### 選択肢2: Plop採用（採用案）

- **利点:**
  - 対話式インターフェースで使いやすい
  - Handlebars テンプレートエンジンによる柔軟なファイル生成
  - 軽量で高速な実行
  - Node.js エコシステムとの親和性が高い
  - カスタマイズ性が高く、プロジェクト固有の要件に対応可能
  - 言語・フレームワークに依存しない汎用性

- **欠点:**
  - 初期設定とテンプレート作成のコスト
  - チームメンバーがPlopの使い方を覚える必要がある
  - テンプレートの保守が必要

### 選択肢3: 他のコード生成ツール（Hygen等）

- **利点:**
  - より高機能なテンプレート機能
  - 複雑な生成ロジックに対応

- **欠点:**
  - 学習コストが高い
  - 過剰な機能により設定が複雑化
  - Plopと比較して重い

## 結果

この決定による影響：

- **ポジティブな影響:**
  - 定型的なファイル作成作業の自動化により開発効率が大幅に向上
  - ファイル構造とコード品質の一貫性確保
  - 新規メンバーの生産性向上の加速
  - タイポや構造ミスの削減
  - ベストプラクティスの自動適用

- **ネガティブな影響:**
  - 初期のテンプレート作成とPlopfile設定のコスト
  - チームメンバーの学習コスト（ただし軽微）
  - テンプレートの継続的な保守が必要

- **リスク:**
  - テンプレートが古くなった場合の技術的負債の蓄積
  - 過度に複雑なテンプレートによる保守性の低下
  - 生成されたコードへの過度な依存

## 実装ガイドライン

### インストールと基本設定

```bash
npm install --save-dev plop
```

### Plopfile.js の設定例

```javascript
export default function (plop) {
  // 汎用ファイル生成
  plop.setGenerator('file', {
    description: 'ファイルを生成',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'ファイル名を入力してください:',
        validate: (value) => {
          if (!value) return 'ファイル名は必須です';
          return true;
        },
      },
      {
        type: 'list',
        name: 'type',
        message: 'ファイルタイプを選択してください:',
        choices: ['component', 'service', 'utility', 'config'],
      },
      {
        type: 'confirm',
        name: 'withTest',
        message: 'テストファイルを生成しますか？',
        default: true,
      },
    ],
    actions: (data) => {
      const actions = [
        {
          type: 'add',
          path: 'src/{{type}}/{{kebabCase name}}.ts',
          templateFile: 'plop-templates/{{type}}.hbs',
        },
      ];

      if (data.withTest) {
        actions.push({
          type: 'add',
          path: 'src/{{type}}/{{kebabCase name}}.test.ts',
          templateFile: 'plop-templates/test.hbs',
        });
      }

      return actions;
    },
  });
}
```

### 使用方法

```bash
# ファイル生成
npm run plop

# または直接実行
npx plop
```

### ベストプラクティス

- テンプレートはシンプルに保ち、必要最小限の内容にする
- 生成後に手動で調整が必要な部分にはTODOコメントを記載
- プロジェクトの成長に合わせてテンプレートを定期的に見直す
- 生成されたファイルは必ずレビューしてから使用する
- 言語やフレームワークに依存しない汎用的なテンプレート設計を心がける

## 参考資料

- [Plop Official Documentation](https://plopjs.com/)
- [Handlebars.js](https://handlebarsjs.com/)
- [Code Generation Best Practices](https://martinfowler.com/articles/codeGeneration.html)
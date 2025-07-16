---
title: Use 3-tier State Management Architecture for React Application
status: ACCEPTED
labels: 
  - アーキテクチャ
  - 技術選定
  - React
  - 状態管理
---

## コンテキスト

Reactアプリケーションにおける状態管理は、アプリケーションが複雑化するにつれて管理が困難になる課題がある。従来の単一の状態管理ライブラリ（Redux等）による管理では、以下の問題が発生していた：

- サーバーデータのキャッシュとクライアント状態が混在し、責務が不明確
- Global Stateの肥大化により、不要な再レンダリングやパフォーマンス問題が発生
- 状態の種類に応じた最適化が困難
- ボイラープレートコードの増加

また、SPAで管理する必要のあるGlobal Stateの大部分はサーバーデータのキャッシュであり、これを適切に分離することで状態管理を大幅に簡素化できる可能性がある。

## 決定事項

Reactアプリケーションの状態を以下の3種類に分類し、それぞれに最適化されたツールで管理する：

1. **サーバーデータのキャッシュ** - Tanstack Query で管理
2. **Global State** - Jotai で管理  
3. **Local State** - React標準の useState で管理

## 選択肢

### 選択肢1: 従来の単一状態管理ライブラリ（Redux等）

- **利点:**
  - 一元的な状態管理が可能
  - DevToolsによるデバッグ環境が充実
  - 開発者にとって馴染みがある

- **欠点:**
  - サーバーデータのキャッシュ機能が弱い
  - ボイラープレートコードが多い
  - 状態の種類を問わず同じパターンで管理するため非効率

### 選択肢2: 3種類分離アーキテクチャ（採用案）

- **利点:**
  - 各状態の特性に応じた最適化が可能
  - サーバーデータの自動キャッシュ・再取得・エラーハンドリング
  - Global Stateの軽量化
  - ボイラープレートコードの削減

- **欠点:**
  - 複数のライブラリを習得する必要がある
  - 状態の分類判断が必要
  - ライブラリ間の相互作用に注意が必要

### 選択肢3: React Context + useState のみ

- **利点:**
  - 外部ライブラリへの依存がない
  - シンプルな構成

- **欠点:**
  - サーバーデータのキャッシュ機能がない
  - パフォーマンス最適化が困難
  - 大規模アプリケーションでは管理が困難

## 結果

この決定による影響：

- **ポジティブな影響:**
  - サーバーデータの自動キャッシュ・無効化により開発効率が向上
  - 各状態管理の責務が明確になり、メンテナンス性が向上
  - 不要な再レンダリングの削減によるパフォーマンス改善
  - ボイラープレートコードの大幅削減

- **ネガティブな影響:**
  - 開発者が複数のライブラリの学習コストを負担
  - 状態の分類に関する設計判断が必要
  - ライブラリのバージョンアップ対応が複数必要

- **リスク:**
  - 状態の分類を誤った場合のリファクタリングコスト
  - 異なるライブラリ間でのデバッグの複雑化
  - ライブラリの組み合わせによる予期しない問題の発生

## 実装ガイドライン

### 1. サーバーデータのキャッシュ（Tanstack Query）

```typescript
// Usecase層での定義例
export const useUserList = () => {
  const repository = useUserRepository()
  
  return useQuery({
    queryKey: ['users', 'list'],
    queryFn: () => repository.getList(),
  })
}

export const useUserItem = (id: string) => {
  const repository = useUserRepository()

  return useQuery({
    queryKey: ['users', 'item', id],
    queryFn: () => repository.getItem({ id }),
  })
}
```

### 2. Global State（Jotai）

```typescript
// /src/globalStates/todaysDinnerState.ts
type DinnerType = 'Beef' | 'Chicken' | null

const todaysDinnerAtom = atom<DinnerType>(null)

export const useTodaysDinnerState = () => {
  return useAtomValue(todaysDinnerAtom)
}

export const useTodaysDinnerMutators = () => {
  const setDinner = useSetAtom(todaysDinnerAtom)

  return { setDinner }
}
```

### 3. Local State（React useState）

```typescript
// Component内での使用
const [isOpen, setIsOpen] = useState(false)
const [inputValue, setInputValue] = useState('')
```

## 分類基準

- **サーバーデータのキャッシュ**: API経由で取得するデータ
- **Global State**: ページをまたいで保持する必要があるクライアント状態（認証情報、Toast、バックグラウンド処理状況等）
- **Local State**: 単一Component内で完結するUI状態

## 参考資料

- [Tanstack Query Documentation](https://tanstack.com/query/latest)
- [Jotai Documentation](https://jotai.org/)
- [「3種類」で管理するReactのState戦略 - Zenn](https://zenn.dev/yoshiko/articles/99f8047555f700)
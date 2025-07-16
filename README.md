# ADR Repository

アーキテクチャ決定記録（Architecture Decision Records）を管理・公開するためのリポジトリです。
Astro + Starlightを使用してドキュメントサイトとして公開されています。

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

## 📋 ADRについて

ADR（Architecture Decision Records）は、ソフトウェア開発におけるアーキテクチャ上の重要な決定事項を記録するためのドキュメントです。

### ADRの目的
- 重要な技術的決定の背景と理由を明確に記録
- チーム内での知識共有とコンテキストの保持
- 将来の意思決定における参考資料として活用

## 🚀 プロジェクト構成

```
.
├── public/                 # 静的アセット
├── src/
│   ├── content/
│   │   └── docs/           # ADRドキュメント
│   │       ├── common/     # 共通技術に関するADR
│   │       └── index.mdx   # ホームページ
│   └── components/         # Astroコンポーネント
├── docs/
│   └── template.md         # ADRテンプレート
└── astro.config.mjs        # Astro設定
```

ADRは`src/content/docs/`ディレクトリに`.md`または`.mdx`ファイルとして配置されます。
ファイル名に基づいてルートが自動生成されます。

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).

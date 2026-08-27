# frontend-agent-lab

这是一个用于建设和验证可靠前端 AI 自动化工作流的 Vue 3 实验仓库。

目标不是让 AI 收到任何一句话后立即写代码，而是建立一条可追溯的路径：从原始需求和设计输入开始，经人工批准后，再无人值守地完成实现、测试、浏览器验收和代码审查。

仓库本身使用 Vue 3 验证流程，但工作流不绑定 Vue/React，也不绑定 Element Plus、shadcn/ui 或任何组件库；其他项目只需替换对应的安装、检查、测试、构建和设计工具 adapter。

## 先读这些文档

- [前端 AI 自动化工作流手册](docs/ai-frontend-workflow.md)：跨业务、跨框架的流程、人与 AI 的边界、工具映射、失败恢复和建设路线
- [Agent 执行规则](AGENTS.md)：agent 在本仓库中的编码和验证约束
- [Definition of Ready](docs/agents/definition-of-ready.md)：任务进入 `ready-for-agent` 前必须满足的条件
- [任务状态标签](docs/agents/triage-labels.md)：`needs-triage`、`needs-info`、`ready-for-agent` 等标签含义
- [Issue Tracker 配置](docs/agents/issue-tracker.md)：GitHub Issues 操作约定
- [领域文档规则](docs/agents/domain.md)：`CONTEXT.md` 和 ADR 的职责与创建时机

## 当前状态

已经完成：

- Vue 3、TypeScript、Vite、Vue Router 和 Pinia 基线
- pnpm 单一包管理器
- ESLint、Prettier、vue-tsc、Vitest 和 Playwright
- 本地快速门禁与完整门禁
- Agent 编码契约、GitHub 标签和 Definition of Ready
- Feature、Bug 和 PR 模板
- GitHub Actions `ci` 与 `e2e` 基础门禁
- “食材组合生成菜谱”规格 Issue 和三套仅供参考的本地 UI 探索

尚未完成：

- 通过 AI + Penpot MCP 生成正式候选原型并完成人工设计选择
- 在真实 PR 上验证 GitHub CI 后启用分支保护
- 独立 AI CR 必需检查和最多两轮的自动修复
- 标签触发的无人值守执行器
- 预览环境和视觉回归
- 失败恢复、合并后反馈、执行指标和 GitLab 适配

详细路线见 [POC 建设与验证记录](docs/poc-validation.md#3-后续建设顺序)。

## 环境要求

- Node.js：以 `package.json#engines` 为准
- pnpm：以 `package.json#packageManager` 固定的版本为准；项目只允许使用 pnpm，不使用 npm 或 Yarn
- Playwright Chromium：首次运行 E2E 前执行 `pnpm exec playwright install chromium`

## 常用命令

```bash
pnpm install
pnpm run dev
pnpm run fix
pnpm run check
pnpm run check:all
```

- `pnpm run check`：类型检查、ESLint、格式检查、单元测试和构建
- `pnpm run check:all`：在 `check` 基础上增加 Playwright E2E

## UI 工作流原型

当前的一次性代码原型只用于设计探索参考，不属于正式产品代码，也不是可以直接批准的设计候选：

```bash
pnpm run prototype:ui
```

通过页面底部切换器或键盘方向键查看 A、B、C 三套参考。流程验证者需要根据 [Issue #1](https://github.com/htk5257577/frontend-agent-lab/issues/1)，使用 AI 通过 Penpot MCP 重新生成 2–3 套有实质差异的 Penpot 原型，再由人选择和批准；实现 agent 只能依据最终批准的 Penpot 版本编码。详细说明见 [`prototypes/suicaizuo-ui/README.md`](prototypes/suicaizuo-ui/README.md)。

## POC 验证入口

- 示例需求：[Issue #1：根据已有食材推荐菜谱](https://github.com/htk5257577/frontend-agent-lab/issues/1)
- 代码参考原型：[`prototypes/suicaizuo-ui/`](prototypes/suicaizuo-ui/)
- 完整建设路线：[POC 建设与验证记录第 3 节](docs/poc-validation.md#3-后续建设顺序)
- 代码规范保障：[通用工作流手册第 14 节](docs/ai-frontend-workflow.md#14-如何保证代码规范和一致性)
- 需求验证清单：[POC 建设与验证记录第 4 节](docs/poc-validation.md#4-用食材推荐需求验证工作流)

## 推荐的新需求流程

```text
原始输入
→ AI 澄清高影响问题
→ 设计/原型审批（适用时）
→ to-spec
→ 人工规格审批并达到 ready-for-agent
→ to-tickets（复杂任务）
→ implement + TDD
→ 浏览器验收
→ 自动创建 Draft PR/MR
→ 远程 CI + 独立 AI code-review
→ diagnose + 修复 + 重新检查（失败时，有限循环）
→ 转为 Ready 并由人审核
→ 人工手工合并
→ 部署 + 冒烟 + 监控
→ 健康则关闭原需求/缺陷；异常则回滚、保持原任务打开并创建关联 Bug
```

不要把聊天记录作为长期唯一事实来源。已确认结论应进入规格 Issue、`CONTEXT.md`、ADR、测试或批准的设计来源。

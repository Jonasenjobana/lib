# Git Commit 提交规范

## 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

## 类型说明 (type)

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `docs` | 文档更新 |
| `style` | 代码格式调整（不影响代码运行） |
| `refactor` | 重构（既不是新增功能，也不是修改 bug 的代码变动） |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建过程或辅助工具的变动 |
| `revert` | 回滚 |

## 范围说明 (scope)

scope 用于说明 commit 影响的范围，比如：
- `ui`: UI 组件
- `canvas`: Canvas 相关
- `util`: 工具函数
- `playgroud`: 示例项目
- `*`: 影响多个范围

## 主题说明 (subject)

- 以动词开头，使用第一人称现在时，比如 `change`，而不是 `changed` 或 `changes`
- 第一个字母小写
- 结尾不加句号（.）
- 不超过 50 个字符

## 正文说明 (body)

- 使用第一人称现在时，比如 `change` 而不是 `changed` 或 `changes`
- 应该说明代码变动的动机，以及与以前行为的对比
- 每行不超过 72 个字符

## 页脚说明 (footer)

- **不兼容变动**：如果当前代码与上一个版本不兼容，则 Footer 部分以 `BREAKING CHANGE:` 开头，后面是对变动的描述、以及变动理由和迁移方法
- **关闭 Issue**：如果当前 commit 针对某个 issue，那么可以在 Footer 部分关闭这个 issue

## 示例

### 新功能
```
feat(ui): 添加按钮组件

新增一个基础的按钮组件，支持多种尺寸和颜色

Closes #123
```

### 修复 bug
```
fix(canvas): 修复缩放时坐标偏移问题

当画布缩放时，鼠标坐标计算有误，现在使用矩阵变换来正确计算坐标

BREAKING CHANGE: getMousePos 方法的返回值现在包含缩放比例
```

### 文档更新
```
docs: 更新安装和使用文档

- 添加快速开始指南
- 补充 API 文档示例
```

### 代码格式
```
style(util): 格式化代码

使用 prettier 格式化代码，保持代码风格一致
```

### 重构
```
refactor(core): 重构渲染引擎

将渲染逻辑抽离为独立模块，提高代码可维护性
```

### 性能优化
```
perf: 优化列表渲染性能

使用虚拟滚动减少 DOM 节点数量
```

### 测试
```
test: 添加按钮组件单元测试

测试按钮的各种状态和事件
```

### 构建相关
```
chore: 更新依赖版本

更新 lerna 和 vite 到最新版本
```

### 回滚
```
revert: feat(ui): 添加按钮组件

This reverts commit abc123456789
```

## Lerna 版本发布

当使用 `lerna version` 命令时，Lerna 会根据 commit 信息自动：

1. 更新版本号：
   - `feat` → 次版本号（minor）
   - `fix` → 修订版本号（patch）
   - `BREAKING CHANGE` → 主版本号（major）

2. 生成 CHANGELOG.md 文件

3. 创建 git tag

4. 提交更改

## 快速参考

```bash
# 查看当前项目的包列表
npx lerna list

# 发布补丁版本
npm run version:patch

# 发布次版本
npm run version:minor

# 发布主版本
npm run version:major
```

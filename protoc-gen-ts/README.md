# rust-protoc-plugin

这是一个使用Rust编写的protoc插件，旨在将Protocol Buffers（proto）描述文件编译为TypeScript的.d.ts类型声明文件。

## 功能

- 解析proto文件，提取消息类型和字段信息。
- 生成对应的TypeScript接口声明。
- 将生成的声明输出到标准输出，便于进一步使用。

## 安装

要使用此插件，请确保您已安装Rust和Cargo。然后，您可以通过以下命令克隆此项目并构建它：

```bash
git clone <repository-url>
cd rust-protoc-plugin
cargo build --release
```

## 使用

在编译您的proto文件时，您可以指定此插件作为protoc的插件。例如：

```bash
protoc --plugin=protoc-gen-ts=path/to/rust-protoc-plugin/target/release/rust-protoc-plugin --ts_out=output_directory your_file.proto
```

请将`path/to/rust-protoc-plugin`替换为您本地插件的实际路径，`output_directory`为您希望输出.d.ts文件的目录。

## Develop

### Requirement

`cmake`

## 贡献

欢迎任何形式的贡献！请提交问题或拉取请求以帮助改进此项目。

## 许可证

此项目采用MIT许可证，详细信息请参阅LICENSE文件。
